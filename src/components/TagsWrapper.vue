<template>

  <div class="link-tags-wrapper">
    <div
      class="tagIndicator-dot"
      v-for="tagID in listOfTags"
      :key="tagID"
      :style="{ 'background-color': $store.getters.getTagColor(tagID) }"
      @mouseover="mouseOver(tagID)"
      @mouseleave="mouseLeave"
    ></div>
    <div
      class="tagIndicator-bar"
      v-for="tagID in listOfTags"
      :key="tagID.lol"
      :style="{ 'background-color': $store.getters.getTagColor(tagID) }"
      v-bind:class="{visible: focusedTag==tagID}"
    >{{ $store.getters.getTagName(tagID) }}</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      focusedTag: null,
    };
  },
  props: ['listOfTags'],
  methods: {
    mouseOver: function (tagID) {
      this.focusedTag = tagID;
    },
    mouseLeave: function () {
      this.focusedTag = null;
    }
  },
};
</script>

<style scoped>
.visible {
  visibility: visible !important;
}
.link-tags-wrapper {
  flex-direction: column;
  position: absolute;
  left: 4px;
  top: 4px;
}
.tagIndicator-dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 5px;
}

.tagIndicator-bar {
  visibility: hidden;
  display: inline-block;
  position: relative;
  left: 24px;
  bottom: 38px;
  height: 20px;
  min-width: 20px;
  border-radius: 5px;
  padding: 10px;
  padding-top: 0px;
  background-color: inherit;

  font-size: 13px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans";
  color: white;
}
</style>