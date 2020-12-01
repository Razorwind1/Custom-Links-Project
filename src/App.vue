<template>
  <div id="app" @click="closeContextMenu(), closeEditingFields()">
    <v-app>
      <TitleBar />
      <AppContent />
      <Popup v-if="this.$store.state.events.popup.active" />
      <Alert v-if="this.$store.state.events.alert.active" />
      <ContextMenu v-if="this.$store.state.events.contextMenu.active" />
      <ColorPicker v-if="this.$store.state.events.colorPicker.active" />
    </v-app>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import AppContent from "@/components/AppContent.vue";
import Popup from "@/components/Popup.vue";
import Alert from "@/components/Alert.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import ColorPicker from "@/components/ColorPicker.vue";

export default {
  components: {
    TitleBar,
    AppContent,
    Popup,
    Alert,
    ContextMenu,
    ColorPicker
  },
  methods: {
    closeContextMenu() {
      this.$store.commit("closeContextMenu");
    },
    closeColorPicker() {
      this.$store.commit("closeColorPicker");
    },
    closeEditingFields() {
      this.$store.commit("closeEditingFields");
    }
  },
  created: function() {
    const state = window.ipcRenderer.sendSync("state-read");
    if (state) this.$store.commit("setState", state);

    window.ipcRenderer.on("cmd-args", (event, args) => {
      if (args.open_dir) {
        const nativeIconBuffer = window.ipcRenderer.sendSync(
          "get-native-icon",
          args.open_dir
        );

        this.$store.commit("showPopup", {
          type: "add-link",
          address: args.open_dir,
          label: window.path.parse(args.open_dir).name,
          nativeIconBuffer,
        });
      }
    });

    this.$store.watch(
      (state, getters) => getters.stateUserData,
      newValue => {
        window.ipcRenderer.send("state-changed", newValue);
      },
      {
        deep: true
      }
    );

    window.addEventListener("resize", this.closeContextMenu);
    window.addEventListener("resize", this.closeColorPicker);
    window.addEventListener("resize", this.closeEditingFields);

    window.ipcRenderer.send("app-created");
  }
};
</script>

<style>
:root {
  --main-text-color: #eeeeee;
  --secondary-text-color: #111111;

  --light-background-color: #4d4d4d;
  --main-background-color: #2c2c2c;
  --dark-background-color: #202020;
  --active-background-color: #0e0e0e;

  --light-accent-color: #70ddbc;
  --main-accent-color: #20906f;
  --dark-accent-color: #127054;
  --active-accent-color: #034b35;

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

  color: var(--main-text-color);
  background-color: var(--dark-background-color);
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
  background-color: var(--light-background-color);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: var(--dark-background-color);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--active-background-color);
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
  background-color: var(--dark-background-color);
  color: var(--main-text-color-text-color);
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid var(--active-background-color);
  fill: var(--main-text-color);
  transition: border ease 200ms;
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
input:focus {
  border: 1px solid var(--main-accent-color);
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
