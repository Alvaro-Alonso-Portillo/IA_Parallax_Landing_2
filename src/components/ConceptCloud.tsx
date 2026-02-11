"use client";
import React from "react";
import { motion } from "framer-motion";

const concepts = [
    {
        label: "Curiosidad",
        color: "text-[#3893D8]",
        sub: "Chispas silenciosas de asombro.",
        pos: "top-[10%] left-[60%]"
    },
    {
        label: "Atención",
        color: "text-[#E34E70]",
        sub: "Ojos brillantes. Oídos atentos.",
        pos: "top-[25%] left-[5%]"
    },
    {
        label: "Juego",
        color: "text-[#F3951B]",
        sub: "Sistemas en movimiento.",
        pos: "top-[20%] left-[65%]"
    },
    {
        label: "Alegría",
        color: "text-[#F3951B]",
        sub: "Pequeñas ráfagas de eficiencia.",
        pos: "top-[50%] left-[40%]"
    },
    {
        label: "Calma",
        color: "text-[#2F9F72]",
        sub: "Luz cálida, momentos lentos.",
        pos: "top-[60%] left-[8%]"
    },
    {
        label: "Misterio",
        color: "text-[#7C79B0]",
        sub: "Secretos suaves en el interior.",
        pos: "top-[75%] left-[75%]"
    },
    {
        label: "Paz",
        color: "text-[#98C15E]",
        sub: "Respiración pausada.",
        pos: "top-[80%] left-[10%]"
    }
];

export function ConceptCloud() {
    return (
        <section className="relative w-full h-[120vh] bg-surface overflow-hidden py-32">
            <div className="relative w-full h-full max-w-7xl mx-auto">

                {/* TOUCH ME floating dot (Nekozen signature) */}
                <motion.div
                    animate={{
                        x: [0, 20, -20, 0],
                        y: [0, -20, 20, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[45%] left-[30%] z-20 w-10 h-10 bg-[#222222] rounded-full flex items-center justify-center text-[7px] text-white font-bold leading-none text-center p-2 uppercase"
                >
                    TOUCH<br />ME
                </motion.div>

                {concepts.map((concept, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`absolute ${concept.pos} group cursor-pointer`}
                    >
                        <div className="flex flex-col">
                            <span className="text-[10px] font-display font-bold text-muted mb-2 tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                                {concept.label === "Curiosidad" ? "AZUL" :
                                    concept.label === "Atención" ? "ROSA" :
                                        concept.label === "Juego" ? "AMARILLO" :
                                            concept.label === "Alegría" ? "NARANJA" :
                                                concept.label === "Calma" ? "VERDE" :
                                                    concept.label === "Misterio" ? "MORADO" : "VERDE CLARO"}
                            </span>
                            <h3 className={`text-7xl md:text-9xl font-display font-extrabold ${concept.color} leading-none tracking-tight transition-transform duration-500 group-hover:scale-110`}>
                                {concept.label}
                            </h3>
                            <p className="text-[10px] md:text-xs font-body text-muted mt-4 font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                                {concept.sub}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
