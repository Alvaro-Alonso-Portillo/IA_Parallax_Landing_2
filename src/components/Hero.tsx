"use client";
import React from "react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative w-full min-h-screen hero-gradient bg-radial-hero bg-arcs overflow-hidden flex flex-col items-center justify-center pt-32 pb-20">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center z-10">

                {/* 1. TEXT CONTENT SECTION */}
                <div className="flex flex-col items-center">
                    {/* GIANT WORD: CONTROL. — wrapped in h1 for SEO */}
                    <h1 className="flex flex-nowrap items-center justify-center">
                        {/* SR-only full text for crawlers */}
                        <span className="sr-only">CONTROL de tus Operaciones — Automatización Inteligente con IA</span>
                        {["C", "O", "N", "T", "R", "O", "L"].map((letter, i) => (
                            <motion.span
                                key={i}
                                aria-hidden="true"
                                initial={{ opacity: 0, y: 70 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.1 * i,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="text-[11.5vw] md:text-[12vw] lg:text-[10vw] font-display font-extrabold text-[#222222] leading-[1] tracking-[-0.05em] select-none"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </h1>

                    {/* SUBTITLE HEADLINE */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.2 }}
                        aria-hidden="true"
                        className="text-2xl md:text-5xl lg:text-7xl font-display font-extrabold text-[#222222] tracking-tight -mt-1 md:-mt-2 lg:-mt-4"
                    >
                        de tus Operaciones.
                    </motion.p>

                    {/* DESCRIPTIVE SUBTITLE */}
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="text-base md:text-xl lg:text-2xl font-body text-[#899097] leading-relaxed mt-6 md:mt-8 max-w-3xl opacity-80"
                    >
                        Automatizamos y optimizamos las operaciones de tu negocio con <span className="text-[#222222] font-semibold">Agentes IA</span> — para que recuperes el control del tiempo y los márgenes.
                    </motion.p>
                </div>

                {/* 2. CTA SECTION (Centered) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-10 md:mt-12 w-full"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
                        className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-4 md:py-[18px] px-8 md:px-[44px] rounded-[4px] text-base md:text-lg shadow-[0_15px_40px_rgba(200,255,0,0.15)] w-full md:w-auto"
                    >
                        Empieza ahora →
                    </motion.button>

                    <a
                        href="/como-funciona"
                        className="text-[#0A0A0A] text-[10px] md:text-xs font-display font-bold tracking-[0.2em] underline decoration-2 underline-offset-8 hover:opacity-70 transition-all uppercase"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        Ver cómo funciona
                    </a>
                </motion.div>

                {/* 3. VISUAL ELEMENTS (Expanded Width) */}
                <div className="mt-16 md:mt-24 w-full flex items-end justify-center gap-x-2 md:gap-x-16 translate-y-4 px-2">
                    {[
                        { color: "bg-[#3893D8]", shape: "rounded-[45%_45%_0_0]", w: "w-10 md:w-32", h: "h-10 md:h-32" },
                        { color: "bg-[#2F9F72]", shape: "rounded-[50%_50%_0_0]", w: "w-16 md:w-52", h: "h-16 md:h-48" },
                        { color: "bg-[#E34E70]", shape: "rounded-full", w: "w-20 md:w-64", h: "h-20 md:h-64" },
                        { color: "bg-[#899097]", shape: "rounded-[4px_4px_0_0]", w: "w-6 md:w-20", h: "h-24 md:h-80" },
                        { color: "bg-[#F3951B]", shape: "rounded-[30%_70%_0_0]", w: "w-18 md:w-56", h: "h-16 md:h-44" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: 2.2 + (i * 0.1),
                                type: "spring",
                                stiffness: 40,
                                damping: 12
                            }}
                            className={`${item.w} ${item.h} ${item.color} ${item.shape} hover:-translate-y-4 transition-transform duration-700 cursor-pointer shadow-lg relative group`}
                        />
                    ))}
                </div>
            </div>

            {/* Subtle Labeling */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2, delay: 3 }}
                className="absolute bottom-12 right-12 text-[9px] font-body text-[#899097] tracking-[0.5em] uppercase hidden lg:block select-none"
                style={{ writingMode: 'vertical-rl' }}
            >
                IA_PARALLAX © 2024 · STRATEGIC DESIGN
            </motion.div>
        </section>
    );
}
