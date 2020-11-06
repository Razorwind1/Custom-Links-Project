<template>
  <div class="container" :style="containerPosition" ref="container">
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
    return {
      containerPosition: {
        top: "200px",
        left: "250px",
      },
    };
  },
  mounted: function () {
    this.setContainerPosition(this.$store.state.events.contextMenu.event);
  },
  updated: function () {
    this.setContainerPosition(this.$store.state.events.contextMenu.event);

  },
  methods: {
    setContainerPosition(event) {
      if (event !== null) {
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
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  min-width: 100px;
  max-width: 180px;
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