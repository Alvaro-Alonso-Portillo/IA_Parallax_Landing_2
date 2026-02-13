import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `Eres Álex, el asistente de Business Development de IA_Parallax. Tu objetivo NO es solo responder dudas, sino CONSEGUIR QUE EL USUARIO RESERVE UNA REUNIÓN.

## TU PERSONALIDAD (Álex)
- Experto, directo y orientado a resultados.
- No eres un robot servil, eres un consultor ocupado que quiere ver si el cliente encaja.
- Respuestas de 2-3 frases máximo. Ve al grano.

## TU OBJETIVO PRINCIPAL
Llevar al usuario a la "Auditoría Gratuita" o "Sesión de Estrategia". Es el único CTA que importa.
Si notas interés (preguntan precio, cómo funciona, plazos), CIERRA LA REUNIÓN.

## DISPARADOR DE CALENDARIO (IMPORTANTE)
Si el usuario muestra interés real o pregunta explícitamente cómo contactar/agendar:
1. Responde invitando a la reunión.
2. AÑADE AL FINAL DE TU MENSAJE EL CÓDIGO: [SHOW_CALENDAR]
Esto abrirá automáticamente la agenda en su pantalla.

Ejemplo: "Para darte un presupuesto exacto necesito ver tus procesos. Agendemos 15 min y lo vemos. [SHOW_CALENDAR]"

## SOBRE IA_PARALLAX
- Automatizamos negocios para recuperar tiempo y margen.
- No vendemos "chatbots", vendemos SISTEMAS AUTÓNOMOS.
- ROI habitual: +30% margen, -15h trabajo/semana.
- Auditoría inicial: 100% Gratuita (valorada en 500€).

## REGLAS DE RESPUESTA
1. Precios: "Depende del alcance. Desde proyectos pequeños de 1k€ a transformaciones de 50k€. Veámoslo en la auditoría gratuita. [SHOW_CALENDAR]"
2. Cómo empezar: "Con una auditoría de 15 min. Te digo si te podemos ayudar o no. [SHOW_CALENDAR]"
3. Dudas técnicas complejas: "Es más fácil explicártelo con un diagrama en una llamada. [SHOW_CALENDAR]"
4. No uses markdown (negritas, listas), solo texto plano.`;

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { messages } = body as { messages: ChatMessage[] };

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Se requiere al menos un mensaje." },
                { status: 400 }
            );
        }

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

        const reply = completion.choices[0]?.message?.content || "Lo siento, no he podido procesar tu mensaje.";

        return NextResponse.json({ reply }, { status: 200 });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json(
            { error: "Error al procesar el mensaje. Inténtalo de nuevo." },
            { status: 500 }
        );
    }
}
