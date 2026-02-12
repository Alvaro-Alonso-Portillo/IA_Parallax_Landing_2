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
                        className="text-editorial-xl md:text-editorial-2xl lg:text-editorial-3xl font-display font-medium leading-relaxed mb-20 text-cream"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="max-w-2xl"
                    >
                        <p className="text-editorial-sm md:text-editorial-base text-muted/80 font-body leading-relaxed italic border-l-2 border-nPink pl-6">
                            Para nosotros, el crecimiento vive en micro-momentos que solemos pasar por alto. Destellos de eficiencia, seguridad, asombro y juego se acumulan a lo largo del tiempo.
                        </p>

                        {/* HUMANIZATION: TEAM SECTION */}
                        <div className="mt-24 pt-12 border-t border-cream/10">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase mb-12 text-muted/60">
                                Liderazgo Técnico
                            </h3>

                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center group">
                                {/* Abstract Avatar - Brutalist Style */}
                                {/* User Avatar */}
                                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-[#222] rounded-full overflow-hidden border-2 border-cream/20 group-hover:border-nGreen transition-colors duration-500">
                                    <img
                                        src="https://res.cloudinary.com/drfr1lzlt/image/upload/v1765207162/foto_portfolio_2_kbeeh3.png"
                                        alt="Alvaro Alonso"
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-3xl md:text-4xl font-display font-black text-white mb-2 tracking-tight group-hover:text-nGreen transition-colors duration-300">
                                        Alvaro Alonso
                                    </h4>
                                    <p className="text-xs font-bold tracking-widest uppercase text-nGreen mb-6">
                                        Founder & Automation Architect
                                    </p>
                                    <p className="text-sm md:text-base font-body text-muted leading-relaxed max-w-sm italic opacity-80">
                                        "No construimos software para que lo mires. Lo construimos para que tu negocio funcione mientras tú no miras."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
