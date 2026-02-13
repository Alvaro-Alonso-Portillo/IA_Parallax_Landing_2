import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Todos los campos son obligatorios." },
                { status: 400 }
            );
        }

        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from("contact_messages")
            .insert([{ name, email, phone: phone || null, message }]);

        if (dbError) {
            console.error("Supabase error:", dbError);
            return NextResponse.json(
                { error: "Error al guardar el mensaje. Inténtalo de nuevo." },
                { status: 500 }
            );
        }

        // 2. Send email notification via Resend
        const notificationEmail = process.env.NOTIFICATION_EMAIL;

        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_api_key_here" && notificationEmail) {
            try {
                const emailResult = await resend.emails.send({
                    from: "IA Parallax <onboarding@resend.dev>",
                    to: notificationEmail,
                    subject: `📩 Nuevo contacto: ${name}`,
                    html: `
                        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; border-radius: 12px; overflow: hidden;">
                            <div style="background: #C8FF00; padding: 24px 32px;">
                                <h1 style="margin: 0; color: #0A0A0A; font-size: 24px; font-weight: 800;">Nuevo mensaje de contacto</h1>
                            </div>
                            <div style="padding: 32px;">
                                <div style="margin-bottom: 24px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Nombre</p>
                                    <p style="color: #F2F1ED; font-size: 18px; font-weight: 600; margin: 0;">${name}</p>
                                </div>
                                <div style="margin-bottom: 24px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Email</p>
                                    <p style="color: #C8FF00; font-size: 18px; margin: 0;">
                                        <a href="mailto:${email}" style="color: #C8FF00; text-decoration: none;">${email}</a>
                                    </p>
                                </div>
                                ${phone ? `
                                <div style="margin-bottom: 24px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Teléfono</p>
                                    <p style="color: #F2F1ED; font-size: 18px; margin: 0;">
                                        <a href="tel:${phone}" style="color: #C8FF00; text-decoration: none;">${phone}</a>
                                    </p>
                                </div>` : ''}
                                <div style="margin-bottom: 24px;">
                                    <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 6px;">Mensaje</p>
                                    <p style="color: #F2F1ED; font-size: 15px; line-height: 1.6; margin: 0; background: #1a1a1a; padding: 16px; border-radius: 8px; border-left: 3px solid #C8FF00;">${message}</p>
                                </div>
                                <hr style="border: none; border-top: 1px solid #333; margin: 24px 0;" />
                                <p style="color: #555; font-size: 12px; margin: 0;">
                                    Recibido desde ia_parallax · ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}
                                </p>
                            </div>
                        </div>
                    `,
                });
                console.log("Resend response:", JSON.stringify(emailResult));
            } catch (emailError) {
                // Log but don't fail — the message is already saved in Supabase
                console.error("Resend email error:", JSON.stringify(emailError, Object.getOwnPropertyNames(emailError as object)));
            }
        }

        return NextResponse.json(
            { success: true, message: "Mensaje enviado correctamente." },
            { status: 200 }
        );
    } catch (error) {
        console.error("API contact error:", error);
        return NextResponse.json(
            { error: "Error interno del servidor." },
            { status: 500 }
        );
    }
}
