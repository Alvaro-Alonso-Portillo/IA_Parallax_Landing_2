"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 5.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 pointer-events-none"
            >
                {/* Logo */}
                <Link href="/" className="pointer-events-auto group">
                    <span className="text-cream text-xl md:text-2xl font-display font-extrabold tracking-tighter">
                        IA_PARALLAX<span className="text-nBlue">.</span>
                    </span>
                </Link>

                {/* Hamburger / X Button (Ported logic) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto w-8 h-4 relative cursor-pointer z-[60]"
                >
                    <span className={`absolute left-0 w-full h-[2px] bg-cream transition-all duration-300 ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
                    <span className={`absolute left-0 top-2 w-full h-[2px] bg-cream transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`absolute left-0 w-full h-[2px] bg-cream transition-all duration-300 ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
                </button>
            </motion.nav>

            {/* Fullscreen Menu Overlay (Nekozen style) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed inset-0 bg-[#222222] z-[55] flex flex-col justify-center px-8 md:px-24"
                    >
                        <div className="space-y-6 md:space-y-8">
                            {["Servicios", "Nosotros", "Trabajo", "Contacto"].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    {item === "Contacto" ? (
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                window.dispatchEvent(new CustomEvent("open-contact"));
                                            }}
                                            className="text-4xl sm:text-5xl md:text-8xl font-display font-bold text-[#F2F1ED] hover:text-nBlue transition-colors block text-left"
                                        >
                                            {item}
                                        </button>
                                    ) : (
                                        <Link
                                            href={`#${item.toLowerCase()}`}
                                            onClick={() => setIsOpen(false)}
                                            className="text-4xl sm:text-5xl md:text-8xl font-display font-bold text-[#F2F1ED] hover:text-nBlue transition-colors block"
                                        >
                                            {item}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute bottom-12 left-6 md:left-24 text-[#F2F1ED]/40 font-body text-xs tracking-widest uppercase">
                            © 2024 IA_PARALLAX · Strategic Automation
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
