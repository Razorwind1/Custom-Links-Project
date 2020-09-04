<template>
  <div id="app-content">
    <NavBar />
    <div id="app-main">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "AppContent",
  components: {
    NavBar,
  },
};
</script>

<style>
#app-content {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
}

#app-main {
  display: flex;
  flex-grow: 1;
  border-top-left-radius: 15px;
  padding: 20px;
  display: flex;
  background: var(--main-background-color);
  overflow: auto;
}
</style>