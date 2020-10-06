import { /*app, protocol, BrowserWindow,*/ ipcMain, dialog, app } from 'electron'
import fs from 'fs'
import path from 'path'

const APP_DIRECTORY = path.dirname(app.getPath('exe'))
const USER_DATA_DIRECTORY = path.join(APP_DIRECTORY, 'user_data')

fs.mkdir(USER_DATA_DIRECTORY, { recursive: true }, (err) => {
    if (err) throw err;
});
console.log(USER_DATA_DIRECTORY)

export default function handler(win) {
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
    ipcMain.on('open-image-dialog', (event) => {
        const imgSrc = dialog.showOpenDialogSync(win, {
            title: "Select Image",
            filters: [{
                extensions: ['jpg', 'png', 'gif']
            }]
        })
        if (imgSrc && imgSrc[0]) {
            saveLinkImage(imgSrc[0], "001")
            event.returnValue = imgSrc[0]
        }
        else {
            event.returnValue = ""
        }
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

function saveLinkImage(imgSrc, linkId) {
    const linkFolderDir = path.join(USER_DATA_DIRECTORY, linkId)
    const imageDir = path.join(__dirname, path.basename(imgSrc))
    console.log(imageDir)

    fs.mkdir(linkFolderDir, { recursive: true }, (err) => {
        if (err) throw err;
    });
    fs.copyFile(imgSrc, imageDir, (err) => {
        if (err) throw err;
    });
}