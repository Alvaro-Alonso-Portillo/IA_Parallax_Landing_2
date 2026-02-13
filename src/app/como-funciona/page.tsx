import type { Metadata } from "next";
import { ComoFuncionaClient } from "@/app/como-funciona/ComoFuncionaClient";

export const metadata: Metadata = {
    title: "Cómo Funciona — Método de Automatización en 4 Fases",
    description:
        "Descubre nuestro método de 4 fases para automatizar tu negocio con IA: Diagnóstico, Diseño, Implementación y Evolución. Sin prisas, sin dependencia.",
    keywords: [
        "método automatización IA",
        "fases automatización empresa",
        "consultoría automatización",
        "diagnóstico procesos IA",
        "implementación IA empresa",
        "cómo automatizar mi negocio",
    ],
    alternates: {
        canonical: "/como-funciona",
    },
    openGraph: {
        title: "Cómo Funciona | IA_Parallax",
        description:
            "Automatización con sentido. Nuestro método paso a paso para transformar tus operaciones con IA.",
        url: "https://iaparallax.com/como-funciona",
        locale: "es_ES",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Cómo Funciona | IA_Parallax",
        description:
            "Nuestro método de 4 fases para automatizar tu negocio: Diagnóstico, Diseño, Implementación y Evolución.",
    },
};

/* JSON-LD: HowTo schema for the 4-phase methodology */
const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo automatizar tu negocio con IA_Parallax",
    description:
        "Método de 4 fases para implementar automatización inteligente en tu empresa.",
    step: [
        {
            "@type": "HowToStep",
            position: 1,
            name: "Diagnóstico",
            text: "Analizamos tus procesos actuales para identificar oportunidades de automatización con el mayor impacto posible.",
        },
        {
            "@type": "HowToStep",
            position: 2,
            name: "Diseño",
            text: "Diseñamos la solución a medida, definiendo flujos, integraciones y métricas de éxito antes de escribir una sola línea de código.",
        },
        {
            "@type": "HowToStep",
            position: 3,
            name: "Implementación",
            text: "Construimos e integramos el sistema paso a paso, con tu equipo involucrado en cada sprint para asegurar la adopción.",
        },
        {
            "@type": "HowToStep",
            position: 4,
            name: "Evolución",
            text: "Monitorizamos, optimizamos y escalamos la solución. Tu equipo queda capacitado para operar sin depender de nosotros.",
        },
    ],
};

export default function ComoFuncionaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
            />
            <ComoFuncionaClient />
        </>
    );
}
