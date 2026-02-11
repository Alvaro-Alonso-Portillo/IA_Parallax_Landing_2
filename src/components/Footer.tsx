"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, X } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#222222] relative pt-32 pb-12 overflow-hidden px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col min-h-[80vh] justify-between relative">

                {/* 1. TOP SECTION: Branding & Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                    <div className="md:col-span-6 lg:col-span-5">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#C8FF00] text-3xl md:text-5xl font-display font-black tracking-tighter mb-8"
                        >
                            ia_parallax
                        </motion.h2>
                        <p className="text-[11px] md:text-xs font-body text-[#899097] leading-relaxed uppercase tracking-wider max-w-sm">
                            Automatizando Madrid. Un pequeño equipo diseñando el futuro de la operatividad empresarial,
                            donde cada proceso importa y nada se deja al azar.
                        </p>

                        {/* Social Icons (Refined Social Links) */}
                        <div className="flex gap-4 mt-12 text-[#F2F1ED] opacity-60">
                            <a
                                href="https://www.linkedin.com/in/alvaro-alonso-8319b52ba/?isSelfProfile=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-100 hover:text-[#C8FF00] hover:border-[#C8FF00]/40 transition-all border border-[#F2F1ED]/10 p-2.5 rounded-lg flex items-center justify-center hover:bg-[#C8FF00]/5"
                                title="LinkedIn"
                            >
                                <Linkedin size={18} strokeWidth={1.5} />
                            </a>
                            <a
                                href="https://github.com/Alvaro-Alonso-Portillo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-100 hover:text-[#C8FF00] hover:border-[#C8FF00]/40 transition-all border border-[#F2F1ED]/10 p-2.5 rounded-lg flex items-center justify-center hover:bg-[#C8FF00]/5"
                                title="GitHub"
                            >
                                <Github size={18} strokeWidth={1.5} />
                            </a>
                            <a
                                href="https://x.com/iaparallax"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-100 hover:text-[#C8FF00] hover:border-[#C8FF00]/40 transition-all border border-[#F2F1ED]/10 p-2.5 rounded-lg flex items-center justify-center hover:bg-[#C8FF00]/5"
                                title="X (Twitter)"
                            >
                                <X size={18} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-6 lg:col-start-9 lg:col-span-4 flex flex-col md:items-end">
                        <nav className="flex flex-col gap-6 text-right">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20 mb-2 invisible md:visible">Links</span>
                            <a href="#servicios" className="text-[#F2F1ED] text-xl font-display font-extrabold hover:text-[#C8FF00] transition-colors tracking-tight">Servicios</a>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.dispatchEvent(new CustomEvent("open-contact"));
                                }}
                                className="text-[#F2F1ED] text-xl font-display font-extrabold hover:text-[#C8FF00] transition-colors tracking-tight"
                            >
                                Contacto
                            </a>
                        </nav>
                    </div>
                </div>

                {/* 2. CENTER/BOTTOM SECTION: The Big Statement */}
                <div className="mt-auto pt-32 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="w-full"
                    >
                        <span className="text-[#F2F1ED]/40 text-base md:text-xl font-display font-extrabold tracking-tight block mb-4 italic">
                            Es momento de actuar.
                        </span>
                        <h2 className="text-[#F2F1ED] text-[9.5vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw] font-display font-extrabold leading-[0.95] tracking-[-0.05em] select-none bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                            Transforma<br />tu realidad.
                        </h2>
                    </motion.div>
                </div>

                {/* 3. FINAL BOTTOM BAR: Metadata */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mt-24 border-t border-[#F2F1ED]/10 pt-8 gap-6 md:gap-0">
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-[9px] font-body text-[#899097] tracking-widest uppercase">
                        <span>Madrid, España</span>
                        <span>© 2024 IA_PARALLAX</span>
                        <div className="flex gap-6 border-l border-[#F2F1ED]/10 pl-8">
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-legal", { detail: "legal" }))}
                                className="hover:text-[#F2F1ED] transition-colors"
                            >
                                Aviso Legal
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-legal", { detail: "privacy" }))}
                                className="hover:text-[#F2F1ED] transition-colors"
                            >
                                Privacidad
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-legal", { detail: "cookies" }))}
                                className="hover:text-[#F2F1ED] transition-colors"
                            >
                                Cookies
                            </button>
                        </div>
                    </div>

                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-[9px] font-body text-[#899097] tracking-[0.5em] uppercase hidden sm:block"
                    >
                        Strategic Automation
                    </motion.div>
                </div>
            </div>

            {/* Background Texture/Noise (Subtle like Nekozen) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
}
