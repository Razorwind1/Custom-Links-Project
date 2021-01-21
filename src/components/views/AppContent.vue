<template>
  <div
    id="app-content"
    :class="[this.$store.state.events.popup.active || this.$store.state.events.alert.active || this.$store.state.events.contextMenu.active ? 'disable-input' : '']"
  >
    <NavBar />
    <div id="app-main">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/core/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  props: {
    popupVisible: Boolean,
  },
};
</script>

<style>
#app-content {
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
}

#app-main {
  flex-grow: 1;
  border-top-left-radius: 15px;
  padding: 7px;
  background: var(--main-background-color);
}

.disable-input {
  pointer-events: none;
}
</style>