"use client";
import { motion } from "framer-motion";
import React from "react";

const projects = [
    {
        title: "Soporte Autónomo FinTech",
        year: "2024",
        result: "78% Reducción Operativa.",
        descriptor: "en gestión de tareas administrativas",
        sub: "Resolución instantánea en 5 idiomas.",
        color: "text-[#3893D8]",
        label: "AZUL"
    },
    {
        title: "Motor de Precios E-commerce",
        year: "2023",
        result: "+12% Margen Neto.",
        descriptor: "en clientes B2B",
        sub: "Optimización continua en tiempo real.",
        color: "text-[#F3951B]",
        label: "NARANJA"
    },
    {
        title: "Análisis Documental Legal",
        year: "2024",
        result: "500 páginas / minuto.",
        descriptor: "procesadas con análisis automático",
        sub: "Precisión absoluta sin supervisión.",
        color: "text-[#2F9F72]",
        label: "VERDE"
    },
];

export function Work() {
    return (
        <section id="proyectos" className="relative py-4 md:py-9 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Micro-Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24"
                >
                    <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-8">
                        Resultados
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-[#222222] leading-none tracking-tighter">
                        Casos Reales.
                    </h2>
                </motion.div>

                {/* 2. Gallery Items (Asymmetric & Colorful) */}
                <div className="space-y-20 md:space-y-32">
                    {projects.map((project, i) => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? "items-start" : "items-end"}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`max-w-4xl group ${i % 2 === 0 ? "text-left" : "text-right"}`}
                            >
                                {/* Indicator */}
                                <div className={`mb-6 flex items-center gap-4 text-[10px] font-display font-bold text-muted tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                                    <span>{project.label}</span>
                                    <span className="w-8 h-px bg-muted/20" />
                                    <span>{project.year}</span>
                                </div>

                                {/* Main Metric / Title */}
                                <h3 className={`text-4xl md:text-7xl lg:text-9xl font-display font-bold leading-[0.9] tracking-tighter ${project.color} group-hover:scale-[1.02] transition-transform duration-500 break-words`}>
                                    {project.result}
                                </h3>

                                {/* Descriptor Line */}
                                <p className="text-[12px] md:text-[13px] text-[#888] font-body mt-2 mb-8">
                                    {project.descriptor}
                                </p>

                                <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-12 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                                    <p className="text-xl md:text-2xl font-display font-medium text-[#222222]">
                                        {project.title}
                                    </p>
                                    <p className="text-xs md:text-sm font-body text-[#899097] max-w-sm">
                                        {project.sub}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* 2.5 RESULTS CTA ROW */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-32 border-t border-[#222222]/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-[#222222]">
                        ¿Quieres resultados así?
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
                        className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-[16px] px-[40px] rounded-[4px] text-lg shadow-[0_10px_30px_rgba(200,255,0,0.1)]"
                    >
                        Hablemos →
                    </motion.button>
                </motion.div>

                {/* 3. Poetic Closing */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 md:mt-32 flex flex-col items-center text-center"
                >
                    <div className="w-1 h-24 bg-[#222222]/5 mb-12" />
                    <p className="text-xl md:text-3xl font-display font-medium text-muted/60 leading-tight max-w-2xl italic">
                        "Cada sistema que construimos no es solo código. Es tiempo devuelto a las personas que mueven la empresa."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
