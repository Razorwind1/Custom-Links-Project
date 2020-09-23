<template>
  <div id="canvas">
    <div class="gridElement"
      v-for="(element, index) in getGridElements"
      :key="index"
      @click="open(element)"
      v-bind:style = getStyling(element.style)
    >
    <div class="tagsWrapper"></div>
    <img :src="element.content.img">
    <div class="label">{{element.content.label}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getGridElements"]),
  },
  methods: {
    open: function (element) {
      window.shell.openExternal(element.content.address);
    },
    //returns a special vue "Style Object" from the store
    getStyling (styleName) {
      console.log(styleName);
      const styleObject = this.$store.getters.getStyle(styleName);
      console.log(styleObject);
      return styleObject;
    }
  },
};
</script>

<style scoped>
#canvas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
}
#canvas>.gridElement{
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  text-align: center;
  position: relative;
}
#canvas>.gridElement img{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;

}
#canvas>.gridElement div.label{
  display: block;
  position: absolute;
  bottom: 1px;

}
#canvas>div:hover{
  background-color: var(--light-background-color);
}


</style>
