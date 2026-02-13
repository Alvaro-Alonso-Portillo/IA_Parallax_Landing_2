"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const [cursorType, setCursorType] = useState<"dot" | "text">("dot");
    const [cursorText, setCursorText] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    /* Glow follows with slower, heavier spring */
    const glowConfig = { damping: 40, stiffness: 80 };
    const glowX = useSpring(mouseX, glowConfig);
    const glowY = useSpring(mouseY, glowConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Check if hovering over a text cursor area
            const target = e.target as HTMLElement;
            const area = target.closest("[data-cursor-text]");

            if (area) {
                setCursorType("text");
                setCursorText(area.getAttribute("data-cursor-text") || "");
            } else {
                setCursorType("dot");
                setCursorText("");
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY]);

    return (
        <>
            {/* Cursor Glow */}
            <motion.div
                className="cursor-glow"
                style={{
                    left: glowX,
                    top: glowY,
                    opacity: isVisible ? 1 : 0,
                }}
            />

            <motion.div
                className={`cursor-dot ${cursorType === "dot" && isVisible ? "active" : ""}`}
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
            <motion.div
                className={`cursor-text ${cursorType === "text" && isVisible ? "active" : ""}`}
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className="cursor-text-inner" dangerouslySetInnerHTML={{ __html: cursorText }} />
            </motion.div>
        </>
    );
}
