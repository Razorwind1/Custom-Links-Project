<template>
  <div class="container" :style="containerPosition" ref="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      containerPosition: {
        top: "200px",
        left: "250px",
      },
    };
  },
  props: {
      event: MouseEvent
  },
  mounted: function () {
    this.setContainerPosition(event);
  },
  methods: {
    setContainerPosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const windowW = window.innerWidth;
        const windowH = window.innerHeight;

        const menuW = this.$refs.container.getBoundingClientRect().width;
        const menuH = this.$refs.container.getBoundingClientRect().height;

        if (mouseX + menuW >= windowW) {
          this.containerPosition.left = mouseX - menuW + "px";
        } else {
          this.containerPosition.left = mouseX + "px";
        }

        if (mouseY + menuH >= windowH) {
          this.containerPosition.top = windowH - menuH - 5 + "px";
        } else {
          this.containerPosition.top = mouseY + "px";
        }
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  background: var(--background-accent);
  padding: 0;
}
</style>