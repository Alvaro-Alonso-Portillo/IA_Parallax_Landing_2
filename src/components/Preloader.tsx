"use client";
import React, { useEffect, useState } from "react";

export function Preloader() {
    const [phase, setPhase] = useState<"loading" | "stripes" | "finish" | "done">("loading");

    useEffect(() => {
        // Block scroll during loading
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        // Phase 1: Wait for ring rotation (2.5s)
        const t1 = setTimeout(() => setPhase("stripes"), 2500);

        // Phase 2: Wait for stripes (1s + 0.9s duration = 1.9s from stripes start)
        const t2 = setTimeout(() => {
            setPhase("finish");
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }, 4400);

        // Phase 3: Remove from DOM
        const t3 = setTimeout(() => setPhase("done"), 5500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, []);

    if (phase === "done") return null;

    const cls = [
        "preloader",
        (phase === "stripes" || phase === "finish") ? "is-stripes" : "",
        phase === "finish" ? "is-finish" : "",
    ].join(" ");

    return (
        <div className={cls}>
            {/* Center content: Rotating ring + Loading text */}
            <div className="preloader-center">
                <div className="paw-ring-wrap">
                    <svg className="paw-ring w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                        <path d="M50 20 L52 25 L48 25 Z" fill="currentColor" />
                        <path d="M80 50 L75 52 L75 48 Z" fill="currentColor" />
                        <path d="M50 80 L48 75 L52 75 Z" fill="currentColor" />
                        <path d="M20 50 L25 48 L25 52 Z" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xl font-display font-medium uppercase tracking-[0.2em] opacity-80">
                            IA.
                        </p>
                    </div>
                </div>
                <div className="mt-8">
                    <p className="text-xs font-display font-bold tracking-[0.3em] uppercase opacity-40">
                        Loading
                    </p>
                </div>
            </div>

            {/* 5 colorful stripes */}
            <div className="preloader-stripes">
                <div className="preloader-stripe" />
                <div className="preloader-stripe" />
                <div className="preloader-stripe" />
                <div className="preloader-stripe" />
                <div className="preloader-stripe" />
            </div>
        </div>
    );
}
