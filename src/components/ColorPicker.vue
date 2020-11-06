<template>

<div class="color-picker-overlay" @click="closeColorPicker">
  <div class="container" :style="containerPosition" ref="container" @click.stop>
  <div @click="saveColor" class="button save">&check;</div>
  <v-color-picker 
  class="myColorPicker"
  v-on:input = "colorPickerColor"
  dot-size = "40"
  mode="hexa"
  v-bind:dark= "true"
  v-bind:value = "oldColor"
  width="250"
  canvas-height="100"
></v-color-picker>
<div @click="closeColorPicker" class="button close">&#9932;</div>
  <div class="color-picker-buttons">
  </div>
  </div>

</div>
</template>

<script>

export default {
  data: function () {
    return {
      containerPosition: {
        top: "200px",
        left: "250px",
      },
      oldColor: "",
      itemID: "bo",
      selectedColor: "#EEEEEE",
    };
  },
  methods: {
    closeColorPicker: function () {
      this.$store.commit("closeColorPicker");
    },
    saveColor: function () {
      this.$store.commit('editTagColor', {
        tagName: this.itemId,
        newColor: this.selectedColor});
      this.$store.commit("closeColorPicker");
    },
    colorPickerColor: function (arg) {
      this.selectedColor = arg;
    },
    setContainerPosition(event) {
      if (event !== null) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const windowW = window.innerWidth;
      const windowH = window.innerHeight;

      const menuW = this.$refs.container.getBoundingClientRect().width;
      const menuH = this.$refs.container.getBoundingClientRect().height;

      if (mouseX + menuW >= windowW) {
        this.containerPosition.left = mouseX - menuW + "px";
      } else {
        this.containerPosition.left = mouseX + "px";
      }

      if (mouseY + menuH >= windowH) {
        this.containerPosition.top = windowH - menuH - 5 + "px";
      } else {
        this.containerPosition.top = mouseY + "px";
      }
      }
    }
  },
  mounted: function () {
    this.setContainerPosition(this.$store.state.events.colorPicker.event);
    if (this.$store.state.events.colorPicker.arg.type === "tag-color") {
      this.oldColor = this.$store.state.events.colorPicker.arg.tagColor;
      this.itemId = this.$store.state.events.colorPicker.arg.tagName;
    // Enter Key to Submit Color Picker?
    }

  },
  updated: function () {
    this.setContainerPosition(this.$store.state.events.colorPicker.event);
    if (this.$store.state.events.colorPicker.arg.pickerType === "tag-color") {
      this.oldColor = this.$store.state.events.colorPicker.arg.tagColor;
      this.itemId = this.$store.state.events.colorPicker.arg.tagName;
    }
  },
  props: {
  },
}

</script>

<style scoped>
.myColorPicker {
  display: inline-block;
}
div.color-picker-overlay {
  z-index: 902;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
}
.container {
  position: absolute;
  min-width: 150px;
  max-width: 252px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  cursor: pointer;
  flex-direction: column;
  z-index: 903;
  padding: 0;
}
div.button {
  width: 100%;
}
div.save {
  background-color: var(--light-background-color);
  border-radius: 5px 5px 0px 0px;
}
div.save:hover {
  background-color: var(--main-accent-color);
}
div.close {
  background-color: var(--light-background-color);
  border-radius: 0px 0px 5px 5px;
}
div.close:hover {
  background-color: rgb(175, 35, 35);
}

</style>