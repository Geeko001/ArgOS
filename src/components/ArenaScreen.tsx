import React from 'react'
import { motion } from 'framer-motion'
import PersonaPanel from './PersonaPanel'
import TopicInput from './TopicInput'
import DebateControls from './DebateControls'
import SettingsPanel from './SettingsPanel'
import { useGameStore } from '../store/gameStore'

const ArenaScreen: React.FC = () => {
    const { currentTurn, isFinished } = useGameStore()

    return (
        <div className="h-screen w-screen flex flex-col bg-surface relative overflow-hidden">
            {/* Title Bar (Custom) */}
            <div className="h-10 border-b border-border flex items-center px-4 justify-between bg-surface2/50 backdrop-blur-md z-50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold animate-flicker rounded-full" />
                    <span className="font-bebas tracking-[0.2em] text-xs opacity-60">ArgOS Arena // v1.0.0</span>
                </div>
                <SettingsPanel />
            </div>

            {/* Main Layout */}
            <div className="flex-1 flex relative">
                {/* Left Panel: AXIOM */}
                <PersonaPanel
                    role="axiom"
                    isActive={currentTurn === 'axiom'}
                />

                {/* Center: Controls & Info */}
                <div className="w-[400px] border-x border-border flex flex-col items-center justify-center p-8 bg-surface2/30 relative z-10">
                    <div className="absolute inset-0 pointer-events-none opacity-5">
                        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #C8A86C 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    </div>

                    <TopicInput />
                    <div className="my-12 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <DebateControls />

                    {isFinished && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-12 text-center"
                        >
                            <h3 className="text-4xl font-bebas tracking-[0.4em] text-gold animate-flicker">End Transmission</h3>
                        </motion.div>
                    )}
                </div>

                {/* Right Panel: CIPHER */}
                <PersonaPanel
                    role="cipher"
                    isActive={currentTurn === 'cipher'}
                />
            </div>
        </div>
    )
}

export default ArenaScreen
