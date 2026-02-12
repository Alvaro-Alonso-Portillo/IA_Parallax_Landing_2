"use client";
import React, { useEffect } from "react";
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
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { LegalModal } from "@/components/LegalModal";
import Lenis from "@studio-freight/lenis";

export default function Home() {
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
            <main className="bg-surface min-h-screen text-cream">
                <Navbar />

                {/* 1. IMPACT: HERO - Full height and more */}
                <Hero />


                {/* VISUAL TRANSITION BETWEEN HERO & CONTENT (Max 160px gap allowed) */}
                <div className="h-24 md:h-32 border-l border-cream/5 ml-[12vw]" />

                {/* 3. READING: SERVICES */}
                <Services />

                {/* DECORATIVE SPACER */}
                <div className="cursor-area h-8 md:h-12 flex items-center justify-center">
                    <div className="w-px h-12 bg-cream/10" />
                </div>

                {/* 4. MASSIVE IMPACT: VALUES (PHILOSOPHY) */}
                <Values />

                {/* DECORATIVE SPACER */}
                <div className="h-8 md:h-12 flex items-center justify-center">
                    <div className="w-12 h-px bg-cream/10" />
                </div>

                {/* 5. READING/DATA: WORK */}
                <Work />

                {/* BREATHING SPACE */}
                <div className="h-8 md:h-12" />

                {/* 7. READING: ABOUT */}
                <About />

                {/* DEFINITIVE CLOSING SPACE */}
                <div className="h-8 md:h-12" />

                {/* 8. CLOSING STATEMENT (Section 05) */}
                <Closing />

                {/* 9. FAQ */}
                <FAQ />

                <Footer />
            </main>
        </>
    );
}
