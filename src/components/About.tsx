"use client";
import React from "react";
import { motion } from "framer-motion";
import { ScrollRevealText } from "./ScrollRevealText";

export function About() {
    return (
        <section id="nosotros" className="py-4 md:py-9 bg-surface overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Micro-Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16"
                >
                    <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888]">
                        Nosotros
                    </span>
                </motion.div>

                {/* Strong headline - GIANT */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-editorial-5xl lg:text-editorial-6xl font-display font-bold text-cream leading-[1] tracking-tight mb-12 md:mb-20"
                >
                    Quienes<br />Somos.
                </motion.h2>

                {/* Content with Scroll Reveal */}
                <div className="max-w-4xl">
                    <ScrollRevealText
                        text="Desde SEVILLA, aportamos una nueva perspectiva a la tecnología. Creemos que cada negocio es un ecosistema delicado que percibe mucho más de lo que vemos a simple vista. Nuestra misión es decodificar esas señales: sentir las ineficiencias y anticipar los patrones antes de que sean obvios.."
                        highlightWords={["SEVILLA", "tecnología", "nueva perspectiva"]}
                        className="text-editorial-xl md:text-editorial-2xl lg:text-editorial-3xl font-display font-medium leading-relaxed mb-20"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="max-w-2xl"
                    >
                        <p className="text-editorial-sm md:text-editorial-base text-muted font-body leading-relaxed italic">
                            Para nosotros, el crecimiento vive en micro-momentos que solemos pasar por alto. Destellos de eficiencia, seguridad, asombro y juego se acumulan a lo largo del tiempo, detalles ordinarios que silenciosamente dan forma a la historia de un negocio.
                        </p>

                        <div className="mt-12 h-px w-24 bg-nPink" />

                        <p className="mt-12 text-editorial-sm md:text-editorial-base text-muted font-body leading-relaxed">
                            Y hoy, esperamos notar esos momentos contigo y mantenerlos cerca.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
