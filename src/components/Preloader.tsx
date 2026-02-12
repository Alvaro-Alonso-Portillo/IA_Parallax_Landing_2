"use client";
import React, { useEffect, useState } from "react";

export function Preloader() {
    const [phase, setPhase] = useState<"loading" | "finish" | "done">("loading");

    useEffect(() => {
        // Mucho más rápido - solo 1 segundo total
        const t1 = setTimeout(() => setPhase("finish"), 800);
        const t2 = setTimeout(() => setPhase("done"), 1200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    if (phase === "done") return null;

    return (
        <div 
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a] transition-opacity duration-500 ${
                phase === "finish" ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                    <svg className="w-full h-full animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '2s' }}>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="text-white/30" />
                        <path d="M50 20 L52 25 L48 25 Z" fill="currentColor" className="text-white" />
                        <path d="M80 50 L75 52 L75 48 Z" fill="currentColor" className="text-white" />
                        <path d="M50 80 L48 75 L52 75 Z" fill="currentColor" className="text-white" />
                        <path d="M20 50 L25 48 L25 52 Z" fill="currentColor" className="text-white" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xl font-display font-medium uppercase tracking-[0.2em] text-white">
                            IA.
                        </p>
                    </div>
                </div>
                <p className="text-xs font-display font-bold tracking-[0.3em] uppercase text-white/40">
                    Loading
                </p>
            </div>
        </div>
    );
}
