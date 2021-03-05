<template>
  <floating :event="this.$store.state.events.colorPicker.event" class="colorPicker">
    <div @click="saveColor" class="button save">&check;</div>
    <div @click.stop>
      <input
        type="color"
        :value="oldColor"
        @change="colorPickerColor"
      />
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
      this.$store.commit("editTag", {
        tagID: this.itemID,
        newColor: this.selectedColor,
      });
      this.$store.commit("closeColorPicker");
    },
    colorPickerColor: function (e) {
      this.selectedColor = e.target.value;
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
  border: 1px solid var(--background-accent);
  cursor: pointer;
  flex-direction: column;
  z-index: 903;
  padding: 0;
}
div.save {
  background-color: var(--background-color);
  color: var(--background-text);
  border-radius: 5px 5px 0px 0px;
}
div.save:hover {
  background-color: var(--accent-color);
}
div.close {
  background-color: var(--background-color);
  color: var(--background-text);
  border-radius: 0px 0px 5px 5px;
}
div.close:hover {
  background-color: var(--alert-hover);
  color: var(--alert-text);
}
</style>
