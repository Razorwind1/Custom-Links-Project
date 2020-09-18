<template>
  <div class="popup-overlay">
    <div class="popup-container">
      <div class="popup-content">{{popupArg.type}}</div>
      <div class="popup-buttons">
        <div @click="closePopup" class="button">Cancel</div>
        <div @click="closePopup" class="button save">{{popupArg.saveButtonLabel}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup: function () {
      this.$emit("close-popup");
    },
  },
  props: {
    popupArg: Object,
  },
};
</script>

<style scoped>
div.popup-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000a;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
div.popup-container {
  background-color: var(--main-background-color);
  width: 400px;
  height: 80%;
  max-height: 500px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  pointer-events: all;
}
div.popup-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
div.popup-buttons {
  height: 70px;
  width: 100%;
  background: var(--dark-background-color);
  border-radius: inherit;
  display: flex;
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