"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const philosophy = [
    {
        word: "ORDEN",
        description: "El ruido operativo desaparece. Solo queda lo que realmente importa para la salud de tu negocio.",
        span: "md:col-span-2",
        colorClass: "text-nBlue",
        bgAccent: "bg-nBlue",
    },
    {
        word: "CALMA",
        description: "Sistemas autónomos que ejecutan con precisión quirúrgica mientras tú recuperas tu tiempo.",
        span: "md:col-span-1",
        colorClass: "text-nGreen",
        bgAccent: "bg-nGreen",
    },
    {
        word: "CONTROL",
        description: "Tú defines el rumbo y las reglas. La inteligencia artificial asegura que se cumplan, siempre.",
        span: "md:col-span-1",
        colorClass: "text-nPink",
        bgAccent: "bg-nPink",
    },
    {
        word: "CRECIMIENTO",
        description: "Evolución constante y escalable sin añadir una sola capa de fricción a tu estructura actual.",
        span: "md:col-span-1",
        colorClass: "text-nOrange",
        bgAccent: "bg-nOrange",
    },
    {
        word: "DATOS",
        description: "Información invisible que se revela en tiempo real para transformarse en decisiones estratégicas.",
        span: "md:col-span-1",
        colorClass: "text-nGrey",
        bgAccent: "bg-nGrey",
    },
];

export function Values() {
    return (
        <section className="relative py-4 md:py-16 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Micro-Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-12"
                >
                    <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-6 md:mb-8">
                        Cómo pensamos
                    </span>
                    <h2 className="text-2xl md:text-5xl font-display font-extrabold text-cream leading-[1.1] tracking-tight">
                        La forma en que<br className="md:hidden" />entendemos el mañana.
                    </h2>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {philosophy.map((item, i) => (
                        <ValueCard key={i} item={item} />
                    ))}
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block opacity-10">
                <p className="text-[10px] font-body text-black tracking-[1em] uppercase vertical-text" style={{ writingMode: 'vertical-rl' }}>
                    SISTEMAS AUTÓNOMOS · IA_PARALLAX
                </p>
            </div>
        </section>
    );
}

function ValueCard({ item }: { item: any }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`${item.span} cursor-pointer`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="bg-white p-8 md:p-12 border-2 border-black rounded-[32px] shadow-sm h-full flex flex-col justify-between group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">

                <motion.div layout className="flex justify-between items-start">
                    <div className="mb-8">
                        <h3 className={`text-2xl md:text-3xl font-display font-extrabold leading-none tracking-tight select-none ${item.colorClass}`}>
                            {item.word}
                        </h3>
                    </div>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 12, scale: isExpanded ? 1.2 : 1 }}
                        className={`w-4 h-4 rounded-lg ${item.bgAccent}`}
                    />
                </motion.div>

                <div className="max-w-md">
                    <motion.p layout className="text-lg text-[#333] font-body leading-relaxed italic mb-8">
                        {item.description}
                    </motion.p>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-8 overflow-hidden"
                            >
                                <div className="h-px w-full bg-black/10 my-6" />
                                <p className="text-sm md:text-base text-[#666] font-body leading-relaxed">
                                    {item.word === "ORDEN" && "Eliminamos el caos estructural para que el foco regrese a la estrategia pura. Un sistema ordenado es un sistema predecible."}
                                    {item.word === "CALMA" && "Cambiamos la urgencia por la precisión. Al delegar procesos críticos en sistemas autónomos, el equipo puede trabajar en estado de flujo."}
                                    {item.word === "CONTROL" && "La tecnología no toma el mando; tú marcas las directrices. La IA es el ejecutor infatigable de tu visión estratégica."}
                                    {item.word === "CRECIMIENTO" && "Escalamos sin aumentar la complejidad. Nuestra arquitectura permite expandir operaciones manteniendo los mismos recursos."}
                                    {item.word === "DATOS" && "No solo recopilamos números; extraemos significado. Convertimos el flujo de información en un mapa de oportunidades reales."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div layout className={`h-1.5 w-16 rounded-full ${item.bgAccent}`} />
                </div>

                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-40 transition-opacity">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-black">
                        {isExpanded ? "Cerrar" : "Expandir"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
