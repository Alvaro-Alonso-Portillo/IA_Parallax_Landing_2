"use client";
import { motion } from "framer-motion";
import React from "react";
import { ArrowUpRight, Clock, Users, TrendingUp, CheckCircle } from "lucide-react";

const projects = [
    {
        title: "Soporte Autónomo FinTech",
        client: "FinTech Solutions",
        industry: "Servicios Financieros",
        year: "2024",
        result: "78% Reducción",
        metric: "en costes operativos",
        sub: "Agente IA multilingüe resolviendo consultas 24/7",
        color: "#3893D8",
        textColor: "text-[#3893D8]",
        before: "10 agentes humanos, tiempos de respuesta 4h",
        after: "1 supervisor + IA, respuesta inmediata",
        roi: "ROI en 3 meses",
        testimonial: "Los clientes ni se dan cuenta de que hablan con IA. La satisfacción subió un 23%.",
        features: ["Soporte en 5 idiomas", "Resolución automática del 85%", "Escalado inteligente"]
    },
    {
        title: "Motor de Precios E-commerce",
        client: "E-Commerce Pro",
        industry: "Retail Online",
        year: "2023",
        result: "+12% Margen",
        metric: "neto recuperado",
        sub: "Optimización dinámica basada en demanda y competencia",
        color: "#F3951B",
        textColor: "text-[#F3951B]",
        before: "Precios estáticos, pérdida de margen",
        after: "Pricing dinámico en tiempo real",
        roi: "+€180k/año",
        testimonial: "Por fin podemos competir con Amazon sin sacrificar rentabilidad.",
        features: ["Análisis de competencia", "Elasticidad de demanda", "Promociones automáticas"]
    },
    {
        title: "Análisis Documental Legal",
        client: "Lex Consultores",
        industry: "Sector Legal",
        year: "2024",
        result: "500 págs/min",
        metric: "procesadas",
        sub: "Extracción de cláusulas, riesgos y oportunidades",
        color: "#2F9F72",
        textColor: "text-[#2F9F72]",
        before: "3 abogados, 2 semanas por contrato",
        after: "Revisión completa en 2 horas",
        roi: "Ahorro 400h/mes",
        testimonial: "Analizamos 10 años de contratos en una tarde. Encontramos riesgos que llevaban años ocultos.",
        features: ["Detección de riesgos", "Extracción de datos", "Comparativa automática"]
    },
];

export function Work() {
    return (
        <section id="proyectos" className="relative py-16 md:py-24 bg-surface bg-radial-work bg-blueprint overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20"
                >
                    <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-4">
                        Casos de Éxito
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#222222] leading-none tracking-tighter mb-4">
                        Resultados Reales.
                    </h2>
                    <p className="text-lg text-[#888] max-w-2xl">
                        Empresas que ya han transformado sus operaciones con nuestra automatización
                    </p>
                </motion.div>

                {/* Projects */}
                <div className="space-y-16 md:space-y-24">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white rounded-2xl p-6 md:p-10 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                                {/* Left: Main Info */}
                                <div>
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <span
                                            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                            style={{ backgroundColor: `${project.color}20`, color: project.color }}
                                        >
                                            {project.industry}
                                        </span>
                                        <span className="text-[10px] font-bold tracking-widest text-[#888]">
                                            {project.year}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-[#222] mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-[#888] mb-6">{project.client}</p>

                                    {/* Big Result */}
                                    <div className="mb-6">
                                        <div className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black ${project.textColor} leading-none break-words`}>
                                            {project.result}
                                        </div>
                                        <div className="text-sm md:text-base text-[#222] font-medium mt-1">
                                            {project.metric}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-base text-[#666] leading-relaxed mb-6">
                                        {project.sub}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.features.map((feature, j) => (
                                            <span
                                                key={j}
                                                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#666] bg-[#f5f5f5] px-3 py-1.5 rounded-full"
                                            >
                                                <CheckCircle className="w-3 h-3" style={{ color: project.color }} />
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="space-y-6">
                                    {/* Before/After */}
                                    <div className="bg-[#f8f8f8] rounded-xl p-5">
                                        <h4 className="text-[10px] font-bold tracking-widest uppercase text-[#888] mb-4">
                                            Transformación
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">Antes</span>
                                                    <p className="text-sm text-[#666]">{project.before}</p>
                                                </div>
                                            </div>
                                            <div className="h-px bg-[#ddd]" />
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600">Después</span>
                                                    <p className="text-sm text-[#222] font-medium">{project.after}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROI */}
                                    <div className="flex items-center gap-4 p-5 rounded-xl" style={{ backgroundColor: `${project.color}10` }}>
                                        <TrendingUp className="w-8 h-8" style={{ color: project.color }} />
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Impacto</div>
                                            <div className="text-lg font-display font-bold" style={{ color: project.color }}>
                                                {project.roi}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Testimonial */}
                                    <div className="border-l-2 border-[#ddd] pl-4">
                                        <p className="text-sm text-[#666] italic leading-relaxed">
                                            "{project.testimonial}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 md:mt-24 bg-[#222] rounded-2xl p-8 md:p-12 text-center"
                >
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
                        ¿Quieres resultados como estos?
                    </h3>
                    <p className="text-base md:text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                        Analizamos tus procesos y te mostramos exactamente dónde la IA puede transformar tu negocio
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.dispatchEvent(new CustomEvent("open-calendar"))}
                            className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-4 px-8 rounded-lg text-base flex items-center gap-2 hover:shadow-lg transition-shadow w-full sm:w-auto justify-center"
                        >
                            Auditoría Gratuita
                            <ArrowUpRight className="w-5 h-5" />
                        </motion.button>
                        <span className="text-white/40 text-sm">
                            Sin compromiso
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
