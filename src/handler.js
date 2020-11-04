import { /*app, protocol, BrowserWindow,*/ ipcMain, dialog, shell, app } from 'electron'

import imageBufferFromUrl from './js/img/imgBufferFromUrl'
import saveLinkImageToFile from './js/img/saveLinkImageToFile'
import writeStateToFile from './js/writeStateToFile'

import DIR from "./js/directories"
import path from "path"
import fs from "fs"

var argv = require('minimist')(process.argv);

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

    // IMAGE HANDLING FOR THE LINKS
    ipcMain.on('open-image-dialog', (event) => {
        const imgSrc = dialog.showOpenDialogSync(win, {
            title: "Select Image",
            filters: [{
                name: 'jpg, png, gif, svg', extensions: ['jpg', 'png', 'gif', 'svg']
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

    ipcMain.on('app-created', () => {
        win.webContents.send('cmd-args', argv)
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

