import React from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useDebate } from '../hooks/useDebate'
import { Play, RotateCcw, Loader2 } from 'lucide-react'

const DebateControls: React.FC = () => {
    const { isDebating, isFinished, startDebate, resetDebate, topic, currentTurn } = useGameStore()
    const { nextTurn } = useDebate()

    // Auto-trigger next turn when currentTurn changes if debating
    React.useEffect(() => {
        if (isDebating && currentTurn) {
            nextTurn()
        }
    }, [isDebating, currentTurn, nextTurn])

    const handleStart = () => {
        if (topic.trim()) {
            startDebate()
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {!isDebating && !isFinished ? (
                <button
                    onClick={handleStart}
                    disabled={!topic.trim()}
                    className="w-full p-6 bg-gold text-surface font-bebas text-2xl tracking-[0.3em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
                >
                    <Play fill="currentColor" size={24} />
                    COMMENCE DEBATE
                </button>
            ) : isDebating ? (
                <div className="w-full p-6 border border-gold/30 bg-gold/5 flex items-center justify-center gap-4 text-gold font-mono text-xs tracking-[0.2em] relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-gold/10"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <Loader2 className="animate-spin" size={16} />
                    {currentTurn?.toUpperCase()} IS THINKING...
                </div>
            ) : null}

            {(isFinished || isDebating) && (
                <button
                    onClick={resetDebate}
                    className="w-full p-4 border border-border text-axiom/40 font-bebas text-xl tracking-[0.2em] flex items-center justify-center gap-3 hover:text-axiom hover:border-axiom/30 transition-all uppercase"
                >
                    <RotateCcw size={18} />
                    Reset Matrix
                </button>
            )}
        </div>
    )
}

export default DebateControls
