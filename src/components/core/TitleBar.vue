<template>
  <div id="title-bar" :class="[windowFocused ? 'focused' : '']">
    <div v-if="!windowMaximized" class="top-resize"></div>
    <div class="content">
      <img src="/assets/svg/freepik/svg/022-bookmark (2).svg" />
      <h1 class="app-title">Tailor Link</h1>
    </div>
    <div class="buttons">
      <div @click="$store.commit('toggleSidebar')" class="sidebar button" :class="[$store.state.events.sidebar.active ? 'active' : '']">SB</div>
      <div @click="minimize" class="minimize button">&#9866;</div>
      <div @click="maximize" class="maximize button">&#9744;</div>
      <div @click="close" class="close button">&#9932;</div>
    </div>
  </div>
</template>

<script>
import closeMenus from "@/js/helper/closeMenus.js";

export default {
  methods: {
    closeMenus,
    close: function () {
      window.ipcRenderer.send("close-app");
    },
    maximize: function () {
      window.ipcRenderer.send("maximize-app");
    },
    minimize: function () {
      window.ipcRenderer.send("minimize-app");
    },
    maximized: function () {
      this.windowMaximized = true;
    },
    minimized: function () {
      this.windowMaximized = false;
    },
  },
  data: function () {
    return {
      windowMaximized: false,
      windowFocused: true,
    };
  },
  mounted: function () {
    window.ipcRenderer.on("app-state-changed", (event, message) => {
      if (message === "maximize") {
        this.windowMaximized = true;
      }
      if (message === "unmaximize") {
        this.windowMaximized = false;
      }
      if (message === "focus") {
        this.windowFocused = true;
      }
      if (message === "blur") {
        this.windowFocused = false;
        this.closeMenus();
      }
    });
  },
};
</script>

<style scoped>
#title-bar {
  height: var(--title-bar-height);
  width: 100%;
  background-color: var(--background-accent);
  -webkit-app-region: drag;
  border-bottom: var(--background-color) 1px solid;
}
#title-bar .content {
  width: 100%;
  padding-left: 6px;
  justify-content: flex-start;
  align-items: center;
}
#title-bar .content img {
  height: 13px;
  margin-right: 3px;
}
#title-bar .buttons {
  -webkit-app-region: no-drag;
}
#title-bar .buttons > div {
  width: var(--title-bar-height);
  height: var(--title-bar-height);
}
#title-bar .buttons > div:hover {
  background-color: var(--background-hover);
}
#title-bar .buttons > div:active {
  background-color: var(--background-hover);
  filter: brightness(70%);
}
#title-bar .buttons > div.close {
  font-size: 14px;
}
#title-bar .buttons > div.close:hover {
  background-color: rgb(170, 15, 15);
}
#title-bar .buttons > div.close:active {
  background-color: rgb(255, 2, 2);
}
#title-bar .buttons .sidebar{
  margin-right: 10px;
  border-radius: 50%;
}
#title-bar .buttons .sidebar.active{
  background-color: var(--button-accent);
}

#title-bar .top-resize {
  position: absolute;
  width: 100%;
  height: 2px;
  -webkit-app-region: no-drag;
}

#title-bar .app-title {
  font-size: 15px;
}

#title-bar .buttons,
#title-bar .content {
  opacity: 0.5;
}
#title-bar.focused .buttons,
#title-bar.focused .content {
  opacity: 1;
}
</style>
