"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
    {
        name: "AZUL",
        title: "Curiosidad silenciosa.",
        items: [
            { label: "Investigación", img: "https://nekozenworld.jp/wp-content/uploads/2025/12/face2_1@2x-8.png" },
            { label: "Análisis", img: "https://nekozenworld.jp/wp-content/uploads/2025/12/face2_1@2x-8.png" },
        ]
    },
    {
        name: "ROSA",
        title: "Atención aguda.",
        items: [
            { label: "Respuesta", img: "https://nekozenworld.jp/wp-content/uploads/2025/12/face1@2x-8.png" },
            { label: "Alerta", img: "https://nekozenworld.jp/wp-content/uploads/2025/12/face1@2x-8.png" },
        ]
    },
    {
        name: "NARANJA",
        title: "Alegría eficiente.",
        items: [
            { label: "Automatización", img: "https://nekozenworld.jp/wp-content/uploads/2025/12/face6@2x-8.png" },
            { label: "Flujo", img: "https://nekozenworld.jp/wp-content/uploads/2025/12/face6@2x-8.png" },
        ]
    }
];

export function FeelingSection() {
    const [hoveredImg, setHoveredImg] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="py-24 md:py-48 bg-surface relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section indicator */}
                <div className="mb-12 md:mb-16">
                    <span className="text-[10px] font-body text-muted tracking-widest uppercase">（ 03 ）</span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-cream mt-4">Nuestros Colores.</h2>
                </div>

                <div className="space-y-32">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-start gap-8 md:gap-32 border-t border-cream/5 pt-12">
                            <div className="w-32 flex-shrink-0">
                                <span className="text-xs font-display font-bold tracking-[0.3em] text-muted uppercase">
                                    {cat.name}
                                </span>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-display font-medium mb-12 italic opacity-60">
                                    {cat.title}
                                </h3>

                                <ul className="flex flex-wrap gap-x-12 gap-y-8">
                                    {cat.items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="stagger-menu cursor-none"
                                            onMouseEnter={() => setHoveredImg(item.img)}
                                            onMouseLeave={() => setHoveredImg(null)}
                                        >
                                            <div className="text-4xl md:text-6xl font-display font-bold text-cream">
                                                <span className="word">
                                                    {item.label.split("").map((l, lidx) => (
                                                        <span key={lidx} className="letter" style={{ "--delay": `${lidx * 0.03}s` } as any}>
                                                            {l}
                                                        </span>
                                                    ))}
                                                    <span className="absolute top-full left-0">
                                                        {item.label.split("").map((l, lidx) => (
                                                            <span key={lidx} className="letter" style={{ "--delay": `${lidx * 0.03}s` } as any}>
                                                                {l}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hover Image Follower */}
            <AnimatePresence>
                {hoveredImg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                        style={{
                            position: "fixed",
                            left: mousePos.x,
                            top: mousePos.y,
                            translateX: "-50%",
                            translateY: "-50%",
                            pointerEvents: "none",
                            zIndex: 100,
                        }}
                        className="w-48 h-48 pointer-events-none"
                    >
                        <img
                            src={hoveredImg}
                            alt="Visual hint"
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
