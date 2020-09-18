<template>
  <div id="app">
    <TitleBar />
    <AppContent v-on:show-popup="showPopup" :popup-visible="popupVisible" />
    <Popup
      v-if="popupVisible"
      :popup-visible="popupVisible"
      v-on:close-popup="closePopup"
      :popup-arg="popupArg"
    />
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import AppContent from "@/components/AppContent.vue";
import Popup from "@/components/Popup.vue";

export default {
  data: function () {
    return {
      popupVisible: false,
      popupArg: {},
    };
  },
  methods: {
    showPopup: function (arg) {
      this.popupVisible = true;
      this.popupArg = arg;
    },
    closePopup: function () {
      this.popupVisible = false;
      this.popupArg = {};
    },
  },
  components: {
    TitleBar,
    AppContent,
    Popup,
  },
};
</script>

<style>
:root {
  height: 100%;

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
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  color: var(--main-text-color);
  background-color: var(--dark-background-color);
  display: flex;
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
</style>
