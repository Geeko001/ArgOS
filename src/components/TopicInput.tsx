import React from 'react'
import { useGameStore } from '../store/gameStore'

const TopicInput: React.FC = () => {
    const { topic, setTopic, polarity, setPolarity, isDebating } = useGameStore()

    return (
        <div className="w-full space-y-10">
            <div className="space-y-4">
                <label className="text-[10px] font-mono text-gold/50 uppercase tracking-[0.4em] block text-center">
                    Subject of Inquiry
                </label>
                <textarea
                    disabled={isDebating}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="ENTER TOPIC..."
                    className="w-full bg-transparent border-b border-border p-4 text-axiom font-bebas text-3xl text-center focus:outline-none focus:border-gold/50 transition-colors uppercase placeholder:opacity-10 resize-none h-24 no-scrollbar"
                />
            </div>

            <div className="space-y-6">
                <label className="text-[10px] font-mono text-gold/50 uppercase tracking-[0.4em] block text-center">
                    Polarity Alignment
                </label>
                <div className="relative pt-4">
                    <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.1"
                        value={polarity}
                        onChange={(e) => setPolarity(parseFloat(e.target.value))}
                        className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between mt-4 text-[10px] font-mono text-gold tracking-widest uppercase">
                        <span className={polarity < -0.3 ? 'opacity-100' : 'opacity-20'}>AXIOM</span>
                        <span className={Math.abs(polarity) <= 0.3 ? 'opacity-100' : 'opacity-20'}>NEUTRAL</span>
                        <span className={polarity > 0.3 ? 'opacity-100' : 'opacity-20'}>CIPHER</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopicInput
