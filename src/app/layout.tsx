import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
    title: "IA_Parallax | Automatización Inteligente para tu Negocio",
    description: "Diseñamos sistemas autónomos con IA para optimizar las operaciones de tu negocio. Agentes IA, análisis de datos y estrategia de automatización desde Sevilla.",
    openGraph: {
        title: "IA_Parallax | Automatización Inteligente",
        description: "Automatizamos y optimizamos las operaciones de tu negocio con Agentes IA — para que recuperes el control del tiempo y los márgenes.",
        locale: "es_ES",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={cn(syne.variable, dmSans.variable, "font-body antialiased bg-surface text-cream")}>
                {children}
            </body>
        </html>
    );
}
