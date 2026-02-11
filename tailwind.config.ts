import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                surface: "#F2F1ED", // Nekozen Surface
                cream: "#222222",   // Nekozen Dark
                muted: "#899097",   // Nekozen Grey
                nBlue: "#3893D8",
                nOrange: "#F3951B",
                nPink: "#E34E70",
                nGreen: "#2F9F72",
                nGrey: "#899097",
                action: "#3893D8",
            },
            fontFamily: {
                display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
                body: ['var(--font-dm)', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                // Editorial scale - Refined and Balanced
                'editorial-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],      // 12px
                'editorial-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.02em' }],     // 14px
                'editorial-base': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],            // 16px
                'editorial-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],          // 18px
                'editorial-xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],      // 24px
                'editorial-2xl': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],       // 32px
                'editorial-3xl': ['2.625rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],   // 42px
                'editorial-4xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],     // 60px
                'editorial-5xl': ['4.75rem', { lineHeight: '1', letterSpacing: '-0.05em' }],       // 76px
                'editorial-6xl': ['6.5rem', { lineHeight: '0.95', letterSpacing: '-0.06em' }],     // 104px
                'editorial-7xl': ['8.5rem', { lineHeight: '0.9', letterSpacing: '-0.07em' }],      // 136px
            },
        },
    },
    plugins: [],
};
export default config;
