"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { DollarSign, Clock, Users, ArrowRight, Zap } from "lucide-react";

export function ROICalculator() {
    const [employees, setEmployees] = useState(3);
    const [hoursPerDay, setHoursPerDay] = useState(2);
    const [hourlyRate, setHourlyRate] = useState(25);

    // Controls animation of numbers
    const controls = useAnimation();

    // Stats
    const workDays = 21; // Average per month
    const monthlyLoss = employees * hoursPerDay * hourlyRate * workDays;
    const yearlyLoss = monthlyLoss * 12;
    const potentialSavings = yearlyLoss * 0.75; // Conservative 75% automation target

    // Formatters
    const formatCurrent = (val: number) =>
        new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

    return (
        <section className="py-20 md:py-32 bg-[#F2F1ED] text-[#222] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[#888] mb-6">
                        Calculadora de Impacto
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-black leading-[0.95] tracking-tighter mb-6">
                        ¿Cuánto te cuesta <span className="text-[#E34E70]">NO</span> automatizar?
                    </h2>
                    <p className="text-lg text-[#666] max-w-xl leading-relaxed">
                        El coste de la ineficiencia es silencioso pero masivo. Ajusta los valores y descubre cuánto dinero estás perdiendo en tareas manuales.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* CONF (Sliders) */}
                    <div className="bg-white border-2 border-[#E5E5E5] rounded-2xl p-8 md:p-10 shadow-sm">

                        {/* 1. Employees */}
                        <div className="mb-10">
                            <div className="flex justify-between items-end mb-4">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#888]">
                                    <Users className="w-4 h-4" /> Empleados
                                </label>
                                <span className="text-2xl font-display font-bold text-[#222]">
                                    {employees}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={employees}
                                onChange={(e) => setEmployees(Number(e.target.value))}
                                className="w-full h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#222]"
                            />
                            <p className="text-xs text-[#999] mt-2">Personas realizando tareas repetitivas</p>
                        </div>

                        {/* 2. Hours */}
                        <div className="mb-10">
                            <div className="flex justify-between items-end mb-4">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#888]">
                                    <Clock className="w-4 h-4" /> Horas/Día
                                </label>
                                <span className="text-2xl font-display font-bold text-[#222]">
                                    {hoursPerDay}h
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="8"
                                step="0.5"
                                value={hoursPerDay}
                                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                                className="w-full h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#222]"
                            />
                            <p className="text-xs text-[#999] mt-2">Tiempo gastado en data entry, emails, informes...</p>
                        </div>

                        {/* 3. Rate */}
                        <div className="mb-8">
                            <div className="flex justify-between items-end mb-4">
                                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#888]">
                                    <DollarSign className="w-4 h-4" /> Coste Hora
                                </label>
                                <span className="text-2xl font-display font-bold text-[#222]">
                                    {hourlyRate}€
                                </span>
                            </div>
                            <input
                                type="range"
                                min="15"
                                max="100"
                                step="5"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(Number(e.target.value))}
                                className="w-full h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#222]"
                            />
                            <p className="text-xs text-[#999] mt-2">Salario bruto + Seguridad Social (aprox)</p>
                        </div>
                    </div>

                    {/* RESULTS */}
                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#C8FF00] rounded-full blur-[80px] opacity-50 pointer-events-none" />

                        <div className="space-y-12">
                            {/* Annual Loss */}
                            <motion.div
                                className="relative"
                                key={yearlyLoss} // Re-animate on change
                                initial={{ opacity: 0.8, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <span className="text-xs font-bold uppercase tracking-widest text-[#E34E70] mb-2 block">
                                    Pérdida Anual Estimada
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-display font-black text-[#222] tracking-tighter leading-none whitespace-nowrap">
                                        {formatCurrent(yearlyLoss)}
                                    </div>
                                    <span className="text-sm md:text-2xl text-[#999] font-medium tracking-normal whitespace-nowrap">
                                        /año
                                    </span>
                                </div>
                                <p className="text-sm text-[#666] mt-3 max-w-xs">
                                    Dinero quemado en tareas que una IA podría hacer por céntimos.
                                </p>
                            </motion.div>

                            {/* Potential Savings */}
                            <div className="p-8 bg-[#222] rounded-xl text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-32 bg-[#C8FF00] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" />

                                <span className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8FF00] mb-4">
                                    <Zap className="w-4 h-4" /> Potencial de Ahorro
                                </span>
                                <div className="relative z-10 text-4xl md:text-5xl font-display font-bold mb-2">
                                    {formatCurrent(potentialSavings)}
                                </div>
                                <p className="relative z-10 text-sm text-white/60 mb-8">
                                    Capital disponible para reinvertir en crecimiento.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.dispatchEvent(new CustomEvent("open-calendar"))}
                                    className="relative z-10 w-full bg-[#C8FF00] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(200,255,0,0.3)] transition-shadow"
                                >
                                    Quiero recuperarlo
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
