import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Message {
    role: 'axiom' | 'cipher'
    content: string
}

interface GameState {
    topic: string
    polarity: number // -1 (AXIOM) to 1 (CIPHER)
    isDebating: boolean
    turns: Message[]
    currentTurn: 'axiom' | 'cipher' | null
    streamingContent: string
    isFinished: boolean
    apiKey: string | null
    theme: 'dark' | 'light'

    setTopic: (topic: string) => void
    setPolarity: (polarity: number) => void
    setApiKey: (key: string | null) => void
    setTheme: (theme: 'dark' | 'light') => void
    startDebate: () => void
    resetDebate: () => void
    addTurn: (role: 'axiom' | 'cipher', content: string) => void
    updateStreamingContent: (content: string) => void
    finishDebate: () => void
}

export const useGameStore = create<GameState>()(
    immer((set) => ({
        topic: '',
        polarity: 0,
        isDebating: false,
        turns: [],
        currentTurn: null,
        streamingContent: '',
        isFinished: false,
        apiKey: null,
        theme: 'dark',

        setTopic: (topic) => set((state) => { state.topic = topic }),
        setPolarity: (polarity) => set((state) => { state.polarity = polarity }),
        setApiKey: (key) => set((state) => { state.apiKey = key }),
        setTheme: (theme) => set((state) => { state.theme = theme }),

        startDebate: () => set((state) => {
            state.isDebating = true
            state.isFinished = false
            state.turns = []
            state.currentTurn = 'axiom'
            state.streamingContent = ''
        }),

        resetDebate: () => set((state) => {
            state.isDebating = false
            state.isFinished = false
            state.turns = []
            state.currentTurn = null
            state.streamingContent = ''
            state.topic = ''
        }),

        addTurn: (role, content) => set((state) => {
            state.turns.push({ role, content })
            state.streamingContent = ''
            state.currentTurn = role === 'axiom' ? 'cipher' : 'axiom'

            if (state.turns.length >= 6) {
                state.isFinished = true
                state.currentTurn = null
                state.isDebating = false
            }
        }),

        updateStreamingContent: (content) => set((state) => {
            state.streamingContent = content
        }),

        finishDebate: () => set((state) => {
            state.isFinished = true
            state.isDebating = false
            state.currentTurn = null
        }),
    }))
)
