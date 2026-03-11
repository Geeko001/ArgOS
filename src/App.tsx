import React, { useState } from 'react'
import IntroAnimation from './components/IntroAnimation'
import ApiKeySetup from './components/ApiKeySetup'
import ArenaScreen from './components/ArenaScreen'
import { useApiKey } from './hooks/useApiKey'

const App: React.FC = () => {
    const [showIntro, setShowIntro] = useState(true)
    const { apiKey, isVerifying } = useApiKey()

    if (showIntro) {
        return <IntroAnimation onComplete={() => setShowIntro(false)} />
    }

    // If apiKey is null, it means we are still loading from storage
    if (apiKey === null && !isVerifying) {
        return (
            <div className="bg-surface min-h-screen flex items-center justify-center font-mono text-gold/30 uppercase tracking-[0.3em]">
                Accessing Encrypted Memory...
            </div>
        )
    }

    if (!apiKey) {
        return <ApiKeySetup />
    }

    return <ArenaScreen />
}

export default App
