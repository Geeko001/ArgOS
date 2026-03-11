import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntroAnimationProps {
    onComplete: () => void
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase(1), 500)
        const timer2 = setTimeout(() => setPhase(2), 2500)
        const timer3 = setTimeout(() => onComplete(), 3000)
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [onComplete])

    return (
        <div className="fixed inset-0 bg-surface flex flex-col items-center justify-center z-[200]">
            <AnimatePresence mode="wait">
                {phase === 1 && (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0, 1, 0.8, 1, 0.9, 1],
                            scale: 1,
                            filter: ["blur(10px)", "blur(0px)", "blur(2px)", "blur(0px)"]
                        }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                        transition={{ duration: 1.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
                        className="flex flex-col items-center"
                    >
                        <h1 className="text-9xl font-bebas tracking-[0.3em] text-axiom relative">
                            ArgOS
                            <span className="absolute inset-0 text-arena/30 blur-sm translate-x-1 animate-pulse">ArgOS</span>
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            className="h-px bg-gold mt-4 shadow-[0_0_10px_#C8A86C]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-12 font-mono text-[10px] text-gold/30 tracking-widest uppercase">
                Verifying System Integrity... v1.0.0
            </div>
        </div>
    )
}

export default IntroAnimation
