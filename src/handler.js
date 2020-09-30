import { /*app, protocol, BrowserWindow,*/ ipcMain } from 'electron'

const webIconScraper = require("web-icon-scraper");

export default function handler(win) {
    ipcMain.on('getFavicon', (event, theUrl) => {
        webIconScraper({
            url: theUrl,
            sort: "des",
            limit: 3,
            checkStatus: false,
            followRedirectsCount: 0,
        }).then((output) => {
            console.log(output);
            });
        event.reply("this reply will contain the pic url?");
      })
    ipcMain.on('close-app', () => {
        win.close()
    })
    ipcMain.on('maximize-app', () => {
        if (win.isMaximized())
            win.unmaximize()
        else
            win.maximize()
    })
    ipcMain.on('minimize-app', () => {
        win.minimize()
    })

    win.on('blur', () => {
        win.webContents.send('app-state-changed', 'blur')
    })
    win.on('focus', () => {
        win.webContents.send('app-state-changed', 'focus')
    })
    win.on('maximize', () => {
        win.webContents.send('app-state-changed', 'maximize')
    })
    win.on('unmaximize', () => {
        win.webContents.send('app-state-changed', 'unmaximize')
    })
    win.on('minimize', () => {
        win.webContents.send('app-state-changed', 'minimize')
    })
    win.on('restore', () => {
        win.webContents.send('app-state-changed', 'restore')
    })
}

