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
      this.$store.state.events.sidebar.active ? '' : 'collapse-side-bar',
    ]"
  >
    <NavBar />
    <div id="app-main">
      <router-view />
    </div>
    <div id="side-bar">
      <Links />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/core/NavBar.vue";
import Links from "@/components/core/Links.vue";

export default {
  components: {
    NavBar,
    Links,
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
  background: var(--background-color);
  overflow: auto;
}

.disable-input {
  pointer-events: none;
}

#side-bar {
  width: 300px;
  transition: width ease-in 100ms;
}
div.collapse-side-bar #side-bar {
  width: 0;
}
</style>
