"use client";
import React from "react";
import { motion } from "framer-motion";

export function Closing() {
    return (
        <section className="relative py-4 md:py-9 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Micro-Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-8">
                        Filosofía
                    </span>
                    <h3 className="text-sm font-display font-medium text-cream/60">Donde la historia continúa</h3>
                </motion.div>

                {/* Main Content: Giant centered text with colored keywords */}
                <div className="flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-[#222222] leading-[1.2] md:leading-[1.3] max-w-5xl mb-12 md:mb-16"
                    >
                        Todos estos <span className="text-[#F3951B]">momentos</span> apuntan suavemente más allá de esta página— hacia un mundo de servicios, historias y una <span className="text-[#3893D8]">filosofía</span> tranquila, donde nuestros valores, <span className="text-[#2F9F72]">proyectos</span> y esperanzas cobran vida.
                    </motion.h2>

                    {/* Explore More Button: Red rounded pill */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <button
                            onClick={() => {
                                window.location.href = "mailto:hello@iaparallax.com";
                            }}
                            className="bg-[#E34E70] text-white px-10 py-4 rounded-full text-xs font-display font-bold uppercase tracking-widest hover:scale-105 hover:bg-[#D13D5F] transition-all shadow-lg active:scale-95"
                        >
                            Explorar Más
                        </button>
                    </motion.div>

                    {/* Decorative bottom dot */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="w-10 h-10 bg-[#222222] rounded-full mt-32 opacity-[0.9]"
                    />
                </div>
            </div>
        </section>
    );
}
