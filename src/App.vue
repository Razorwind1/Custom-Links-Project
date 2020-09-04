<template>
  <div id="app">
    <TitleBar />
    <AppContent />
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar.vue";
import AppContent from "@/components/AppContent.vue";

export default {
  name: "App",
  components: {
    TitleBar,
    AppContent,
  },
};
</script>

<style>
:root {
  height: 100%;

  --main-text-color: #eeeeee;
  --light-background-color: #4d4d4d;
  --main-background-color: #2c2c2c;
  --dark-background-color: #202020;
  --active-background-color: #181818;

  --nav-border-color: #646464;
  --nav-hover-color: #3b3b3b;
  --nav-active-color: #474747;
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
::-webkit-scrollbar:hover{
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
</style>
