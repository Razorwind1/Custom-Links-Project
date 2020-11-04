<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="6"
    :max-rows="3"
    :row-height="100"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :prevent-collision="true"
    :responsive="false"
    :style="{ width: '100%', height: '100%' }"
    :use-style-cursor="false"
  >
    <grid-item
      v-for="element in layout"
      :x="element.x"
      :y="element.y"
      :w="element.w"
      :h="element.h"
      :i="element.i"
      :key="element.i"
      @move="moveEvent"
      @resized="resizedEvent"
      @moved="movedEvent"
    >
      <div
        class="link"
        v-bind:style="getStyling(element.style)"
        @click="open(element.address)"
        @contextmenu="contextMenu($event, element)"
      >
        <img v-bind:src="getElementImg(element.id, element.img)" />
        <div class="label">{{ element.label }}</div>
      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import imgUrlFromBuffer from "@/js/img/imgUrlFromBuffer.js";

export default {
  data() {
    return {
      layout: [],
      movingElement: null,
    };
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  methods: {
    updateGrid: function () {
      const gridElements = this.$store.getters.getGridElements;
      this.layout = [];

      gridElements.forEach((element) => {
        this.layout.push({
          id: element.id,
          x: element.pos.x,
          y: element.pos.y,
          w: element.pos.sizeX,
          h: element.pos.sizeY,
          i: element.id,
          img: element.content.img,
          style: element.style,
          label: element.content.label,
          address: element.content.address,
        });
      });
    },
    open: function (element_address) {
      if (this.movingElement !== null) {
        this.movingElement = null;
        return;
      }
      window.ipcRenderer.send("open", element_address);
    },
    contextMenu: function (event, element) {
      this.$store.commit("contextMenu", {
        content: [
          {
            label: "Edit Link",
            click: () => {
              this.editLink(element.id, element.img);
            },
          },
          {
            label: "Delete Link",
            click: () => {
              this.$store.commit("deleteGridElement", {id: element.id});
            },
          },
        ],
        event
      });
    },
    editLink: function (id, url) {
      this.$store.commit("showPopup", {
        type: "edit-link",
        linkID: id,
        imgUrl: url,
      });
    },
    addLink: function () {
      this.$store.commit("showPopup", {
        type: "add-link",
      });
    },
    getElementImg: function (id, url) {
      const imgBuffer = window.ipcRenderer.sendSync("get-image-buffer", {
        id,
        url,
      }).buffer;
      const imgUrl = imgUrlFromBuffer(imgBuffer);
      return imgUrl;
    },
    //returns a special vue "Style Object" from the store
    getStyling: function (styleName) {
      const styleObject = this.$store.getters.getStyle(styleName);
      return styleObject;
    },
    moveEvent: function (i) {
      this.movingElement = i;
    },
    movedEvent: function (id, newX, newY) {
      this.$store.commit("setGridElementPosition", { id, newX, newY });
    },
    resizedEvent: function (id, newH, newW) {
      this.$store.commit("resizeGridElement", { id, newH, newW });
    },
  },
  created: function () {
    this.updateGrid();

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (
        mutation.type === "addGridElement" ||
        mutation.type === "editGridElement" ||
        mutation.type === "deleteGridElement" ||
        mutation.type === "setState"
      ) {
        this.updateGrid();
      }
    });
  },
  mounted: function () {
    this._keyListener = function (e) {
      if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        this.addLink();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy: function () {
    this.unsubscribe();
    document.removeEventListener("keydown", this._keyListener);
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
  justify-content: space-evenly;
  flex-direction: column;
  padding: 8px 8px 4px 8px;
}
.link img {
  max-width: 100%;
  max-height: 75%;
  width: inherit;
  height: inherit;
  object-fit: contain;
}
.link .label {
  max-height: 20%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.vue-grid-item {
  cursor: pointer !important;
  transition: background-color 100ms ease-in-out;
  background-color: var(--dark-background-color);
  border-radius: 5px;
}
.vue-grid-item:hover {
  background-color: var(--light-background-color);
}
</style>




 