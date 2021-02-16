module.exports = function (link_address, link_type) {
  window.ipcRenderer.send("open", link_address)
  link_type
}