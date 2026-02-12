"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Calendar, Mail } from "lucide-react";

const benefits = [
    "Auditoría gratuita de tus procesos",
    "Propuesta personalizada en 48h",
    " roadmap de implementación",
    "Sin compromiso ni costes ocultos"
];

export function Closing() {
    return (
        <section className="relative py-16 md:py-24 bg-surface overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Value Proposition */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C8FF00]">
                                Empecemos
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-cream leading-[1.1] mb-6"
                        >
                            ¿Listo para transformar tus operaciones?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-cream/70 mb-8 font-body leading-relaxed"
                        >
                            Agenda una consulta estratégica gratuita. Analizamos tus procesos y te mostramos exactamente dónde la IA puede ahorrarte tiempo y dinero.
                        </motion.p>

                        {/* Benefits List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="space-y-3 mb-8"
                        >
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 text-cream/80">
                                    <Check className="w-5 h-5 text-[#C8FF00] flex-shrink-0" />
                                    <span className="text-sm md:text-base">{benefit}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: CTA Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl"
                    >
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-[#222] mb-2">
                            Auditoría Gratuita
                        </h3>
                        <p className="text-sm text-gray-600 mb-8">
                            Valorada en 500€. Por tiempo limitado, sin coste.
                        </p>

                        <div className="space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
                                className="w-full bg-[#C8FF00] text-[#0A0A0A] font-bold py-4 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                            >
                                <Calendar className="w-5 h-5" />
                                Agendar Consulta
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.location.href = "mailto:hello@iaparallax.com"}
                                className="w-full border-2 border-[#222] text-[#222] font-bold py-4 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-[#222] hover:text-white transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                Enviar Email
                            </motion.button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-500">
                                Respuesta garantizada en menos de 24 horas
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-cream/10"
                >
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-display font-black text-cream">30min</div>
                        <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-cream/40 mt-1">Duración</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-display font-black text-cream">100%</div>
                        <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-cream/40 mt-1">Gratis</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-display font-black text-cream">0</div>
                        <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-cream/40 mt-1">Compromiso</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
