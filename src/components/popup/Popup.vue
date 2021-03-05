<template>
  <div class="popup-overlay">
    <div class="popup-container">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
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
  background-color: var(--background-color);
  width: 400px;
  height: 80%;
  max-height: 500px;
  min-height: 300px;
  flex-direction: column;
  border-radius: 5px;
  pointer-events: all;
}

.popup-content {
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: inherit;
}

.popup-content div.header {
  margin: 5px 0 10px 0;
  padding: 5px 0 15px 0;
  border-bottom: 2px solid var(--line-color);
  align-items: center;
  justify-content: center;
  width: 100%;
}

div.popup-buttons {
  height: 70px;
  width: 100%;
  background: var(--background-accent);
  border-radius: inherit;
  justify-content: space-between;
  padding: 10px;
}
div.popup-buttons > div {
  padding: 15px;
}
div.popup-buttons > div:hover {
  background-color: var(--background-hover);
}
div.popup-buttons > div:active {
  background-color: var(--background-active);
}
div.popup-buttons > div.button.save {
  background-color: var(--button-color);
  color: var(--button-text);
}
div.popup-buttons > div.button.save:hover {
  background-color: var(--button-hover);
}
div.popup-buttons > div.button.save:active {
  background-color: var(--button-accent);
}
</style>