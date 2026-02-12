"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            document.body.style.overflow = "hidden";
        };
        const handleClose = () => {
            setIsOpen(false);
            document.body.style.overflow = "";
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        window.addEventListener("open-contact", handleOpen);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("open-contact", handleOpen);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = "";
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-end">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="relative z-10 bg-white w-full max-w-[480px] h-screen overflow-y-auto p-8 md:p-12 shadow-2xl flex flex-col"
                        data-lenis-prevent
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-[#888888] hover:text-black transition-colors p-2"
                            aria-label="Cerrar"
                        >
                            <span className="text-xl">✕</span>
                        </button>

                        <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-4">
                            Contacto
                        </span>

                        <h3 className="text-5xl font-extrabold leading-[0.95] tracking-tighter text-[#0A0A0A] mb-4">
                            Hablemos.
                        </h3>

                        <p className="text-sm text-[#888888] leading-relaxed mb-10">
                            Cuéntanos qué necesitas. Te respondemos en menos de 24h.
                        </p>

                        <form
                            className="flex flex-col gap-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Mensaje enviado (Simulación)");
                                closeModal();
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="field-name" className="text-[11px] font-bold tracking-widest uppercase text-[#888888]">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="field-name"
                                    name="name"
                                    placeholder="Tu nombre"
                                    required
                                    autoComplete="name"
                                    className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="field-email" className="text-[11px] font-bold tracking-widest uppercase text-[#888888]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="field-email"
                                    name="email"
                                    placeholder="tu@empresa.com"
                                    required
                                    autoComplete="email"
                                    className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="field-message" className="text-[11px] font-bold tracking-widest uppercase text-[#888888]">
                                    ¿Qué necesitas?
                                </label>
                                <textarea
                                    id="field-message"
                                    name="message"
                                    rows={4}
                                    placeholder="Cuéntanos sobre tu negocio y el reto que tienes..."
                                    required
                                    className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-[18px] px-[44px] rounded-[4px] text-lg shadow-[0_15px_40px_rgba(200,255,0,0.15)] w-full mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Enviar mensaje →
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
