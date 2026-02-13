import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300", "400", "500", "600", "700"] });

/* ═══════ SEO: Metadata ═══════ */
const SITE_URL = "https://iaparallax.com";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title: {
        default: "IA_Parallax | Automatización Inteligente para tu Negocio",
        template: "%s | IA_Parallax",
    },
    description:
        "Diseñamos sistemas autónomos con IA para optimizar las operaciones de tu negocio. Agentes IA, análisis de datos y estrategia de automatización desde Sevilla.",
    keywords: [
        "automatización inteligente",
        "agentes IA",
        "inteligencia artificial empresa",
        "automatización procesos Sevilla",
        "IA para negocios",
        "optimización operaciones",
        "chatbot IA",
        "análisis de datos",
        "transformación digital",
        "automatización con IA España",
        "consultoría IA",
        "machine learning empresa",
        "RPA inteligente",
        "IA Parallax",
    ],
    authors: [{ name: "IA_Parallax", url: SITE_URL }],
    creator: "IA_Parallax",

    icons: {
        icon: "https://res.cloudinary.com/drfr1lzlt/image/upload/v1770720436/Replace_purple_and_2k_202602091203-removebg-preview_resice.png",
    },

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    openGraph: {
        title: "IA_Parallax | Automatización Inteligente",
        description:
            "Automatizamos y optimizamos las operaciones de tu negocio con Agentes IA — para que recuperes el control del tiempo y los márgenes.",
        url: SITE_URL,
        siteName: "IA_Parallax",
        locale: "es_ES",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "IA_Parallax | Automatización Inteligente",
        description:
            "Diseñamos sistemas autónomos con IA para optimizar las operaciones de tu negocio desde Sevilla.",
        creator: "@iaparallax",
    },
};

/* ═══════ SEO: JSON-LD Structured Data ═══════ */
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "IA_Parallax",
            url: SITE_URL,
            logo: {
                "@type": "ImageObject",
                url: "https://res.cloudinary.com/drfr1lzlt/image/upload/v1770720436/Replace_purple_and_2k_202602091203-removebg-preview_resice.png",
            },
            description:
                "Empresa de automatización inteligente con IA con sede en Sevilla. Diseñamos agentes IA, automatizamos procesos y optimizamos operaciones de negocio.",
            contactPoint: {
                "@type": "ContactPoint",
                email: "info@iaparallax.com",
                contactType: "customer service",
                availableLanguage: ["Spanish", "English"],
            },
            sameAs: [],
        },
        {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#localbusiness`,
            name: "IA_Parallax",
            url: SITE_URL,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Sevilla",
                addressRegion: "Andalucía",
                addressCountry: "ES",
            },
            priceRange: "€€",
            knowsAbout: [
                "Inteligencia Artificial",
                "Automatización de Procesos",
                "Agentes IA",
                "Machine Learning",
                "Análisis de Datos",
                "Transformación Digital",
            ],
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "IA_Parallax",
            inLanguage: "es",
            publisher: { "@id": `${SITE_URL}/#organization` },
        },
    ],
};

import { Suspense } from "react";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <head>
                {/* Preconnect to external origins for performance */}
                <link rel="preconnect" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={cn(syne.variable, dmSans.variable, "font-body antialiased bg-surface text-cream")}>
                <Suspense fallback={null}>
                    <AnalyticsTracker />
                </Suspense>
                {children}
            </body>
        </html>
    );
}
