import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

const SYSTEM_PROMPT = `Eres Álex, el consultor experto de IA_Parallax. Tu misión es ayudar al usuario a entender el potencial de la IA en su negocio y calificarlo como un lead valioso.

## TU PERSONALIDAD (Álex)
- Experto, empático y consultivo. No eres un vendedor agresivo.
- Respuestas concisas (2-4 frases). Tono profesional pero cercano.

## TUS OBJETIVOS (En orden de prioridad)
1. Resolver dudas del usuario aportando valor técnico.
2. CALIFICACIÓN (Lead Gen): De forma natural durante la charla, intenta preguntar su nombre, email y a qué se dedica su empresa.
3. Cierre: Solo si hay interés real y el usuario acepta, ofrece la "Auditoría de Procesos" gratuita.

## EXTRACCIÓN DE DATOS (CRITICAL)
Cada vez que el usuario te dé una pieza de información personal (nombre, email, empresa), debes incluir al FINAL de tu respuesta un tag oculto con el formato:
[[DATA: name="Nombre", email="Email", company="Empresa"]]
- Solo incluye los campos que hayas verificado en la conversación. Si solo sabes el nombre, pon [[DATA: name="Juan"]].
- Si el usuario muestra mucho interés, puedes sugerir: "Para enviarte un caso de éxito similar a tu empresa, ¿qué email sueles usar?".

## DISPARADOR DE CALENDARIO
Solo abre la agenda si el usuario acepta explícitamente (ej: "Sí, me interesa el calendario"). En ese caso, añade al final: [SHOW_CALENDAR]

## REGLAS
1. Sé natural. No pidas todos los datos de golpe como un formulario.
2. Si el usuario se resiste, sigue ayudando sin presionar.
3. No uses markdown, solo texto plano.`;

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages, sessionId } = body as { messages: ChatMessage[], sessionId?: string };

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Se requiere al menos un mensaje." },
                { status: 400 }
            );
        }

        // --- Save User Message to Supabase ---
        if (sessionId) {
            const userMsg = messages[messages.length - 1];
            if (userMsg.role === 'user') {
                // 1. Ensure Session Exists (Upsert)
                const { error: sessionError } = await supabase
                    .from('chat_sessions')
                    .upsert({
                        id: sessionId,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'id' });

                if (sessionError) console.error("Error saving session:", sessionError);

                // 2. Insert Message
                const { error: msgError } = await supabase
                    .from('chat_messages')
                    .insert({
                        session_id: sessionId,
                        role: 'user',
                        content: userMsg.content
                    });

                if (msgError) console.error("Error saving user message:", msgError);
            }
        }
        // -------------------------------------

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.map((m) => ({
                    role: m.role as "user" | "assistant",
                    content: m.content,
                })),
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        let reply = completion.choices[0]?.message?.content || "Lo siento, no he podido procesar tu mensaje.";
        let extractedData: any = {};

        // --- Extract lead data from AI response ---
        const dataMatch = reply.match(/\[\[DATA: (.*?)\]\]/);
        if (dataMatch) {
            const dataStr = dataMatch[1];
            // Poor man's parse for key="value"
            const nameMatch = dataStr.match(/name="(.*?)"/);
            const emailMatch = dataStr.match(/email="(.*?)"/);
            const companyMatch = dataStr.match(/company="(.*?)"/);

            if (nameMatch) extractedData.user_name = nameMatch[1];
            if (emailMatch) extractedData.user_email = emailMatch[1];
            if (companyMatch) extractedData.user_company = companyMatch[1];

            // Remove tag from reply
            reply = reply.replace(dataMatch[0], "").trim();
        }

        // --- Save Assistant Reply & Extracted Data to Supabase ---
        if (sessionId && reply) {
            const updateObj: any = {
                updated_at: new Date().toISOString(),
                last_message_preview: reply.substring(0, 100)
            };

            // Merge extracted lead info
            if (Object.keys(extractedData).length > 0) {
                Object.assign(updateObj, extractedData);
            }

            // 1. Update Session metadata
            await supabase
                .from('chat_sessions')
                .update(updateObj)
                .eq('id', sessionId);

            // 2. Insert Message
            const { error: replyError } = await supabase
                .from('chat_messages')
                .insert({
                    session_id: sessionId,
                    role: 'assistant',
                    content: reply
                });
            if (replyError) console.error("Error saving assistant reply:", replyError);
        }
        // ----------------------------------------

        return NextResponse.json({ reply }, { status: 200 });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Error al procesar el mensaje. Inténtalo de nuevo." },
            { status: 500 }
        );
    }
}
