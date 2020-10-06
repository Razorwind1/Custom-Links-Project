<template>
  <grid-layout
            :margin="[10,10]"
            :layout.sync="layout"
            :col-num="10"
            :row-height="10"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="false"
            :use-css-transforms="true"
  >
  <div id="canvas">
    <grid-item v-for="(element, index) in gridElements" 
      :x="element.pos.X"
      :y="element.pos.Y"
      :w="element.pos.sizeX"
      :h="element.pos.sizeY"
      :i="index"
      :key="element.id"
      @resize="resizeEvent"
      @move="moveEvent"
      @resized="resizedEvent"
      @moved="movedEvent"
      >
        <!-- @click="open(element)" -->
      <div class="link" v-bind:style="getStyling(element.style)">
        <img v-bind:src="element.content.img" />
        <div class="label">{{element.content.label}}</div>
      </div>
    </grid-item>
  </div>
</grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';

//creating layout
var testLayout = [
  {"x":5,"y":1,"w":3,"h":10,"i":"index"},
  {"x":0,"y":0,"w":0,"h":0,"i":"index"}];

export default {
  mounted() {
    this.index = this.layout.length;
  },
  data() {
    return {
      layout: testLayout,
      gridElements: this.$store.getters.getGridElements
    }
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  methods: {
    open: function (element) {
      window.shell.openExternal(element.content.address);
    },
    //returns a special vue "Style Object" from the store
    getStyling(styleName) {
      //console.log(styleName);
      const styleObject = this.$store.getters.getStyle(styleName);
      //console.log(styleObject);
      return styleObject;
    },
    moveEvent: function(i, newX, newY){
        console.log("MOVE i=" + i + ", x=" + newX + ", y=" + newY);
    },
    resizeEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZE i=" + i + ", h=" + newH + ", w=" + newW + 
        ", h(px)=" + newHPx + ", w(px)=" + newWPx);
    },
    movedEvent: function(i, newX, newY){
        console.log("MOVED i=" + i + ", x=" + newX + ", y=" + newY);
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", h=" + newH + ", w=" + newW +
        ", h(px)=" + newHPx + ", w(px)=" + newWPx);
    },
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
  position: absolute;
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




 