import { ipcMain } from 'electron'
import Store from 'electron-store'
import { Groq } from 'groq-sdk'

const store = new Store({
    encryptionKey: 'argos-protocol-secure-v1', // Simple encryption key for user key storage
})

export function setupIpc(win: Electron.BrowserWindow) {
    ipcMain.handle('api-key:save', (_, key: string) => {
        store.set('groq-api-key', key)
        return true
    })

    ipcMain.handle('api-key:load', () => {
        return (store.get('groq-api-key') as string) || ''
    })

    ipcMain.handle('api-key:delete', () => {
        store.delete('groq-api-key')
        return true
    })

    ipcMain.handle('api-key:verify', async (_, key: string) => {
        try {
            const groq = new Groq({ apiKey: key })
            await groq.chat.completions.create({
                messages: [{ role: 'user', content: 'test' }],
                model: 'llama-3.1-8b-instant',
                max_tokens: 1,
            })
            return { success: true }
        } catch (error: any) {
            console.error('API Verification failed:', error)
            return { success: false, error: error.message }
        }
    })

    ipcMain.handle('theme:save', (_, theme: 'light' | 'dark') => {
        store.set('theme', theme)
        return true
    })

    ipcMain.handle('theme:load', () => {
        return (store.get('theme') as string) || 'dark'
    })
}
