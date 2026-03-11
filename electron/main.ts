import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setupIpc } from './ipc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// The built directory structure
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC!, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        frame: false,
        width: 1024,
        height: 700,
        minWidth: 1024,
        minHeight: 700,
    })

    setupIpc(win)

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date()).toLocaleString())
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        win.loadFile(path.join(process.env.DIST!, 'index.html'))
    }
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow)
