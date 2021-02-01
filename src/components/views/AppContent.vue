<template>
  <div
    id="app-content"
    :class="[
      this.$store.state.events.popup.active ||
      this.$store.state.events.alert.active ||
      this.$store.state.events.contextMenu.active ||
      this.$store.state.events.assignedTagsMenu.active
        ? 'disable-input'
        : '',
    ]"
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
  margin: 7px;
  background: var(--background-color);
  overflow: auto;
}

.disable-input {
  pointer-events: none;
}
</style>
