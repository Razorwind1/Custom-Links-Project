<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <div class="popup-content">
        <AddLink
          v-if="popupArg.type === 'add-link'"
          :saveLink="saveButtonClicked"
          @save-fail="saveFail"
          @save-success="saveSuccess"
          @save-click="saveButtonClicked = true"
        />
        <TagList
          v-if="popupArg.type === 'tag-list'"
          :saveLink="saveButtonClicked"
          @save-fail="saveFail"
          @save-success="saveSuccess"
          @save-click="saveButtonClicked = true"
        />
      </div>
      <div class="popup-buttons">
        <div @click="closePopup" class="button">Cancel</div>
        <div @click="saveButtonClicked = true" class="button save" v-text="saveButtonLabel()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AddLink from "@/components/AddLink.vue";
import TagList from "@/components/TagList.vue";

export default {
  data: function () {
    return {
      saveButtonClicked: false,
    };
  },
  methods: {
    saveButtonLabel: function (){
      if (this.popupArg.type == 'tag-list')
        return "Save"
      if (this.popupArg.type == 'add-link')
        return "Add Link"

        return "Save"
    },
    closePopup: function () {
      this.$emit("close-popup");
    },
    saveFail: function () {
      this.saveButtonClicked = false;
    },
    saveSuccess: function () {
      this.closePopup();
    },
  },
  props: {
    popupArg: Object,
  },
  components: {
    AddLink,
    TagList
  },
};
</script>

<style scoped>
div.popup-overlay {
  z-index: 500;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000a;
  pointer-events: none;
  align-items: center;
  justify-content: center;
}
div.popup-container {
  background-color: var(--main-background-color);
  width: 400px;
  height: 80%;
  max-height: 500px;
  min-height: 300px;
  flex-direction: column;
  border-radius: 5px;
  pointer-events: all;
}
div.popup-content {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: inherit;
}
div.popup-buttons {
  height: 70px;
  width: 100%;
  background: var(--dark-background-color);
  border-radius: inherit;
  justify-content: space-between;
  padding: 10px;
}
div.popup-buttons > div {
  padding: 15px;
}
div.popup-buttons > div:hover {
  background-color: var(--light-background-color);
}
div.popup-buttons > div.button.save {
  background-color: var(--dark-accent-color);
}
div.popup-buttons > div.button.save:hover {
  background-color: var(--main-accent-color);
}
</style>