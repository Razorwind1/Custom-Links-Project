<template>

<div class="color-picker-overlay" @click="closeColorPicker">
  <div class="container" :style="containerPosition" ref="container"><span>hello all</span>
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
  <div class="color-picker-buttons">
        <div @click="closeColorPicker" class="button">Cancel</div>
        <div @click="saveColor" class="button save">Confirm Color</div>
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
      }
    };
  },
  methods: {
    closeColorPicker: function () {
      this.$store.commit("closeColorPicker");
    },
    saveColor: function () {
      console.log(this.itemId + this.selectedColor);
      this.$store.commit('editTagColor', {
        tagName: this.itemId,
        newColor: this.selectedColor});
      this.$emit("close-color-picker");
    },
    colorPickerColor: function (arg) {
      this.selectedColor = arg;
    },
    setContainerPosition(event) {
      console.log("setContainerPosition (ColorPicker.vue): "+ event)
      if (event !== null) {
        console.log("IF: setContainerPosition (ColorPicker.vue): "+ event)
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
    console.log("MOUNTED: ColorPicker.vue component mounted (ColorPicker.vue): " + this.$store.state.events.colorPicker.event);
    this.setContainerPosition(this.$store.state.events.colorPicker.event);
    if (this.ColorPickerArg.type === "tag-color") {
      this.oldColor = this.ColorPickerArg.tagColor;
      this.itemId = this.ColorPickerArg.tagName;
      console.log(this.oldColor + " " + this.itemId);

    // Enter Key to Submit Color Picker?
      // input.addEventListener("keyup", ({ key }) => {
      //   key === "Enter" ? this.$store.commit('editTagColor', {
      //   tagName: this.tagLabel,
      //   newColor: this.selectedColor}): "";
      // this.$emit("close-color-picker"); 
      // });
    }

  },
  updated: function () {
    console.log("UPDATED: ColorPicker.vue component mounted (ColorPicker.vue): " + this.$store.state.events.colorPicker.event);
    this.setContainerPosition(this.$store.state.events.colorPicker.event);
  },
  props: {
    ColorPickerArg: Object,
    oldColor: String,
    itemId: undefined
  },
  components: {
  },
}

</script>

<style scoped>
.myColorPicker {
  display: inline-block;
}
.container {
  position: absolute;
  min-width: 150px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  cursor: pointer;
  flex-direction: column;
  z-index: 903;
}
.container > div {
  border-radius: 5px;
  padding: 10px;
  width: 100%;
}
.container > div:hover {
  background: var(--light-background-color);
}
div.color-picker-overlay {
  z-index: 902;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
}

div.colorPickerContainer {
  z-index: 903;
  flex-direction: column;
  max-height: 400px;
  min-height: 300px;
  background-color:var(--main-background-color);
  border-radius: 5px;
  /* background-color: var(--main-background-color);
  width: 400px;
  height: 80%;
  pointer-events: all; */
}
div.title {
  margin: 0 auto;
}
div.popup-content {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: inherit;
}
div.color-picker-buttons {
  height: 70px;
  width: 100%;
  background: var(--dark-background-color);
  justify-content: space-between;
  padding: 10px;
}
div.color-picker-buttons > div {
  padding: 15px;
}
div.color-picker-buttons > div:hover {
  background-color: var(--light-background-color);
}
div.color-picker-buttons > div.button.save {
  background-color: var(--dark-accent-color);
}
div.color-picker-buttons > div.button.save:hover {
  background-color: var(--main-accent-color);
}
</style>