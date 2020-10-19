import { ipcRenderer, shell } from 'electron'

window.ipcRenderer = ipcRenderer
window.shell = shell
window.platform = process.platform