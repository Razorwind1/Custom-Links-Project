<template>
<div class="color-picker-overlay" @click="closeColorPicker">
<div class="colorPickerContainer" @click.stop="">
  <div class="title" v-text="myText">Hi</div>
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
      saveButtonClicked: false,
      myText: "#Who are you?",
      oldColor: "#444444",
      tagLabel: "the default tag label",
      selectedColor: "111111"
    };
  },
  methods: {
    closeColorPicker: function () {
      this.$emit("close-color-picker");
    },
    saveFail: function () {
      this.saveButtonClicked = false;
    },
    saveColor: function () {
      console.log(this.tagLabel + this.selectedColor);
      this.$store.commit('editTag', {
        tagName: this.tagLabel,
        newColor: this.selectedColor});
      this.$emit("close-color-picker");
    },
    colorPickerColor: function (arg) {
      this.selectedColor = arg;
    }
  },
  mounted: function () {
    this.myText = "What is life, really?";
    if (this.ColorPickerArg.type === "tag-color") {
      this.myText = "Tag Color";
      this.oldColor = this.ColorPickerArg.oldColor;
      this.tagLabel = this.ColorPickerArg.id;
      console.log(this.oldColor + " " + this.tagLabel);
    }

    const inputs = document.querySelectorAll("input");
    if (inputs[0]) inputs[0].focus();

    // Enter Key to Submit The Form
    inputs.forEach((input) =>
      input.addEventListener("keyup", ({ key }) => {
        key === "Enter" ? this.$emit("save-click") : "";
      })
    );
  },
  props: {
    ColorPickerArg: Object,
    mytext: String
  },
  components: {
  },
};

</script>

<style scoped>
.myColorPicker {
  display: inline-block;
}

div.color-picker-overlay {
  z-index: 899;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
}

div.colorPickerContainer {
  z-index: 901;
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