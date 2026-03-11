import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, X, Moon, Sun, Key } from 'lucide-react'
import { useApiKey } from '../hooks/useApiKey'
import { useGameStore } from '../store/gameStore'

const SettingsPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { theme, setTheme } = useGameStore()
    const { deleteKey } = useApiKey()

    useEffect(() => {
        window.ipcRenderer.invoke('theme:load').then(setTheme)
    }, [setTheme])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        window.ipcRenderer.send('theme:save', newTheme)
        document.documentElement.classList.toggle('light', newTheme === 'light')
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="p-1 hover:text-gold transition-colors text-axiom"
            >
                <Settings size={18} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed top-0 right-0 h-full w-80 bg-surface2 border-l border-border z-[101] p-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-bebas tracking-widest text-axiom">Settings</h2>
                                <button onClick={() => setIsOpen(false)} className="hover:text-gold text-axiom">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-mono text-gold/50 uppercase tracking-[0.2em] block">Interface Theme</label>
                                    <button
                                        onClick={toggleTheme}
                                        className="w-full p-4 border border-border flex items-center justify-between hover:border-gold/30 transition-colors text-axiom"
                                    >
                                        <span className="font-bebas tracking-widest uppercase">{theme} Mode</span>
                                        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-mono text-gold/50 uppercase tracking-[0.2em] block">Data Security</label>
                                    <button
                                        onClick={() => {
                                            deleteKey()
                                            setIsOpen(false)
                                            window.location.reload()
                                        }}
                                        className="w-full p-4 border border-arena/30 text-arena flex items-center justify-between hover:bg-arena/10 transition-colors"
                                    >
                                        <span className="font-bebas tracking-widest uppercase">Change API Key</span>
                                        <Key size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 right-8 text-[10px] font-mono text-gold/20 uppercase tracking-widest">
                                ArgOS Protocol // Authorized Access Only
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SettingsPanel
