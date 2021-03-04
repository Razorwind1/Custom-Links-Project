<template>
  <floating :event="this.$store.state.events.contextMenu.event" class="contextMenu">
    <div
      v-for="(element, index) in this.$store.state.events.contextMenu.arg"
      :key="index"
      @click.stop="element.click"
      :style="element.style"
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
  min-width: 150px;
  max-width: 180px;
  background: var(--background-color);
  border-radius: 5px;
  border: 1px solid var(--background-active);
  cursor: pointer;
  flex-direction: column;
}
.contextMenu > div {
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid var(--background-accent)
}
.contextMenu > div:last-child {
  border-bottom: none;
}
.contextMenu > div:hover {
  background-color: var(--background-color);
  filter: brightness(130%);
}
</style>
