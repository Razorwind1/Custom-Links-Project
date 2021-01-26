<template>
  <floating :event="this.$store.state.events.contextMenu.event" class="contextMenu">
    <div
      v-for="(element, index) in this.$store.state.events.contextMenu.arg"
      :key="index"
      @click="element.click"
    >
      {{ element.label }}
    </div>
  </floating>
</template>

<script>
import floating from "@/components/floating/Floating.vue";

export default {
  components: {
    floating,
  },
};
</script>

<style scoped>
.contextMenu {
  min-width: 100px;
  max-width: 180px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  cursor: pointer;
  flex-direction: column;
}
.contextMenu > div {
  border-radius: 5px;
  padding: 10px;
  width: 100%;
}
.contextMenu > div:hover {
  background: var(--light-background-color);
}
</style>
