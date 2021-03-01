<template>
  <div
    id="app-content"
    :class="[
      this.$store.state.events.popup.active ||
      this.$store.state.events.alert.active ||
      this.$store.state.events.contextMenu.active ||
      this.$store.state.events.assignedTagsMenu.active ||
      this.$store.state.events.assignedLayoutsMenu.active
        ? 'disable-input'
        : '',
      this.$store.state.events.sidebar.active ? '' : 'collapse-side-bar',
    ]"
  >
    <div id="app-main">
      <router-view ref="canvas" />
    </div>
    <div id="side-bar" ref="sideBar">
      <Links />
    </div>
  </div>
</template>

<script>
import Links from "@/components/core/Links.vue";

export default {
  components: {
    Links,
  },
  props: {
    popupVisible: Boolean,
  },
  mounted() {
    this.$refs.sideBar.addEventListener("transitionend", () => {
      this.$refs.canvas.updateGrid?.();
    });
  },
};
</script>

<style>
#app-content {
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
  background-color: var(--background-color);
  border-top-left-radius: 10px;
}

#app-main {
  flex-grow: 1;
  border-top-left-radius: 15px;
  background: var(--background-color);
  overflow: auto;
}

.disable-input {
  pointer-events: none;
}

#side-bar {
  min-width: 250px;
  width: 0;
  background-color: var(--background-accent);
  transition: min-width ease-in 100ms;
}
div.collapse-side-bar #side-bar {
  min-width: 0;
}
</style>
