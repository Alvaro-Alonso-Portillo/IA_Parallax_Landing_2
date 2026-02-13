"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search, Compass, Zap, TrendingUp, ShieldCheck, MessageCircle, Target, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { ContactModal } from "@/components/ContactModal";
import { ChatBot } from "@/components/ChatBot";

/* ───────── DATA ───────── */

const phases = [
    {
        number: "01",
        tag: "Diagnóstico",
        title: "Escuchamos antes de tocar",
        color: "#3893D8",
        icon: Search,
        items: [
            "Auditoría de procesos operativos actuales",
            "Mapeamos ineficiencias, cuellos de botella y tareas repetitivas",
            "Entrevistas con el equipo clave",
        ],
        deliverable: "Mapa de oportunidades de automatización priorizado",
        duration: "1-2 semanas",
        cost: "Gratuito",
    },
    {
        number: "02",
        tag: "Diseño",
        title: "Arquitectura a medida, no plantillas",
        color: "#2F9F72",
        icon: Compass,
        items: [
            "Diseño de la solución técnica adaptada a tu negocio",
            "Selección de herramientas y agentes IA específicos",
            "Definición de KPIs y métricas de éxito",
        ],
        deliverable: "Roadmap técnico + presupuesto cerrado",
        duration: "1 semana",
    },
    {
        number: "03",
        tag: "Implementación",
        title: "Construimos en tu ecosistema",
        color: "#E34E70",
        icon: Zap,
        items: [
            "Desarrollo iterativo con validaciones semanales",
            "Integración con herramientas existentes (CRM, ERP, email)",
            "Formación al equipo en los nuevos flujos",
        ],
        deliverable: "Sistema funcionando en producción",
        duration: "2-6 semanas",
    },
    {
        number: "04",
        tag: "Evolución",
        title: "El sistema mejora solo. Tú decides cuándo",
        color: "#F3951B",
        icon: TrendingUp,
        items: [
            "Monitorización continua del rendimiento",
            "Optimización basada en datos reales",
            "Soporte prioritario + actualizaciones",
        ],
        deliverable: "Informes mensuales de impacto",
        duration: "Continuo (opcional)",
    },
];

const differentiators = [
    {
        icon: ShieldCheck,
        title: "Sin dependencia",
        description: "Te enseñamos a operar los sistemas sin necesitarnos. Si mañana decides volar solo, podrás.",
        color: "#2F9F72",
    },
    {
        icon: MessageCircle,
        title: "Sin jerga técnica",
        description: "Hablamos tu idioma. Te explicamos todo como lo haría un socio, no un ingeniero de Silicon Valley.",
        color: "#3893D8",
    },
    {
        icon: Target,
        title: "ROI medible",
        description: "Si no ves retorno en 6 meses, algo hemos hecho mal. Nos comprometemos con resultados, no con horas.",
        color: "#E34E70",
    },
    {
        icon: Users,
        title: "Tú mandas",
        description: "La IA ejecuta, pero las reglas las pones tú. Nunca tomamos decisiones sin tu aprobación.",
        color: "#F3951B",
    },
];

const stats = [
    { value: "78%", label: "Ahorro en tareas admin" },
    { value: "15h", label: "Liberadas por semana" },
    { value: "<6", label: "Meses para ROI" },
    { value: "24/7", label: "Operaciones sin parar" },
];

/* ───────── COMPONENT ───────── */

