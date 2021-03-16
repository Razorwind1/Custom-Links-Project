<template>
  <div
    id="app"
    @click="closeMenus()"
    @contextmenu="closeMenus()"
    @keydown="keydown"
    @wheel="scroll"
    tabindex="0"
    style="outline: none"
  >
    <TitleBar />
    <div
      style="height: 100%; overflow: hidden"
      :class="[this.eventsActive() ? 'disable-input' : '']"
    >
      <NavBar />
      <AppContent ref="appContent" />
    </div>

    <TagList
      v-if="
        this.$store.state.events.popup.active &&
        this.$store.state.events.popup.arg.type === 'tag-list'
      "
    />
    <EditAddLink
      v-if="
        this.$store.state.events.popup.active &&
        (this.$store.state.events.popup.arg.type === 'edit-link' ||
          this.$store.state.events.popup.arg.type === 'add-link')
      "
    />
    <LayoutList
      v-if="
        this.$store.state.events.popup.active &&
        this.$store.state.events.popup.arg.type === 'layout-list'
      "
    />
    <Alert v-if="this.$store.state.events.alert.active" />
    <ContextMenu v-if="this.$store.state.events.contextMenu.active" />
    <ColorPicker v-if="this.$store.state.events.colorPicker.active" />
    <AssignedTagsMenu v-if="this.$store.state.events.assignedTagsMenu.active" />
    <AssignedLayoutsMenu v-if="this.$store.state.events.assignedLayoutsMenu.active" />
  </div>
</template>

<script>
import TitleBar from "@/components/core/TitleBar.vue";
import NavBar from "@/components/core/NavBar.vue";
import AppContent from "@/components/views/AppContent.vue";
import EditAddLink from "@/components/popup/EditAddLink.vue";
import LayoutList from "@/components/popup/LayoutList.vue";
import TagList from "@/components/popup/TagList.vue";
import Alert from "@/components/core/Alert.vue";
import ContextMenu from "@/components/floating/ContextMenu.vue";
import ColorPicker from "@/components/floating/ColorPicker.vue";
import AssignedTagsMenu from "@/components/floating/AssignedTagsMenu.vue";
import AssignedLayoutsMenu from "@/components/floating/AssignedLayoutsMenu.vue";
import importCss from "@/js/helper/importCss.js";
import closeMenus from "@/js/helper/closeMenus.js";

export default {
  data() {
    return {
      stateHistory: [],
      stateHistoryCount: 50,
    };
  },
  components: {
    TitleBar,
    AppContent,
    EditAddLink,
    TagList,
    Alert,
    LayoutList,
    ContextMenu,
    ColorPicker,
    AssignedTagsMenu,
    AssignedLayoutsMenu,
    NavBar,
  },
  methods: {
    closeMenus,
    eventsActive: function () {
      return (
        this.$store.state.events.popup.active ||
        this.$store.state.events.alert.active ||
        this.$store.state.events.contextMenu.active ||
        this.$store.state.events.assignedTagsMenu.active ||
        this.$store.state.events.assignedLayoutsMenu.active
      );
    },
    scroll: function (e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.ctrlKey) {
        if (e.deltaY > 0) this.$refs.appContent.$refs.canvas.decreaseGridSize?.();
        if (e.deltaY < 0) this.$refs.appContent.$refs.canvas.increaseGridSize?.();
      }
    },
    keydown: function (e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (
        e.key.toLowerCase() === "z" &&
        (e.ctrlKey || e.metaKey) &&
        this.stateHistory.length > 1
      ) {
        this.stateHistory.pop();
        this.$store.commit("setState", this.stateHistory.pop());
      }

      if (e.key.toLowerCase() === "a" && (e.ctrlKey || e.metaKey)) {
        this.$store.commit("showPopup", {
          type: "add-link",
        });
      }

      if (e.key.toLowerCase() === "+" && (e.ctrlKey || e.metaKey)) {
        this.$refs.appContent.$refs.canvas.increaseGridSize?.();
      }
      if (e.key.toLowerCase() === "-" && (e.ctrlKey || e.metaKey)) {
        this.$refs.appContent.$refs.canvas.decreaseGridSize?.();
      }
    },
  },
  created: function () {
    const state = window.ipcRenderer.sendSync("state-read");
    if (state) this.$store.commit("setState", state);
    this.stateHistory.push(JSON.parse(JSON.stringify(state)));

    window.ipcRenderer.on("cmd-args", (event, args) => {
      if (args.open_dir) {
        args.open_dir = args.open_dir.match(/^ *(.*[^ ]) *$/)[1]; // This regex is used to delete ' ' character from the start and the end of the given string.

        const nativeIconBuffer = window.ipcRenderer.sendSync(
          "get-native-icon",
          args.open_dir
        );

        this.$store.commit("showPopup", {
          type: "add-link",
          address: args.open_dir,
          label: window.path.parse(args.open_dir).name || "My Drive",
          linkType: window.ipcRenderer.sendSync("get-link-type", { link: args.open_dir }),
          nativeIconBuffer,
        });
      }
    });

    this.$store.watch(
      (state, getters) => getters.stateUserData,
      (newValue) => {
        window.ipcRenderer.send("state-changed", newValue);
        if (this.stateHistory.length > this.stateHistoryCount) this.stateHistory.shift();

        this.stateHistory.push(JSON.parse(JSON.stringify(newValue)));

        this.$refs.appContent.$refs.canvas.updateGrid?.();
      },
      {
        deep: true,
      }
    );

    window.addEventListener("resize", () => {
      this.closeMenus();
      this.$refs.appContent.$refs.canvas.updateContainerWidth?.();
    });

    importCss(this.$store.state.theme);

    window.ipcRenderer.send("app-created");
  },
};
</script>

<style>
:root {
  --nav-width: 50px;
  --title-bar-height: 30px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-drag: none;
}
* div {
  display: flex;
}
html,
body {
  overflow: hidden;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  color: var(--background-text);
  background-color: var(--background-accent);
  flex-direction: column;
}
.hidden {
  display: none !important;
}

/*   SCROLLBAR   */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar:hover {
  background-color: var(--background-muted);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: var(--line-color);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--background-active);
}
::-webkit-scrollbar-button,
::-webkit-scrollbar-track-piece,
::-webkit-scrollbar-track,
::-webkit-scrollbar-corner,
::-webkit-resizer {
  display: none;
}

.button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color ease-in-out 100ms, opacity ease-in-out 100ms;
  border-radius: 5px;
}

input {
  padding: 10px;
  background-color: var(--background-accent);
  color: var(--background-text);
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid var(--background-active);
  fill: var(--background-text);
  transition: border ease 200ms;
}
input[type="color"] {
  padding: 0;
  margin: 0;
  border: none;
  width: 23px;
  height: 25px;
  cursor: pointer;
  grid-area: button-color;
}
input[type="color"]:hover {
  border: 1px solid var(--button-hover);
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
input:focus {
  border: 1px solid var(--button-color);
  outline: none;
}
.required {
  border: 1px solid rgb(175, 35, 35);
}
span.required-text {
  color: rgb(175, 35, 35);
  font-size: 12px;
  margin-top: -5px;
  margin-left: 5px;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.disable-input {
  pointer-events: none;
}
</style>
