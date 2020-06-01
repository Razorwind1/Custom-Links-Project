<template>
  <div id="app" style="-webkit-app-region: drag">
  <Taskbar></Taskbar>
  </div>
</template>

<script>
import Taskbar from './components/Taskbar.vue';

export default {
  name: "App",
  components: {
    Taskbar,
  }
  
};
</script>

<style src="./assets/main.css">
