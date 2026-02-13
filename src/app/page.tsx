"use client";
import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Values } from "@/components/Values";
import { Closing } from "@/components/Closing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { ContactModal } from "@/components/ContactModal";
import { ChatBot } from "@/components/ChatBot";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { LegalModal } from "@/components/LegalModal";
import { ROICalculator } from "@/components/ROICalculator";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";

export default function Home() {
    const pageRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

    /* Parallax values for decorative separators */
    const sep1Y = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
    const sep2Y = useTransform(scrollYProgress, [0.2, 0.5], [0, -20]);
    const sep3Y = useTransform(scrollYProgress, [0.4, 0.7], [0, -25]);
    const sep4Y = useTransform(scrollYProgress, [0.6, 0.9], [0, -15]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.8, // Slowed down even more for a heavy, premium feel
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8, // More resistance for deliberate scrolling
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <CustomCursor />
            <Preloader />
            <ContactModal />
            <ServiceDetailModal />
            <LegalModal />
            <ChatBot />
            <main ref={pageRef} className="bg-surface min-h-screen text-cream" aria-label="IA_Parallax — Automatización Inteligente">
                <Navbar />

                {/* 1. IMPACT: HERO - Full height and more */}
                <Hero />

                {/* VISUAL TRANSITION BETWEEN HERO & CONTENT — parallax */}
                <motion.div style={{ y: sep1Y }} className="h-24 md:h-32 border-l border-cream/5 ml-[12vw]" />

                {/* 3. READING: SERVICES */}
                <Services />

                {/* DECORATIVE SPACER — parallax */}
                <motion.div style={{ y: sep2Y }} className="cursor-area h-8 md:h-12 flex items-center justify-center">
                    <div className="w-px h-12 bg-cream/10" />
                </motion.div>

                {/* 4. MASSIVE IMPACT: VALUES (PHILOSOPHY) */}
                <Values />

                {/* DECORATIVE SPACER — parallax */}
                <motion.div style={{ y: sep3Y }} className="h-8 md:h-12 flex items-center justify-center">
                    <div className="w-12 h-px bg-cream/10" />
                </motion.div>

                {/* 5. READING/DATA: WORK */}
                <Work />

                {/* BREATHING SPACE — parallax */}
                <motion.div style={{ y: sep4Y }} className="h-8 md:h-12" />

                {/* 7. READING: ABOUT */}
                <About />

                {/* DEFINITIVE CLOSING SPACE */}
                <div className="h-8 md:h-12" />

                {/* 7.5. ROI CALCULATOR */}
                <ROICalculator />

                {/* 8. CLOSING STATEMENT (Section 05) */}
                <Closing />

                {/* 9. FAQ */}
                <FAQ />

                <Footer />
            </main>
        </>
    );
}
