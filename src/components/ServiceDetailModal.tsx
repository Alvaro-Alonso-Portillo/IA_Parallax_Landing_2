"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ServiceData {
    name: string;
    color: string;
    sub: string;
    details: {
        description: string;
        how: string;
        benefits: string[];
        impact: string;
    };
}

export function ServiceDetailModal() {
    const [service, setService] = useState<ServiceData | null>(null);

    useEffect(() => {
        const handleOpen = (e: any) => {
            setService(e.detail);
            document.body.style.overflow = "hidden";
        };
        const handleClose = () => {
            setService(null);
            document.body.style.overflow = "";
        };

        window.addEventListener("open-service", handleOpen);
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") handleClose();
        });

        return () => {
            window.removeEventListener("open-service", handleOpen);
        };
    }, []);

    const close = () => {
        setService(null);
        document.body.style.overflow = "";
    };

    return (
        <AnimatePresence>
            {service && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center">
                    {/* Dark Background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl"
                    />

                    {/* Content Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative z-10 w-full md:w-[95vw] max-w-6xl h-full md:h-[90vh] bg-white md:rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                        data-lenis-prevent
                    >
                        {/* 1. Header Section */}
                        <div className="w-full p-6 md:p-12 bg-[#F9F9F9] border-b border-[#EEE] shrink-0 relative">
                            {/* Close Button Inside Header */}
                            <button
                                onClick={close}
                                className="absolute top-6 right-6 md:top-8 md:right-8 bg-white rounded-full text-[#888] hover:text-black transition-all w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:scale-110 active:scale-95 z-50 text-xl font-light"
                            >
                                ✕
                            </button>

                            <span className="block text-[9px] font-bold tracking-[0.3em] uppercase text-[#888] mb-4">Servicio Especializado</span>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[0.9] tracking-tighter ${service.color} max-w-2xl`}>
                                    {service.name}
                                </h2>
                                <p className="text-sm md:text-base font-display font-medium text-[#222] max-w-[280px] leading-tight pb-1">
                                    {service.sub}
                                </p>
                            </div>
                        </div>

                        {/* 2. Scrollable Body Section */}
                        <div className="flex-1 overflow-y-auto scroll-smooth">
                            <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

                                {/* Left Column: The Why (7 columns) */}
                                <div className="lg:col-span-7 space-y-12 md:space-y-16">
                                    <section>
                                        <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#888] mb-6 border-b border-[#EEE] pb-2">El Concepto</span>
                                        <p className="text-xl md:text-2xl text-[#222] leading-snug font-display font-bold">
                                            {service.details.description}
                                        </p>
                                    </section>

                                    <section>
                                        <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#888] mb-6 border-b border-[#EEE] pb-2">¿Cómo funciona?</span>
                                        <p className="text-base md:text-lg text-[#555] leading-relaxed font-body">
                                            {service.details.how}
                                        </p>
                                    </section>
                                </div>

                                {/* Right Column: The What & Impact (5 columns) */}
                                <div className="lg:col-span-5 space-y-10">
                                    <section>
                                        <span className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#888] mb-6 border-b border-[#EEE] pb-2">Beneficios Clave</span>
                                        <ul className="space-y-3">
                                            {service.details.benefits.map((b, i) => (
                                                <li key={i} className="flex items-start gap-4 p-4 bg-[#F9F9F9] rounded-xl text-sm md:text-base text-[#222] font-body font-medium">
                                                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${service.color.replace('text-', 'bg-')}`} />
                                                    <span className="leading-tight">{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className="bg-[#1A1A1A] p-8 md:p-10 rounded-[32px] text-white shadow-2xl flex flex-col min-h-[260px]">
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-8 font-display">Impacto Estructural</p>

                                        <div className="flex-1 flex items-center mb-10 overflow-hidden">
                                            <p className="text-xl md:text-2xl lg:text-[1.6rem] font-display font-extrabold leading-[1.1] tracking-tight break-words">
                                                {service.details.impact}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                close();
                                                setTimeout(() => window.dispatchEvent(new CustomEvent("open-contact")), 100);
                                            }}
                                            className="bg-[#C8FF00] text-black w-full py-4 px-4 rounded-2xl font-display font-black text-[12px] tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                                        >
                                            Consultar Disponibilidad →
                                        </button>
                                    </section>
                                </div>
                            </div>

                            {/* Decorative Spacer */}
                            <div className="h-20" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