export default function ComoFuncionaClient() {
    return (
        <>
            <ContactModal />
            <ChatBot />
            <main className="bg-[#F2F1ED] min-h-screen">
                {/* ── BACK NAVIGATION ── */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-[#F2F1ED]/80 backdrop-blur-md border-b border-black/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-[#222] hover:text-[#888] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold tracking-[0.15em] uppercase">
                                Volver
                            </span>
                        </Link>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#888]">
                            Método
                        </span>
                    </div>
                </div>

                {/* ── 1. HERO ── */}
                <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] mb-8"
                        >
                            Cómo trabajamos
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-[#222] leading-[1.05] tracking-tight mb-8"
                        >
                            Automatización<br />
                            con sentido.{" "}
                            <span className="text-[#899097]">No con prisas.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="text-lg md:text-xl text-[#899097] max-w-2xl leading-relaxed font-body"
                        >
                            Nuestro método diseña sistemas que funcionan cuando tú no miras.
                            En 4 fases, sin dramas, sin dependencia.
                        </motion.p>
                    </div>
                </section>

                {/* ── 2. THE 4 PHASES — TIMELINE ── */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-black/10 hidden md:block" />

                            <div className="flex flex-col gap-16 md:gap-24">
                                {phases.map((phase, i) => {
                                    const Icon = phase.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-80px" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: i * 0.1,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="relative md:pl-24"
                                        >
                                            {/* Timeline Dot */}
                                            <div
                                                className="hidden md:flex absolute left-6 md:left-[26px] top-2 w-8 h-8 rounded-full items-center justify-center border-2 bg-[#F2F1ED] z-10"
                                                style={{ borderColor: phase.color }}
                                            >
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: phase.color }}
                                                />
                                            </div>

                                            {/* Card */}
                                            <div className="bg-white border-2 border-black rounded-[24px] p-8 md:p-12 hover:shadow-xl transition-shadow duration-500 group">
                                                {/* Header */}
                                                <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                                                    <div
                                                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                                                        style={{ backgroundColor: `${phase.color}15` }}
                                                    >
                                                        <Icon
                                                            className="w-7 h-7"
                                                            style={{ color: phase.color }}
                                                            strokeWidth={1.5}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span
                                                                className="text-xs font-bold tracking-widest uppercase"
                                                                style={{ color: phase.color }}
                                                            >
                                                                Fase {phase.number}
                                                            </span>
                                                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#888]">
                                                                — {phase.tag}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-2xl md:text-3xl font-display font-extrabold text-[#222] tracking-tight leading-tight">
                                                            {phase.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Items */}
                                                <ul className="space-y-3 mb-8">
                                                    {phase.items.map((item, j) => (
                                                        <li key={j} className="flex items-start gap-3">
                                                            <div
                                                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                                style={{ backgroundColor: phase.color }}
                                                            />
                                                            <span className="text-[15px] text-[#555] font-body leading-relaxed">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Footer */}
                                                <div className="flex flex-wrap gap-4 pt-6 border-t border-black/5">
                                                    <div className="bg-[#F5F5F5] px-4 py-2 rounded-lg">
                                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#888] block">
                                                            Entregable
                                                        </span>
                                                        <span className="text-sm font-semibold text-[#222]">
                                                            {phase.deliverable}
                                                        </span>
                                                    </div>
                                                    <div className="bg-[#F5F5F5] px-4 py-2 rounded-lg">
                                                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#888] block">
                                                            Duración
                                                        </span>
                                                        <span className="text-sm font-semibold text-[#222]">
                                                            {phase.duration}
                                                        </span>
                                                    </div>
                                                    {phase.cost && (
                                                        <div
                                                            className="px-4 py-2 rounded-lg"
                                                            style={{ backgroundColor: `${phase.color}10` }}
                                                        >
                                                            <span className="text-[10px] font-bold tracking-widest uppercase text-[#888] block">
                                                                Coste
                                                            </span>
                                                            <span
                                                                className="text-sm font-bold"
                                                                style={{ color: phase.color }}
                                                            >
                                                                {phase.cost}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. DIFFERENTIATORS ── */}
                <section className="py-16 md:py-24 px-6 md:px-12 bg-[#222]">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#C8FF00] mb-6">
                                Por qué nosotros
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#F2F1ED] leading-[1.1] tracking-tight">
                                Lo que nos hace<br />
                                diferentes.
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {differentiators.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.7 }}
                                        className="bg-[#2a2a2a] border border-[#F2F1ED]/10 rounded-2xl p-8 hover:border-[#C8FF00]/30 transition-all duration-500 group"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                            style={{ backgroundColor: `${item.color}20` }}
                                        >
                                            <Icon className="w-6 h-6" style={{ color: item.color }} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-xl font-display font-extrabold text-[#F2F1ED] mb-3 tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-[#899097] font-body leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── 4. IMPACT STATS ── */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] mb-6">
                                Resultados reales
                            </span>
                            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#222] leading-[1.1] tracking-tight">
                                Números que hablan.
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="text-center bg-white border-2 border-black rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-500"
                                >
                                    <div className="text-4xl md:text-5xl font-display font-black text-[#222] mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#888]">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 5. FINAL CTA ── */}
                <section className="py-16 md:py-24 px-6 md:px-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#2F9F72] mb-6">
                                ¿Empezamos?
                            </span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#222] leading-[1.1] tracking-tight mb-6">
                                ¿Quieres ver cómo aplicaría
                                esto en <span className="text-[#E34E70]">TU</span> negocio?
                            </h2>
                            <p className="text-lg text-[#899097] font-body leading-relaxed mb-10 max-w-xl mx-auto">
                                La primera consulta es gratuita. Analizamos tus procesos y te mostramos
                                exactamente dónde la IA puede ahorrarte tiempo y dinero.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() =>
                                        window.dispatchEvent(new CustomEvent("open-contact"))
                                    }
                                    className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-4 px-10 rounded-[4px] text-lg shadow-[0_15px_40px_rgba(200,255,0,0.15)] w-full sm:w-auto flex items-center justify-center gap-3"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Agendar consulta gratuita
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </div>

                            <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-black/10">
                                <div className="text-center">
                                    <div className="text-lg font-display font-black text-[#222]">30min</div>
                                    <div className="text-[9px] font-bold tracking-widest uppercase text-[#888]">Duración</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-display font-black text-[#222]">100%</div>
                                    <div className="text-[9px] font-bold tracking-widest uppercase text-[#888]">Gratis</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-lg font-display font-black text-[#222]">0</div>
                                    <div className="text-[9px] font-bold tracking-widest uppercase text-[#888]">Compromiso</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── FOOTER STRIP ── */}
                <div className="bg-[#222] py-6 px-6 text-center">
                    <Link
                        href="/"
                        className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#899097] hover:text-[#C8FF00] transition-colors"
                    >
                        ← Volver a ia_parallax
                    </Link>
                </div>
            </main>
        </>
    );
}
