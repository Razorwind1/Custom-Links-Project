<template>
  <div id="canvas">
    <div class="grid">
      <div class="item" v-for="(element, index) in $store.getters.getGridElements" :key="index">
        <!-- @click="open(element)" -->
        <div class="item-content">
          <div class="link" v-bind:style="getStyling(element.style)">
            <img v-bind:src="element.content.img" />
            <div class="label">{{element.content.label}}</div>
          </div>
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
    //returns a special vue "Style Object" from the store
    getStyling(styleName) {
      //console.log(styleName);
      const styleObject = this.$store.getters.getStyle(styleName);
      //console.log(styleObject);
      return styleObject;
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




 