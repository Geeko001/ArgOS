import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { PERSONAS } from '../lib/personas'

interface PersonaPanelProps {
    role: 'axiom' | 'cipher'
    isActive: boolean
}

const PersonaPanel: React.FC<PersonaPanelProps> = ({ role, isActive }) => {
    const { turns, streamingContent, currentTurn } = useGameStore()
    const scrollRef = useRef<HTMLDivElement>(null)

    const persona = role === 'axiom' ? PERSONAS.AXIOM : PERSONAS.CIPHER
    const panelTurns = turns.filter(t => t.role === role)
    const isCurrentlyStreaming = currentTurn === role && streamingContent

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [panelTurns, streamingContent])

    return (
        <div className={`flex-1 flex flex-col p-12 transition-all duration-700 relative
      ${role === 'axiom' ? 'bg-gradient-to-r from-arena/10 to-transparent' : 'bg-gradient-to-l from-cipher/10 to-transparent'}
      ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-[0.98]'}
    `}>
            {/* Glow effect when active */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 pointer-events-none blur-[100px] opacity-20 z-0
              ${role === 'axiom' ? 'bg-arena' : 'bg-cipher'}
            `}
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-12">
                    <motion.h2
                        initial={false}
                        animate={{
                            color: isActive ? (role === 'axiom' ? '#E8E0D4' : '#A8C0C8') : '#2A2E38'
                        }}
                        className="text-6xl font-bebas tracking-[0.2em] mb-2"
                    >
                        {persona.name}
                    </motion.h2>
                    <div className="flex items-center gap-2">
                        <div className={`h-px w-24 ${role === 'axiom' ? 'bg-arena' : 'bg-cipher'}`} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">{persona.description}</span>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto pr-6 space-y-8 no-scrollbar scroll-smooth"
                >
                    {panelTurns.map((turn, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: role === 'axiom' ? -10 : 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`font-crimson text-xl leading-relaxed 
                ${role === 'axiom' ? 'text-axiom text-left' : 'text-cipher text-right italic'}
              `}
                        >
                            {turn.content}
                        </motion.div>
                    ))}

                    {isCurrentlyStreaming && (
                        <div className={`font-crimson text-xl leading-relaxed 
                ${role === 'axiom' ? 'text-axiom text-left' : 'text-cipher text-right italic'}
              `}>
                            {streamingContent}
                            <span className="w-1.5 h-5 bg-gold inline-block align-middle ml-1 animate-flicker" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PersonaPanel
