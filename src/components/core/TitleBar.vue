<template>
  <div id="title-bar" :class="[windowFocused ? 'focused' : '']">
    <div v-if="!windowMaximized" class="top-resize"></div>
    <div class="content">
      <img src="/assets/icons/LinkTailor_Universal_Icon.svg" />
      <h1 class="app-title">LinkTailor</h1>
      <div class="favourite-layouts">
        <div
          class="layout-circle"
          v-for="layout in this.$store.state.layouts"
          :key="layout.id"
          :style="{ 'background-color': layout.color }"
          :class="{ active: layout.active, hidden: !layout.favourite }"
          @click="setLayout(layout)"
        >
          <div class="layout-name">{{ layout.name }}</div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <div
        @click="toggleSidebar($event)"
        class="sidebar button"
        :class="[$store.state.events.sidebar.active ? 'active' : '']"
      >
        <searchSvg />
        <input
          type="text"
          class="input-empty"
          @click.stop
          ref="searchInput"
          @keyup="search($event)"
        />
        <div class="input-clear" @click.stop="clearInput">x</div>
      </div>
      <div @click="minimize" class="minimize button"><minimizeSvg /></div>
      <div @click="maximize" class="maximize button"><maximizeSvg /></div>
      <div @click="close" class="close button"><closeSvg /></div>
    </div>
  </div>
</template>

<script>
import closeMenus from "@/js/helper/closeMenus.js";
import searchSvg from "@/components/icons/magnifier.vue";
import minimizeSvg from "@/components/icons/minimize.vue";
import maximizeSvg from "@/components/icons/square.vue";
import closeSvg from "@/components/icons/close.vue";

export default {
  data: function () {
    return {
      windowMaximized: false,
      windowFocused: true,
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
    setLayout: function (layout) {
      if (layout.active) return;
      this.$store.commit("activateLayout", layout.id);
    },
    toggleSidebar: function () {
      this.$store.commit("toggleSidebar");

      this.clearInput();
      this.$refs.searchInput.focus();
    },
    search: function ({ target }) {
      if (target.value === "") target.classList.add("input-empty");
      else target.classList.remove("input-empty");

      this.$store.state.events.search.term = target.value;
    },
    clearInput: function () {
      this.$refs.searchInput.value = "";
      this.search({ target: this.$refs.searchInput });
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
  components: {
    searchSvg,
    minimizeSvg,
    maximizeSvg,
    closeSvg
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
#title-bar .content img {
  height: 20px;
  margin-right: 3px;
  margin-top: -2px;
}
.close,
.minimize,
.maximize {
  pointer-events: all !important;
}
.buttons {
  -webkit-app-region: no-drag;
}
.buttons svg {
  width: 13px;
  height: 13px;
  fill: var(--background-text);
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
  margin-right: 5px;
  border-radius: 50%;
  transition: width 100ms ease-in-out, border-radius 100ms ease-in-out;
  position: relative;
}
.buttons .sidebar.active {
  width: 150px;
  background-color: var(--button-accent);
  border-radius: 15px;
  padding: 0 10px;
}
.buttons .sidebar input {
  transition: width 100ms ease-in-out, padding 100ms ease-in-out, margin 100ms ease-in-out;
  width: 100px;
  height: 20px;
  margin-left: 5px;
  padding: 5px;
  background: transparent;
  border-left: none;
  border-top: none;
  border-right: none;
  border-radius: 0;
  padding-right: 15px;
}
.buttons .sidebar:not(.active) input {
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  margin: 0;
}
.buttons .sidebar .input-clear {
  width: 15px;
  justify-content: center;
  position: absolute;
  right: 12px;
  border-radius: 5px;
  transition: background-color 150ms ease-in-out;
}
.buttons .sidebar .input-clear:hover {
  background-color: var(--button-color);
}
.buttons .sidebar:not(.active) .input-clear,
.buttons .sidebar input.input-empty + .input-clear {
  display: none;
}

.top-resize {
  position: absolute;
  width: 100%;
  height: 2px;
  -webkit-app-region: no-drag;
}

.app-title {
  font-size: 15px;
  margin-top: 1px;
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
  font-size: 0.8rem;
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
  top: 30px;
  left: 7px;
  transform: translateX(-50%);
  background-color: var(--background-active);
  padding: 5px 10px;
  border-radius: 10px;
  justify-content: center;
  display: none;
}
.favourite-layouts .layout-name:before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: var(--background-active);
  top: 0;
  text-align: center;
  transform: rotate(45deg) translateY(-25%) translateX(-25%);
}
</style>
