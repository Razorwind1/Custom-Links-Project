<template>
  <div id="title-bar">
    <div class="top-resize"></div>
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
      window.ipcRenderer.send("close-app");
    },
    maximize: function () {
      window.ipcRenderer.send("maximize-app");
    },
    minimize: function () {
      window.ipcRenderer.send("minimize-app");
    },
  },
};

window.ipcRenderer.on("app-state-changed", (event, message) => {
  if (message === "maximize") {
    const topResizeDiv = document.querySelector("#title-bar>.top-resize");
    topResizeDiv.classList.add("hidden");
  }
  if (message === "unmaximize") {
    const topResizeDiv = document.querySelector("#title-bar>.top-resize");
    topResizeDiv.classList.remove("hidden");
  }
  if (message === "focus") {
    const titleBar = document.querySelector("#title-bar");
    titleBar.classList.remove("focused");
  }
  if (message === "blur") {
    const titleBar = document.querySelector("#title-bar");
    titleBar.classList.add("focused");
  }
});
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

#title-bar .top-resize {
  position: absolute;
  width: 100%;
  height: 2px;
  -webkit-app-region: no-drag;
}

#title-bar.focused .buttons {
  opacity: 0.5;
}
</style>