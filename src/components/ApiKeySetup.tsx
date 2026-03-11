import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useApiKey } from '../hooks/useApiKey'
import { Key, AlertCircle, Loader2 } from 'lucide-react'

const ApiKeySetup: React.FC = () => {
    const { saveKey, isVerifying } = useApiKey()
    const [input, setInput] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        const result = await saveKey(input)
        if (!result.success) {
            setError(result.error || 'Invalid API Key')
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-surface/90 backdrop-blur-xl z-[150] p-6">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="max-w-md w-full bg-surface2 border border-border p-8 rounded-lg shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-arena via-gold to-cipher opacity-50" />

                <div className="flex items-center gap-3 mb-6">
                    <Key className="text-gold w-6 h-6" />
                    <h2 className="text-3xl font-bebas tracking-wider text-axiom">Initialize Protocol</h2>
                </div>

                <p className="text-axiom/60 font-crimson text-lg mb-8 italic leading-relaxed">
                    "The first step to truth is a key that unlocks the mind. Please provide your Groq API key to proceed into the arena."
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-gold/50 uppercase tracking-[0.2em] block">
                            Authorization Token
                        </label>
                        <input
                            autoFocus
                            type="password"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="gsk_..."
                            className="w-full bg-surface3 border border-border p-4 text-axiom font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors uppercase placeholder:text-axiom/20"
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2 text-arena text-xs font-mono"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <button
                        disabled={!input || isVerifying}
                        className={`w-full group relative overflow-hidden p-4 font-bebas tracking-widest text-xl transition-all
              ${isVerifying ? 'opacity-50' : 'hover:scale-[1.02] active:scale-95'}
              ${error ? 'bg-arena/20 text-arena border border-arena' : 'bg-gold text-surface'}
            `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isVerifying ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Confirm Identity'
                            )}
                        </span>
                    </button>
                </form>

                <div className="mt-8 flex justify-center gap-6 opacity-40">
                    <div className="h-px w-8 bg-border" />
                    <div className="h-px w-8 bg-border" />
                    <div className="h-px w-8 bg-border" />
                </div>
            </motion.div>
        </div>
    )
}

export default ApiKeySetup
