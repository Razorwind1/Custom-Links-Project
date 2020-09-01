import { app, protocol, BrowserWindow, ipcMain } from 'electron'

export default function handler(win) {
    ipcMain.on('close-app', (event, arg) => {
        win.close()
    })
    ipcMain.on('maximize-app', (event, arg) => {
        if (win.isMaximized())
            win.unmaximize()
        else
            win.maximize()
    })
    ipcMain.on('minimize-app', (event, arg) => {
        win.minimize()
    })

    win.on('blur', (event, arg) => {
        win.webContents.send('app-state-changed', 'blur')
    })
    win.on('focus', (event, arg) => {
        win.webContents.send('app-state-changed', 'focus')
    })
    win.on('maximize', (event, arg) => {
        win.webContents.send('app-state-changed', 'maximize')
    })
    win.on('unmaximize', (event, arg) => {
        win.webContents.send('app-state-changed', 'unmaximize')
    })
    win.on('minimize', (event, arg) => {
        win.webContents.send('app-state-changed', 'minimize')
    })
    win.on('restore', (event, arg) => {
        win.webContents.send('app-state-changed', 'restore')
    })
}