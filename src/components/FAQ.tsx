"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "¿Cuánto tiempo lleva implementar la automatización?",
        answer: "Depende de la complejidad de tus procesos. Proyectos típicos tardan entre 2-4 semanas desde el análisis inicial hasta la implementación completa. Empezamos con una auditoría gratuita para darte un timeline exacto basado en tus necesidades específicas."
    },
    {
        question: "¿Qué tipo de procesos se pueden automatizar?",
        answer: "Automatizamos cualquier proceso repetitivo basado en reglas: atención al cliente, procesamiento de documentos, actualización de inventarios, gestión de leads, análisis de datos, reportes automáticos, y mucho más. Durante la auditoría identificamos exactamente qué procesos darán mayor ROI."
    },
    {
        question: "¿Necesito conocimientos técnicos para usar los agentes IA?",
        answer: "Absolutamente no. Diseñamos los sistemas para que tu equipo pueda usarlos sin formación técnica. Proporcionamos capacitación completa y documentación, y nuestro soporte está disponible para ayudarte. Los agentes trabajan en segundo plano mientras tú te enfocas en el negocio."
    },
    {
        question: "¿Qué pasa si la IA comete un error?",
        answer: "Nuestros sistemas incluyen múltiples capas de validación y supervisión humana donde sea crítico. Configuramos umbrales de confianza y escenarios de contingencia. Además, aprendemos de cada interacción para mejorar continuamente la precisión, que suele superar el 98%."
    },
    {
        question: "¿Cuánto cuesta la automatización con IA?",
        answer: "Cada proyecto es único. Después de la auditoría gratuita, te presentamos una propuesta detallada con inversión inicial y ROI proyectado. Generalmente nuestros clientes recuperan la inversión en 3-6 meses gracias a los ahorros operativos y el aumento de eficiencia."
    },
    {
        question: "¿Puedo integrar esto con mis sistemas actuales?",
        answer: "Sí, trabajamos con las principales plataformas del mercado: HubSpot, Salesforce, Shopify, SAP, Microsoft Dynamics, y más. Diseñamos arquitecturas modulares que se integran perfectamente con tu stack tecnológico existente sin interrumpir tus operaciones."
    },
    {
        question: "¿Qué garantías ofrecéis?",
        answer: "Garantizamos resultados medibles. Si tras 90 días de implementación no ves la mejora prometida, trabajamos gratuitamente hasta alcanzarla o te devolvemos el 100% de la inversión. Tenemos un 98% de satisfacción cliente y ningún caso de reembolso hasta la fecha."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-16 md:py-24 bg-surface">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C8FF00] mb-4 block">
                        FAQ
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-cream mb-4">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-base md:text-lg text-cream/60 max-w-2xl mx-auto">
                        Todo lo que necesitas saber sobre nuestra automatización con IA
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="border border-cream/10 rounded-lg overflow-hidden bg-white/5"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-base md:text-lg font-display font-bold text-cream pr-4">
                                    {faq.question}
                                </span>
                                <span className="flex-shrink-0">
                                    {openIndex === i ? (
                                        <Minus className="w-5 h-5 text-[#C8FF00]" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-cream/60" />
                                    )}
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 md:px-6 pb-5 md:pb-6 text-cream/70 font-body leading-relaxed border-t border-cream/10 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Help */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-cream/60">
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-sm">
                            ¿Tienes más preguntas?{' '}
                            <button 
                                onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
                                className="text-[#C8FF00] hover:underline font-bold"
                            >
                                Contáctanos
                            </button>
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
