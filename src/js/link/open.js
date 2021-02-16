module.exports = function (id) {
  const element = this.$store.getters.linkFromId(id)

  window.ipcRenderer.send("open", element.content.address)
  
}