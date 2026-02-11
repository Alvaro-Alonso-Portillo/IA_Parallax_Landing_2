"use client";
import React from "react";
import { motion } from "framer-motion";

export function Marquee() {
    const text = "Love, piece by piece · LOVE, PIECE BY PIECE · ";

    return (
        <div className="relative py-20 overflow-hidden pointer-events-none z-10">
            {/* The diagonal 'tape' effect - Ported from .shp-tape-marquee */}
            <div className="-rotate-3 scale-[1.08]">
                <div className="bg-[#222222] py-5 border-y-2 border-black flex overflow-hidden">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex whitespace-nowrap items-center shrink-0"
                    >
                        {/* Repeat the text multiple times to ensure seamless loop */}
                        {[...Array(12)].map((_, i) => (
                            <span
                                key={i}
                                className="text-[32px] font-display font-extrabold text-[#F2F1ED] uppercase tracking-wider px-8"
                            >
                                {text}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
