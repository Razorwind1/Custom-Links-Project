<template>
  <div id="app">
    <TitleBar/>
    <AppContent/>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue'
import AppContent from '@/components/AppContent.vue'

export default {
  name: 'App',
  components: {
    TitleBar,
    AppContent
  }
}
</script>

<style>
:root {
  height: 100%;
  
  --main-text-color: #eeeeee;
  --main-background-color: #2c2c2c;
  --dark-background-color: #202020;
  --active-background-color: #181818;

  --nav-border-color: #646464;
  --nav-hover-color: #3b3b3b;
  --nav-active-color: #242424;
  --nav-width: 50px;
}
* {
  margin: 0;
  padding: 0;
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
  background-color: var(--main-background-color);
  display: flex;
  flex-direction: column;
}
.hidden {
  display: none;
}
</style>
