<template>
  <div id="canvas">
    <div class="grid">
      <div class="item" v-for="element in gridElements" :key="element.id">
        <div class="item-content">
          <div
            class="link"
            v-bind:style="getStyling(element.style)"
            @click="open(element)"
            @contextmenu="editLink(element.id)"
          >
            <img v-bind:src="element.content.img" />
            <div class="label">{{ element.content.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Muuri from "muuri";

export default {
  data: function () {
    return {
      gridElements: this.$store.getters.getGridElements,
      grid: null,
    };
  },
  mounted() {
    this.initializeGrid(".grid");
  },
  methods: {
    open: function (element) {
      console.log(element);
      window.shell.openExternal(element.content.address);
    },
    editLink: function (id) {
      this.$emit("show-popup", {
        type: "edit-link",
        saveButtonLabel: "Save Link",
        linkID: id,
      });
    },
    //returns a special vue "Style Object" from the store
    getStyling(styleName) {
      const styleObject = this.$store.getters.getStyle(styleName);
      return styleObject;
    },
    initializeGrid(el) {
      const grid = new Muuri(el, {
        dragEnabled: true,
        dragSort: true,
      });
      this.grid = grid;
    },
  },
  updated: function () {
    this.grid.destroy();
    this.initializeGrid(".grid");
  },
};
</script>

<style scoped>
#canvas {
  width: 100%;
  display: block;
}

.link {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
}
.link img {
  height: 70%;
}
.link .label {
  height: 30%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>




 