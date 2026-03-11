import { useCallback, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { streamDebateTurn } from '../lib/groq'

export function useDebate() {
    const isProcessing = useRef(false)
    const {
        topic,
        turns,
        currentTurn,
        polarity,
        addTurn,
        updateStreamingContent,
        isDebating,
        isFinished
    } = useGameStore()

    const nextTurn = useCallback(async () => {
        if (!isDebating || isFinished || !currentTurn || isProcessing.current) return

        try {
            isProcessing.current = true
            let fullContent = ''
            const stream = streamDebateTurn(currentTurn, topic, turns, polarity)

            for await (const chunk of stream) {
                fullContent += chunk
                updateStreamingContent(fullContent)
            }

            addTurn(currentTurn, fullContent)
        } catch (error) {
            console.error('Debate turn failed:', error)
        } finally {
            isProcessing.current = false
        }
    }, [isDebating, isFinished, currentTurn, topic, turns, polarity, addTurn, updateStreamingContent])

    return { nextTurn }
}
