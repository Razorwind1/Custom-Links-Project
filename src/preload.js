import { ipcRenderer } from 'electron'

window.ipcRenderer = ipcRenderer
window.platform = process.platform