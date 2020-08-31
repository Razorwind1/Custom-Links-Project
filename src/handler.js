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
}