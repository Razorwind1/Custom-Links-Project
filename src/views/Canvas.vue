<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="6"
    :row-height="100"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :margin="[10, 10]"
    :use-css-transforms="true"
    :style="{ width: '100%', height: '100%' }"
  >
    <grid-item
      v-for="element in layout"
      :x="element.x"
      :y="element.y"
      :w="element.w"
      :h="element.h"
      :i="element.i"
      :key="element.i"
    
      @click="open(element)"
      @contextmenu="editLink(element.id, element.img)"
      >
      <div class="link" v-bind:style="getStyling(element.style)">
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
    };
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  methods: {
    updateGrid: function () {
      const gridElements = this.$store.getters.getGridElements
      this.layout = []

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
          label: element.content.label
        });
      });
    },
    open: function (element) {
      console.log(element);
      window.shell.openExternal(element.content.address);
    },
    editLink: function (id, url) {
      this.$emit("show-popup", {
        type: "edit-link",
        saveButtonLabel: "Save Link",
        linkID: id,
        imgUrl: url,
      });
    },
    addLink: function(id, url){
      this.$emit("show-popup", {
        type: "add-link",
        saveButtonLabel: "Save Link",
        linkid: id,
        imgUrl: url,
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
    }
  },
  created: function () {
    this.updateGrid()
    
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'addGridElement' || mutation.type === 'editGridElement' || mutation.type === 'setState'){
        this.updateGrid()
      }
    });
  },
  mounted: function() {
    this._keyListener = function(e) {
      if (e.key === "a" && (e.ctrlKey || e.metaKey)) { // add links hotkey
          this.addLink();
      }
    };
    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeDestroy: function () {
    this.unsubscribe();
    document.removeEventListener('keydown', this._keyListener);
  },
};
</script>

<style scoped>
#canvas {
  width: 100%;
  display: block;
}
.link {
  margin: 5px;
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




 