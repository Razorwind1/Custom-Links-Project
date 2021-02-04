<template>
  <div id="app" @click="closeMenus()" @contextmenu="closeMenus()">
    <v-app>
      <TitleBar />
      <AppContent />
      <Popup v-if="this.$store.state.events.popup.active" />
      <Alert v-if="this.$store.state.events.alert.active" />
      <ContextMenu v-if="this.$store.state.events.contextMenu.active" />
      <ColorPicker v-if="this.$store.state.events.colorPicker.active" />
      <AssignedTagsMenu v-if="this.$store.state.events.assignedTagsMenu.active" />
    </v-app>
  </div>
</template>

<script>
import TitleBar from "@/components/core/TitleBar.vue";
import AppContent from "@/components/views/AppContent.vue";
import Popup from "@/components/popup/Popup.vue";
import Alert from "@/components/core/Alert.vue";
import ContextMenu from "@/components/floating/ContextMenu.vue";
import ColorPicker from "@/components/floating/ColorPicker.vue";
import AssignedTagsMenu from "@/components/floating/AssignedTagsMenu.vue";
import importCss from "@/js/helper/importCss.js";

export default {
  data() {
    return {
      stateHistory: [],
      stateHistoryCount: 50
    };
  },
  components: {
    TitleBar,
    AppContent,
    Popup,
    Alert,
    ContextMenu,
    ColorPicker,
    AssignedTagsMenu
  },
  methods: {
    closeMenus() {
      this.$store.commit("closeContextMenu");
      this.$store.commit("closeAssignedTagsMenu");
    }
  },
  created: function() {
    const state = window.ipcRenderer.sendSync("state-read");
    if (state) this.$store.commit("setState", state);
    this.stateHistory.push(JSON.parse(JSON.stringify(state)))

    window.ipcRenderer.on("cmd-args", (event, args) => {
      if (args.open_dir) {

        args.open_dir = args.open_dir.match(/^ *(.*[^ ]) *$/)[1]     // This regex is used to delete ' ' character from the start and the end of the given string.

        const nativeIconBuffer = window.ipcRenderer.sendSync(
          "get-native-icon",
          args.open_dir
        );

        this.$store.commit("showPopup", {
          type: "add-link",
          address: args.open_dir,
          label: window.path.parse(args.open_dir).name || 'My Drive',
          linkType: window.ipcRenderer.sendSync("get-link-type", {link: args.open_dir}),
          nativeIconBuffer,
        });
      }
    });

    this.$store.watch(
      (state, getters) => getters.stateUserData,
      (newValue) => {
        window.ipcRenderer.send("state-changed", newValue);
        if (this.stateHistory.length > this.stateHistoryCount)
          this.stateHistory.shift()

        this.stateHistory.push(JSON.parse(JSON.stringify(newValue)))
      },
      {
        deep: true
      }
    );


    this._keyListener = function (e) {
      if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
        if (e.target.tagName !== "INPUT" && this.stateHistory.length > 1){
          this.stateHistory.pop()
          this.$store.commit("setState", this.stateHistory.pop())
        }

      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));

    window.addEventListener("resize", this.closeMenus());

    importCss(this.$store.state.theme)

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
html {
  overflow: hidden;
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
  display: none;
}

/*   SCROLLBAR   */
::-webkit-scrollbar {
  width: 7px;
  border-radius: 10px;
}
::-webkit-scrollbar:hover {
  background-color: var(--background-hover);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: var(--background-accent);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--background-accent);
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
  transition: background-color ease-in-out 100ms;
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
</style>
