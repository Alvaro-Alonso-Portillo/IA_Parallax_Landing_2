"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setStatus("idle");
            setErrorMsg("");
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: (formData.get("phone") as string) || "",
            message: formData.get("message") as string,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                setStatus("error");
                setErrorMsg(result.error || "Ha ocurrido un error. Inténtalo de nuevo.");
                return;
            }

            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMsg("Error de conexión. Comprueba tu internet e inténtalo de nuevo.");
        }
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

                        {/* Success State */}
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center justify-center flex-1 text-center"
                            >
                                <div className="w-20 h-20 bg-[#C8FF00] rounded-full flex items-center justify-center mb-8">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-extrabold tracking-tighter text-[#0A0A0A] mb-3">
                                    ¡Mensaje enviado!
                                </h3>
                                <p className="text-[#888888] text-sm leading-relaxed max-w-xs mb-10">
                                    Hemos recibido tu mensaje. Te respondemos en menos de 24 horas.
                                </p>
                                <button
                                    onClick={closeModal}
                                    className="bg-[#0A0A0A] text-white font-bold py-4 px-10 rounded-[4px] text-base hover:bg-[#222] transition-all"
                                >
                                    Cerrar
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-4">
                                    Contacto
                                </span>

                                <h3 className="text-5xl font-extrabold leading-[0.95] tracking-tighter text-[#0A0A0A] mb-4">
                                    Hablemos.
                                </h3>

                                <p className="text-sm text-[#888888] leading-relaxed mb-10">
                                    Cuéntanos qué necesitas.
                                </p>

                                {/* Error Message */}
                                <AnimatePresence>
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6 text-sm"
                                        >
                                            {errorMsg}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form
                                    className="flex flex-col gap-6"
                                    onSubmit={handleSubmit}
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
                                            disabled={status === "loading"}
                                            autoComplete="name"
                                            className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all disabled:opacity-50"
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
                                            disabled={status === "loading"}
                                            autoComplete="email"
                                            className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all disabled:opacity-50"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="field-phone" className="text-[11px] font-bold tracking-widest uppercase text-[#888888]">
                                            Teléfono <span className="font-normal normal-case tracking-normal">(opcional)</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="field-phone"
                                            name="phone"
                                            placeholder="+34 600 000 000"
                                            disabled={status === "loading"}
                                            autoComplete="tel"
                                            className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all disabled:opacity-50"
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
                                            disabled={status === "loading"}
                                            className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all resize-none disabled:opacity-50"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-[18px] px-[44px] rounded-[4px] text-lg shadow-[0_15px_40px_rgba(200,255,0,0.15)] w-full mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            "Enviar mensaje →"
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
