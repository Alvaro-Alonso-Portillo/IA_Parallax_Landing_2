"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, Check } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";
type Tab = "message" | "calendar";

export function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("message");

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setStatus("idle");
            setErrorMsg("");
            setActiveTab("message"); // Default to message, or maybe calendar? Let's keep message for now.
            document.body.style.overflow = "hidden";
        };
        const handleOpenCalendar = () => {
            setIsOpen(true);
            setStatus("idle");
            setErrorMsg("");
            setActiveTab("calendar");
            document.body.style.overflow = "hidden";
        }
        const handleClose = () => {
            setIsOpen(false);
            document.body.style.overflow = "";
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        window.addEventListener("open-contact", handleOpen);
        // We can add a specialized event for opening calendar directly if needed
        window.addEventListener("open-calendar", handleOpenCalendar);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("open-contact", handleOpen);
            window.removeEventListener("open-calendar", handleOpenCalendar);
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
                        className="relative z-10 bg-white w-full max-w-[550px] h-screen shadow-2xl flex flex-col"
                        data-lenis-prevent
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-20 text-[#888888] hover:text-black transition-colors p-2 bg-white/50 rounded-full"
                            aria-label="Cerrar"
                        >
                            <span className="text-xl">✕</span>
                        </button>

                        {/* Content Container (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10">

                            {/* SUCCESS STATE (Only for Message) */}
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center h-full text-center py-20"
                                >
                                    <div className="w-20 h-20 bg-[#C8FF00] rounded-full flex items-center justify-center mb-8">
                                        <Check className="w-10 h-10 text-black" />
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
                                    {/* HEADER & TABS */}
                                    <div className="mb-8">
                                        <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#888888] mb-4">
                                            Contacto
                                        </span>
                                        <h3 className="text-4xl md:text-5xl font-extrabold leading-[0.95] tracking-tighter text-[#0A0A0A] mb-8">
                                            Hablemos.
                                        </h3>

                                        {/* TABS SWITCHER */}
                                        <div className="flex bg-[#F5F5F5] p-1 rounded-lg">
                                            <button
                                                onClick={() => setActiveTab("message")}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold transition-all ${activeTab === "message"
                                                    ? "bg-white text-black shadow-sm"
                                                    : "text-[#888] hover:text-black"
                                                    }`}
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                Mensaje
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("calendar")}
                                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-sm font-bold transition-all ${activeTab === "calendar"
                                                    ? "bg-white text-black shadow-sm"
                                                    : "text-[#888] hover:text-black"
                                                    }`}
                                            >
                                                <Calendar className="w-4 h-4" />
                                                Agendar Cita
                                            </button>
                                        </div>
                                    </div>

                                    {/* TAB CONTENT */}
                                    <div className="relative min-h-[400px]">

                                        {/* -- TAB: MESSAGE (FORM) -- */}
                                        {activeTab === "message" && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="text-sm text-[#888888] leading-relaxed mb-8">
                                                    Cuéntanos qué necesitas y te responderemos por email.
                                                </p>

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

                                                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                                                            placeholder="Cuéntanos sobre tu negocio..."
                                                            required
                                                            disabled={status === "loading"}
                                                            className="bg-[#F5F5F5] border-transparent border focus:bg-white focus:border-[#C8FF00] rounded-sm p-4 text-[15px] outline-none transition-all resize-none disabled:opacity-50"
                                                        />
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={status === "loading"}
                                                        className="bg-[#C8FF00] text-[#0A0A0A] font-bold py-[18px] px-[44px] rounded-[4px] text-lg shadow-[0_15px_40px_rgba(200,255,0,0.15)] w-full mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                                    >
                                                        {status === "loading" ? "Enviando..." : "Enviar mensaje →"}
                                                    </button>
                                                </form>

                                                {/* Direct Emails */}
                                                <div className="mt-12 pt-8 border-t border-black/5 flex flex-col gap-4">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#888888]">O escríbenos directamente:</span>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        <a href="mailto:contacto@iaparallax.com" className="text-sm font-bold text-black hover:text-[#C8FF00] transition-colors flex items-center justify-between group">
                                                            contacto@iaparallax.com
                                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                        </a>
                                                        <a href="mailto:soporte@iaparallax.com" className="text-sm font-bold text-black hover:text-[#C8FF00] transition-colors flex items-center justify-between group">
                                                            soporte@iaparallax.com
                                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* -- TAB: CALENDAR (CAL.COM EMBED) -- */}
                                        {activeTab === "calendar" && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="h-[600px] w-full"
                                            >
                                                <p className="text-sm text-[#888888] leading-relaxed mb-6">
                                                    Selecciona día y hora para una sesión de diagnóstico gratuita de 30 min.
                                                </p>
                                                <iframe
                                                    src="https://cal.com/alvaro-ojfupa/reunion-descubrimiento?theme=light&primaryColor=%23C8FF00"
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: "none", minHeight: "500px" }}
                                                    allow="camera; microphone; autoplay; fullscreen"
                                                    title="Agendar Cita con Alvaro"
                                                ></iframe>
                                            </motion.div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
