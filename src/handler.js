import { /*app, protocol, BrowserWindow,*/ ipcMain, dialog, shell, app } from 'electron'

import imageBufferFromUrl from './js/img/imgBufferFromUrl'
import saveLinkImageToFile from './js/img/saveLinkImageToFile'
import writeStateToFile from './js/helper/writeStateToFile'

import DIR from "./js/helper/directories"
import path from "path"
import fs from "fs"

var argv = require('minimist')(process.argv);

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

    // IMAGE HANDLING FOR THE LINKS
    ipcMain.on('open-image-dialog', (event) => {
        const imgSrc = dialog.showOpenDialogSync(win, {
            title: "Select Image",
            filters: [{
                name: 'jpg, png', extensions: ['jpg', 'png']
            }]
        })
        if (imgSrc && imgSrc[0]) {
            const imgBuffer = imageBufferFromUrl(imgSrc[0]);
            event.returnValue = { buffer: imgBuffer, src: path.basename(imgSrc[0]) }
        }
        else {
            event.returnValue = null
        }
    })
    ipcMain.on('open-file-dialog', (event, args) => {
        const dialogType = (args.type === "file") ? ['openFile'] : ['openDirectory']
        const fileSrc = dialog.showOpenDialogSync(win, {
            title: "Open",
            properties: dialogType
        })
        if (fileSrc && fileSrc[0])
            event.returnValue = fileSrc[0]
        else
            event.returnValue = null
    })
    ipcMain.on('get-image-buffer', (event, args) => {
        let imgBuffer = null
        let imgUrl = null

        if (args.id === undefined || args.url === undefined) {                                  //  ADD LINK FOR THE FIRST TIME
            imgBuffer = imageBufferFromUrl(DIR.DEFAULT_ICON);
            imgUrl = DIR.DEFAULT_ICON
        }
        else {                                                                                  //  EDIT LINK THAT ALREADY HAS ICON
            imgUrl = path.join(DIR.LINK_ICONS, args.id.toString(), args.url)
            imgBuffer = imageBufferFromUrl(imgUrl);

            if (!imgBuffer) {                                                                   //  EDIT LINK THAT ALREADY HAS ICON NOT FOUND --> ERROR
                console.log("FAILED TO LOAD THE IMAGE SPECIFIED, FALLING BACK TO DEFAULT ICON!")
                imgBuffer = imageBufferFromUrl(DIR.DEFAULT_ICON);
                imgUrl = DIR.DEFAULT_ICON
            }
        }

        event.returnValue = { buffer: imgBuffer, src: path.basename(imgUrl) }
    })
    ipcMain.on('get-native-icon', (event, iconPath) => {
        const iconPathNormalized = path.normalize(iconPath)
        const nativeIcon = app.getFileIcon(iconPathNormalized, { size: "normal" })
        nativeIcon.then(value => {
            event.returnValue = value.toPNG(100)
        })
    })
    ipcMain.on('save-link-image-to-file', (event, args) => {
        saveLinkImageToFile(args.buffer, args.label, args.id)
    })

    // OTHER EVENTS
    ipcMain.on('get-link-type', (event, args) => {
        //console.log(args.link)
        let type = null
        try {
            if (fs.lstatSync(args.link).isFile())
                type = 'file'
            if (fs.lstatSync(args.link).isDirectory())
                type = 'folder'
        }
        catch (e) {
            // Could not locate the link in the OS so it will be shown as url
            type = 'url'
        }

        event.returnValue = type
    })
    ipcMain.on('app-created', () => {
        win.webContents.send('cmd-args', argv)
    })
    ipcMain.on('get-startup-behavior', (event) => {
        event.returnValue = app.getLoginItemSettings()
    })
    ipcMain.on('set-startup-behavior', (event, enabled) => {
        app.setLoginItemSettings({
            openAtLogin: enabled,
            openAsHidden: enabled,
            name: "Link Tailor"
        })
    })

    // STATE EVENTS
    ipcMain.on('state-changed', (event, state) => {
        writeStateToFile(state)
    })
    ipcMain.on('state-read', (event) => {
        let state = null
        try {
            state = JSON.parse(fs.readFileSync(DIR.STATE))
        }
        catch (err) {
            //console.log(err)
        }
        event.returnValue = state
    })


    ipcMain.on("open", (event, address) => {
        shell.openExternal(address);
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

