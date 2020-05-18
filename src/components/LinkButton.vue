<!--This is a Vue Component-->

<!--why use the <template> tag?-->
<template>
<div class="labelLink">
    <div class="labelClickableArea">
        <img class="labelImage" v-bind:src="icon" v-bind:width="iconWidth">
        <div class="labelName"> {{ myName }}</div>
        labeltxt
    </div>
</div>
</template>

<script>
export default {
  name: "LinkButton",
  props: {

  },
  data () {
      return {
          myName: "myName label :)"
      }
  },
  computed: {
      name() {
          return this.myName;
      },
      icon() {
          return require('../assets/icons/Notepad.png');
      },
      iconWidth() {
          return "50px";
      }
  }
};
//var theImage = require.context("../assets/icons/Notepad.png", false, /\.png$/)
</script>

