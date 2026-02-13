import type { Metadata } from "next";
import ComoFuncionaClient from "./ComoFuncionaClient";

export const metadata: Metadata = {
    title: "Cómo Funciona | IA_Parallax — Método de Automatización",
    description:
        "Descubre nuestro método de 4 fases para automatizar tu negocio: Diagnóstico, Diseño, Implementación y Evolución. Sin prisas, sin dependencia.",
    openGraph: {
        title: "Cómo Funciona | IA_Parallax",
        description:
            "Automatización con sentido. Nuestro método paso a paso para transformar tus operaciones con IA.",
        locale: "es_ES",
        type: "website",
    },
};

export default function ComoFuncionaPage() {
    return <ComoFuncionaClient />;
}
