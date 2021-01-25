<template>
  <floating :event="this.$store.state.events.colorPicker.event" class="colorPicker">
    <div @click="saveColor" class="button save">&check;</div>
    <div @click.stop>
      <v-color-picker
        class="myColorPicker"
        v-on:input="colorPickerColor"
        dot-size="40"
        mode="hexa"
        v-bind:dark="darkThemeActive()"
        v-bind:value="oldColor"
        width="250"
        canvas-height="100"
      ></v-color-picker>
    </div>
    <div class="button close" @click="closeColorPicker()">&#9932;</div>
  </floating>
</template>

<script>
import floating from "@/components/floating/Floating.vue";

export default {
  data: function () {
    return {
      oldColor: this.$store.state.events.colorPicker.arg.tagColor,
      itemID: this.$store.state.events.colorPicker.arg.tagID,
      selectedColor: "",
    };
  },
  components: {
    floating,
  },
  methods: {
    closeColorPicker: function () {
      this.$store.commit("closeColorPicker");
    },
    saveColor: function () {
      this.$store.commit("editTagColor", {
        tagID: this.itemID,
        newColor: this.selectedColor,
      });
      this.$store.commit("closeColorPicker");
    },
    colorPickerColor: function (arg) {
      this.selectedColor = arg;
    },
    darkThemeActive() {
      return this.$store.state.theme === "dark" ? true : false;
    },
  },
  updated: function () {
    this.oldColor = this.$store.state.events.colorPicker.arg.tagColor;
    this.itemID = this.$store.state.events.colorPicker.arg.tagID;
  },
};
</script>

<style scoped>
.myColorPicker {
  display: inline-block;
}
.colorPicker {
  min-width: 150px;
  max-width: 252px;
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  cursor: pointer;
  flex-direction: column;
  z-index: 903;
  padding: 0;
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
