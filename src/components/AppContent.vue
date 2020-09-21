<template>
  <div id="app-content" :class="[popupVisible ? 'disable-input' : '']">
    <NavBar v-on:show-popup="showPopup" />
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
      this.$emit("show-popup", arg);
    },
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