"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const services = [
    {
        name: "Agentes IA",
        color: "text-[#3893D8]",
        sub: "Trabajadores autónomos de conocimiento.",
        pos: "top-[12%] left-[2%]",
        hover: { scale: 1.1, rotate: -2, y: -10 },
        details: {
            description: "Entidades de software diseñadas para realizar tareas complejas de forma autónoma, imitando el razonamiento humano.",
            how: "Diseñamos un cerebro digital entrenado con tus protocolos. Actúan: mueven datos, generan documentos y resuelven incidencias.",
            benefits: ["Disponibilidad 24/7 sin fatiga.", "Escalabilidad inmediata.", "Precisión absoluta en procesos críticos."],
            impact: "78% de ahorro en tareas administrativas."
        }
    },
    {
        name: "Crecimiento",
        color: "text-[#F3951B]",
        sub: "Optimización que nunca duerme.",
        pos: "top-[22%] left-[42%]",
        hover: { scale: 1.1, x: 20, skewX: -5 },
        details: {
            description: "La automatización permite escalar sin que los costes operativos se coman el margen.",
            how: "Identificamos límites humanos y aplicamos sistemas que procesan volúmenes x10 sin aumentar la plantilla.",
            benefits: ["Expansión rápida.", "Optimización de márgenes.", "Mayor capacidad de respuesta."],
            impact: "Doblamos la capacidad sin contratar más."
        }
    },
    {
        name: "Análisis",
        color: "text-[#E34E70]",
        sub: "Patrones invisibles revelados.",
        pos: "top-[42%] left-[2%]",
        hover: { scale: 1.05, rotate: 3, y: 15 },
        details: {
            description: "Convertimos océanos de datos brutos en inteligencia accionable y real.",
            how: "Modelos de lenguaje 'leen' miles de documentos al minuto, extrayendo patrones que el equipo tardaría meses en notar.",
            benefits: ["Detección de riesgos.", "Nuevas oportunidades.", "Decisiones basadas en realidad."],
            impact: "Predicción de tendencias con 95% de acierto."
        }
    },
    {
        name: "Estrategia",
        color: "text-[#2F9F72]",
        sub: "Decisiones basadas en datos.",
        pos: "top-[58%] left-[45%]",
        hover: { scale: 1.15, letterSpacing: "0.05em" },
        details: {
            description: "La automatización estratégica es inversión con retorno medible y propósito.",
            how: "Auditamos tu arquitectura y definimos un roadmap progresivo, priorizando lo que más impacto tiene en tu rentabilidad.",
            benefits: ["Alineación total con objetivos.", "Evitamos gastos innecesarios.", "Tecnología de vanguardia."],
            impact: "Retorno de inversión en menos de 6 meses."
        }
    },
    {
        name: "Flujos",
        color: "text-[#EAB308]",
        sub: "Sistemas que no estorban.",
        pos: "top-[75%] left-[2%]",
        hover: { scale: 1.1, rotateY: 20, x: -10 },
        details: {
            description: "Eliminamos silos y fricciones que ralentizan el día a día de tu equipo.",
            how: "Conectamos tus herramientas CRM y ERP mediante integraciones que aseguran que el dato esté donde debe estar.",
            benefits: ["Cero duplicación de tareas.", "Sincronización total.", "Experiencia interna simplificada."],
            impact: "Ahorro de 15 horas semanales por empleado."
        }
    },
    {
        name: "Futuro",
        color: "text-[#7C79B0]",
        sub: "Anticipando la próxima oportunidad.",
        pos: "top-[80%] left-[40%]",
        hover: { scale: 1.2, filter: "brightness(1.2) drop-shadow(0 0 20px rgba(124, 121, 176, 0.3))" },
        details: {
            description: "Construimos plataformas preparadas para lo que sea que traiga la IA mañana.",
            how: "Utilizamos arquitecturas modulares que permiten actualizar motores de IA sin reconstruir todo el sistema.",
            benefits: ["Tecnología siempre actualizada.", "Resiliencia de mercado.", "Ventaja competitiva sostenida."],
            impact: "Arquitecturas listas para la próxima década."
        }
    }
];

export function Services() {
    const [tilt, setTilt] = useState<{ id: number; x: number; y: number } | null>(null);

    const handleTiltMove = (e: React.MouseEvent, index: number) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - card.left) / card.width - 0.5) * 16; // ±8 degrees
        const y = ((e.clientY - card.top) / card.height - 0.5) * -16;
        setTilt({ id: index, x, y });
    };

    return (
        <section className="relative w-full h-auto md:h-[110vh] bg-surface overflow-hidden py-24 md:py-9" id="servicios">
            <div className="relative w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">

                {/* Section Micro-Label */}
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-12"
                >
                    Qué hacemos
                </motion.span>

                <div className="relative flex-1">
                    {/* Desktop/Tablet Cloud View — 3D perspective */}
                    <div className="hidden md:block absolute inset-0" style={{ perspective: "1200px" }}>
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.15 }}
                                className={`absolute ${service.pos} group cursor-pointer`}
                                onClick={() => window.dispatchEvent(new CustomEvent("open-service", { detail: service }))}
                                onMouseMove={(e) => handleTiltMove(e, i)}
                                onMouseLeave={() => setTilt(null)}
                                style={{
                                    transform: tilt?.id === i
                                        ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
                                        : "rotateY(0deg) rotateX(0deg)",
                                    transition: tilt?.id === i ? "transform 0.1s ease" : "transform 0.5s ease-out",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <motion.div
                                    whileHover={service.hover}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="flex flex-col"
                                >
                                    <h3 className={`text-6xl lg:text-8xl font-display font-extrabold ${service.color} leading-none tracking-tight whitespace-nowrap group-hover:drop-shadow-sm transition-all`}>
                                        {service.name}
                                    </h3>
                                    <p className="text-xs font-body text-muted mt-4 font-medium opacity-60 group-hover:opacity-100 transition-opacity max-w-[160px]">
                                        {service.sub}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile List View */}
                    <div className="md:hidden flex flex-col gap-10 py-10">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer border-b border-black/5 pb-8 last:border-none"
                                onClick={() => window.dispatchEvent(new CustomEvent("open-service", { detail: service }))}
                            >
                                <h3 className={`text-[2.1rem] font-display font-extrabold ${service.color} leading-none tracking-tight mb-4`}>
                                    {service.name}
                                </h3>
                                <p className="text-xs font-body text-muted/60 uppercase tracking-[0.1em] font-bold">
                                    {service.sub}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section Footnote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[14px] font-normal tracking-[0.04em] text-[#888888] mt-12 uppercase text-left"
                >
                    Haz clic en cada área para entender el sistema.
                </motion.p>
            </div>
        </section>
    );
}
