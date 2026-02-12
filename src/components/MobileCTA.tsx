"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px (past the hero mostly)
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 left-4 right-4 z-[90] md:hidden flex justify-center pointer-events-none"
                >
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent("open-contact"))}
                        className="pointer-events-auto bg-[#C8FF00] text-black font-display font-black text-lg uppercase tracking-tight py-4 px-8 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black w-full max-w-sm flex items-center justify-center gap-3 active:scale-95 transition-transform"
                    >
                        <span>Solicitar Auditoría</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
