<template>
  <div id="canvas">
    <div class="grid">
      <div
        class="item"
        v-for="(element, index) in $store.getters.getGridElements"
        :key="index"
        @click="open(element)"
      >
        <div class="item-content">
          <div class="my-custom-content">{{element.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Muuri from "muuri";

export default {
  mounted() {
    const grid = new Muuri(".grid", {
      dragEnabled: true,
      dragSort: true,
    });

    console.log(grid);
  },
  methods: {
    open: function (element) {
      window.shell.openExternal(element.content.address);
    },
  },
};
</script>

<style scoped>
#canvas {
  display: grid;
  width: 100%;
}
.grid {
  position: relative;
}
.item {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 5px;
  z-index: 1;
  color: #fff;
  text-align: center;
  align-content: center;
  line-height: 100px;
}
.item.muuri-item-dragging {
  z-index: 2;
}
.item.muuri-item-releasing {
  z-index: 3;
}
.item.muuri-item-hidden {
  z-index: 0;
}
.item-content {
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: black;
  cursor: pointer;
}
.item.muuri-item-dragging .item-content,
.item.muuri-item-releasing .item-content {
  background: #a8a8a8;
}
</style>




 