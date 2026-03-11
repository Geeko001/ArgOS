import Groq from 'groq-sdk'
import { PERSONAS, getPolarityContext } from './personas'

export async function getGroqClient() {
    const apiKey = await window.ipcRenderer.invoke('api-key:load')
    if (!apiKey) throw new Error('API Key missing')
    return new Groq({ apiKey, dangerouslyAllowBrowser: true })
}

export async function* streamDebateTurn(
    role: 'axiom' | 'cipher',
    topic: string,
    history: { role: 'axiom' | 'cipher'; content: string }[],
    polarity: number
) {
    const client = await getGroqClient()
    const persona = role === 'axiom' ? PERSONAS.AXIOM : PERSONAS.CIPHER
    const polarityContext = getPolarityContext(polarity)

    const systemPrompt = persona.systemPrompt.replace('{polarity_context}', polarityContext) +
        ` Topic: ${topic}. Keep responses under 180 tokens. This is turn ${history.length + 1} of 6.`

    const messages = [
        { role: 'system', content: systemPrompt },
        ...history.map(h => ({
            role: h.role === role ? 'assistant' : 'user',
            content: h.content
        }))
    ]

    const stream = await client.chat.completions.create({
        messages: messages as any,
        model: 'llama-3.1-8b-instant',
        temperature: 0.85,
        max_tokens: 180,
        stream: true,
    })

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) yield content
    }
}
