<template>
  <div id="app-content">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: "AppContent",
    components: {
        NavBar
    }
};
</script>

<style>
#app-content {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>