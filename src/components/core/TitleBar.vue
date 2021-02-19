<template>
  <div id="title-bar" :class="[windowFocused ? 'focused' : '']">
    <div v-if="!windowMaximized" class="top-resize"></div>
    <div class="content">
      <img src="/assets/svg/freepik/svg/022-bookmark (2).svg" />
      <h1 class="app-title">Tailor Link</h1>
      <div class="favourite-layouts">
        <div
          class="layout-circle"
          v-for="layout in this.favouriteLayouts"
          :key="layout.id"
          :style="{ 'background-color': layout.color }"
          :class="{ active: layout.active }"
          @click="setLayout(layout.id)"
        >
          <div class="layout-name">{{layout.name}}</div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <div
        @click="$store.commit('toggleSidebar')"
        class="sidebar button"
        :class="[$store.state.events.sidebar.active ? 'active' : '']"
      >
        SB
      </div>
      <div @click="minimize" class="minimize button">&#9866;</div>
      <div @click="maximize" class="maximize button">&#9744;</div>
      <div @click="close" class="close button">&#9932;</div>
    </div>
  </div>
</template>

<script>
import closeMenus from "@/js/helper/closeMenus.js";

export default {
  data: function () {
    return {
      windowMaximized: false,
      windowFocused: true,
      favouriteLayouts: this.$store.state.layouts.filter(
        (layout) => layout.favourite === true
      ),
    };
  },
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
    setLayout: function (id) {
      this.$store.commit("activateLayout", id);
    },
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
.content {
  width: 100%;
  padding-left: 6px;
  justify-content: flex-start;
  align-items: center;
}
img {
  height: 13px;
  margin-right: 3px;
}
.buttons {
  -webkit-app-region: no-drag;
}
.buttons > div {
  width: var(--title-bar-height);
  height: var(--title-bar-height);
}
.buttons > div:hover {
  background-color: var(--background-hover);
}
.buttons > div:active {
  background-color: var(--background-hover);
  filter: brightness(70%);
}
.buttons > div.close {
  font-size: 14px;
}
.buttons > div.close:hover {
  background-color: rgb(170, 15, 15);
}
.buttons > div.close:active {
  background-color: rgb(255, 2, 2);
}
.buttons .sidebar {
  margin-right: 10px;
  border-radius: 50%;
}
.buttons .sidebar.active {
  background-color: var(--button-accent);
}

.top-resize {
  position: absolute;
  width: 100%;
  height: 2px;
  -webkit-app-region: no-drag;
}

.app-title {
  font-size: 15px;
}

.buttons,
.content {
  opacity: 0.5;
}
.focused .buttons,
.focused .content {
  opacity: 1;
}

.favourite-layouts {
  font-size: .8rem;
  -webkit-app-region: no-drag;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 50;
}
.favourite-layouts .layout-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid var(--background-hover);
  cursor: pointer;
  margin-left: 5px;
  transition: border-color 100ms ease, transform 100ms ease;
}
.favourite-layouts .layout-circle.active {
  border: 1px solid var(--background-text);
}
.favourite-layouts .layout-circle:hover {
  transform: scale(1.5);
  border: 1px solid var(--background-text);
}
.favourite-layouts .layout-circle:hover .layout-name {
  display: flex;
}
.favourite-layouts .layout-name {
  position: absolute;
  top: 25px;
  left: 7px;
  transform: translateX(-50%);
  background-color: var(--background-active);
  padding: 5px 10px;
  border-radius: 10px;
  justify-content: center;
  display: none;
}
.favourite-layouts .layout-name:before {
  content: '';
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: var(--background-active);
  top: 0;
  text-align: center;
  transform: rotate(45deg) translateY(-25%) translateX(-25%);
}
</style>
