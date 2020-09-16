<template>
  <div id="app-content">
    <NavBar  v-on:show-popup="showPopup" />
    <div id="app-main">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  methods: {
    showPopup: function (arg) {
      this.$emit("show-popup", arg)
    }
  }
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
  padding: 7px;
  display: flex;
  background: var(--main-background-color);
}
</style>