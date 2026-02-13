"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const QUICK_ACTIONS = [
    "¿Qué hacéis exactamente?",
    "¿Cuánto cuesta?",
    "¿Cómo empezamos?",
];

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Auto-scroll to bottom */
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* Focus input when panel opens */
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: text.trim() };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setIsLoading(true);
        setHasInteracted(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updated }),
            });

            const data = await res.json();

            if (res.ok && data.reply) {
                let cleanReply = data.reply;

                if (cleanReply.includes("[SHOW_CALENDAR]")) {
                    cleanReply = cleanReply.replace("[SHOW_CALENDAR]", "").trim();
                    // Open calendar modal
                    window.dispatchEvent(new CustomEvent("open-calendar"));
                }

                setMessages((prev) => [...prev, { role: "assistant", content: cleanReply }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Lo siento, ha ocurrido un error. ¿Puedes intentarlo de nuevo?" },
                ]);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error de conexión. Comprueba tu conexión e inténtalo de nuevo." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <>
            {/* ── FLOATING BUBBLE ── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#C8FF00] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(200,255,0,0.3)] hover:shadow-[0_8px_40px_rgba(200,255,0,0.5)] hover:scale-110 transition-all duration-300 group"
                        aria-label="Abrir chat"
                    >
                        <MessageCircle className="w-6 h-6 text-[#0A0A0A] group-hover:scale-110 transition-transform" />

                        {/* Pulse ring */}
                        <span className="absolute inset-0 rounded-full bg-[#C8FF00] animate-ping opacity-20" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── CHAT PANEL ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#0A0A0A] px-5 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#C8FF00] rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse shadow-[0_0_10px_#C8FF00]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm leading-none">Álex</h3>
                                    <span className="text-[10px] text-white/60">IA Assistant</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/60 hover:text-white transition-colors p-1"
                                aria-label="Cerrar chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
                            {/* Welcome message */}
                            {messages.length === 0 && !hasInteracted && (
                                <div className="space-y-4">
                                    <div className="bg-[#F5F5F5] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                                        <p className="text-sm text-[#333] leading-relaxed">
                                            ¡Hola! 👋 Soy Álex, tu experto en automatización. ¿Cómo puedo ayudarte hoy?
                                        </p>
                                    </div>

                                    {/* Quick actions */}
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#888] px-1">
                                            Preguntas frecuentes
                                        </p>
                                        {QUICK_ACTIONS.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => sendMessage(action)}
                                                className="w-full text-left bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#333] hover:border-[#C8FF00] hover:bg-[#C8FF00]/5 transition-all duration-200 flex items-center justify-between group"
                                            >
                                                <span>{action}</span>
                                                <ArrowRight className="w-3 h-3 text-[#888] group-hover:text-[#0A0A0A] group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Chat messages */}
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                            ? "bg-[#0A0A0A] text-white rounded-br-sm"
                                            : "bg-[#F5F5F5] text-[#333] rounded-tl-sm"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading indicator */}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#F5F5F5] rounded-2xl rounded-tl-sm px-4 py-3">
                                        <div className="flex gap-1.5">
                                            <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSubmit}
                            className="border-t border-black/5 px-4 py-3 flex items-center gap-2 flex-shrink-0"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu pregunta..."
                                disabled={isLoading}
                                className="flex-1 bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#C8FF00] transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 bg-[#0A0A0A] text-white rounded-xl flex items-center justify-center hover:bg-[#222] disabled:opacity-30 transition-all flex-shrink-0"
                                aria-label="Enviar mensaje"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    );
}
