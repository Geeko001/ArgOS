import { useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'

export function useApiKey() {
    const { apiKey, setApiKey } = useGameStore()
    const [isVerifying, setIsVerifying] = useState(false)

    useEffect(() => {
        if (apiKey === null) {
            window.ipcRenderer.invoke('api-key:load').then(setApiKey)
        }
    }, [apiKey, setApiKey])

    const saveKey = async (key: string) => {
        setIsVerifying(true)
        const result = await window.ipcRenderer.invoke('api-key:verify', key)
        if (result.success) {
            await window.ipcRenderer.invoke('api-key:save', key)
            setApiKey(key)
        }
        setIsVerifying(false)
        return result
    }

    const deleteKey = async () => {
        await window.ipcRenderer.invoke('api-key:delete')
        setApiKey(null)
    }

    return { apiKey, saveKey, deleteKey, isVerifying }
}
