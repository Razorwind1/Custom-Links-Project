import { ipcRenderer } from 'electron'
import path from 'path'

window.ipcRenderer = ipcRenderer
window.platform = process.platform
window.path = path