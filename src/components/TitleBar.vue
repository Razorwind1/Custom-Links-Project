<template>
  <div id="title-bar">
    <div class="content"></div>
    <div class="buttons">
      <div v-on:click="minimize" class="minimize">&#9866;</div>
      <div v-on:click="maximize" class="maximize">&#9744;</div>
      <div v-on:click="close" class="close">&#9932;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  methods: {
    close: function () {
      window.ipcRenderer.send('close-app')
    },
    maximize: function () {
      window.ipcRenderer.send('maximize-app')
    },
    minimize: function () {
      window.ipcRenderer.send('minimize-app')
    },
  },
};
</script>

<style scoped>
#title-bar {
  user-select: none;
  height: 30px;
  width: 100%;
  background-color: var(--dark-background-color);
  -webkit-app-region: drag;
  display: flex;
}
#title-bar .content {
  width: 100%;
}
#title-bar .buttons {
  cursor: pointer;
  display: flex;
  -webkit-app-region: no-drag;
}
#title-bar .buttons > div {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#title-bar .buttons > div:hover {
  background-color: var(--active-background-color);
}
#title-bar .buttons > div:active {
  background-color: rgb(153, 153, 153);
}
#title-bar .buttons > div.close {
  font-size: 14px;
}
#title-bar .buttons > div.close:hover {
  background-color: rgb(105, 11, 11);
}
#title-bar .buttons > div.close:active {
  background-color: rgb(206, 14, 14);
}
</style>