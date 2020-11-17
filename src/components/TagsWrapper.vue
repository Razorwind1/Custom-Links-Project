<template>

  <div class="link-tags-wrapper">
    <div
      class="tagIndicator-dot"
      v-for="tag in listOfTags"
      :key="tag"
      :style="{ 'background-color': $store.getters.getTagColor(tag) }"
      @mouseover="mouseOver(tag)"
      @mouseleave="mouseLeave"
    ></div>
    <div
      class="tagIndicator-bar"
      v-for="tag in listOfTags"
      :key="tag.name"
      :style="{ 'background-color': $store.getters.getTagColor(tag) }"
      v-bind:class="{visible: focusedTag==tag}"
    >{{ tag }}</div>
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
    mouseOver: function (tag) {
      this.focusedTag = tag;
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