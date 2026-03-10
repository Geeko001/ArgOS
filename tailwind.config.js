/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                axiom: "#E8E0D4",
                cipher: "#A8C0C8",
                gold: "#C8A86C",
                arena: "#8C3030",
                surface: "#0A0C10",
                surface2: "#111318",
                surface3: "#181C24",
                border: "#2A2E38",
            },
            fontFamily: {
                bebas: ["'Bebas Neue'", "cursive"],
                mono: ["'Space Mono'", "monospace"],
                crimson: ["'Crimson Pro'", "serif"],
            },
            animation: {
                flicker: "flicker 0.1s infinite",
                glitch: "glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite",
            },
            keyframes: {
                flicker: {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.8 },
                },
                glitch: {
                    "0%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-2px, 2px)" },
                    "40%": { transform: "translate(-2px, -2px)" },
                    "60%": { transform: "translate(2px, 2px)" },
                    "80%": { transform: "translate(2px, -2px)" },
                    "100%": { transform: "translate(0)" },
                },
            },
        },
    },
    plugins: [],
}
