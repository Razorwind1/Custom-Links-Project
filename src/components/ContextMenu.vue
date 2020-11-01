<template>
  <div class="container">
    <div
      v-for="(element, index) in this.$store.state.events.contextMenu.arg"
      :key="index"
      @click="element.click"
    >
      {{ element.label }}
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  min-width: 150px;
  top: 200px;
  left: 200px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  cursor: pointer;
  flex-direction: column;
}
.container > div {
  border-radius: 5px;
  padding: 10px;
  width: 100%;
}
.container > div:hover {
  background: var(--light-background-color);
}
</style>