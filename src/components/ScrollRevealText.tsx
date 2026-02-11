"use client";
import React, { useEffect, useRef } from "react";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    highlightWords?: string[];
}

export function ScrollRevealText({ text, className = "", highlightWords = [] }: ScrollRevealTextProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const baseColor = "#C5C5C5"; // Base muted color
        const accentColor = "#222222"; // Final dark color
        const highlightColor = "#3893D8"; // Highlight color (n-blue)

        const parseHex = (hex: string) => {
            const h = hex.replace("#", "");
            return [
                parseInt(h.substring(0, 2), 16),
                parseInt(h.substring(2, 4), 16),
                parseInt(h.substring(4, 6), 16),
            ];
        };

        const mix = (c1: number[], c2: number[], t: number) => {
            return `rgb(${Math.round(c1[0] + (c2[0] - c1[0]) * t)}, ${Math.round(c1[1] + (c2[1] - c1[1]) * t)}, ${Math.round(c1[2] + (c2[2] - c1[2]) * t)})`;
        };

        const chars = Array.from(root.querySelectorAll(".shp-char")) as HTMLElement[];
        const total = chars.length;

        const baseRGB = parseHex(baseColor);
        const accentRGB = parseHex(accentColor);
        const highlightRGB = parseHex(highlightColor);

        const update = () => {
            const rect = root.getBoundingClientRect();
            const vh = window.innerHeight;

            // Start coloring when top enters 80% of VH
            // Finish coloring when bottom leaves 20% of VH
            const start = vh * 0.85;
            const end = vh * 0.15;
            const progress = (start - rect.top) / (start - end + rect.height);
            const p = Math.max(0, Math.min(1, progress));

            const blur = 0.15; // Gradient width

            chars.forEach((span, i) => {
                const charPos = i / total;
                const dist = charPos - p;

                const isHighlight = span.dataset.highlight === "true";
                const targetRGB = isHighlight ? highlightRGB : accentRGB;

                if (dist <= -blur) {
                    span.style.color = isHighlight ? highlightColor : accentColor;
                } else if (dist >= blur) {
                    span.style.color = baseColor;
                } else {
                    const t = (dist + blur) / (2 * blur); // 0 to 1
                    span.style.color = mix(targetRGB, baseRGB, t);
                }
            });
        };

        window.addEventListener("scroll", update, { passive: true });
        update();

        return () => window.removeEventListener("scroll", update);
    }, []);

    const words = text.split(" ");

    return (
        <div ref={rootRef} className={`shp-readcolor ${className}`}>
            {words.map((word, wordIdx) => {
                const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
                return (
                    <span key={wordIdx} className="inline-block mr-[0.25em]">
                        {word.split("").map((char, charIdx) => (
                            <span
                                key={charIdx}
                                className="shp-char"
                                data-highlight={isHighlight}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                );
            })}
        </div>
    );
}
