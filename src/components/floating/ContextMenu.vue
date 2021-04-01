<template>
  <floating :event="event" class="contextMenu" :class="linkType + ' ' + firedFrom()">
    <div
      v-for="(element, index) in menuItems"
      :key="index"
      @click.stop="element.click"
      :class="element.class"
    >
      {{ element.label }}
    </div>
  </floating>
</template>

<script>
import floating from "@/components/floating/Floating.vue";

export default {
  data() {
    return {
      event: this.$store.state.events.contextMenu.arg.event,
      linkType: this.$store.state.events.contextMenu.arg.element?.type || "",
      menuItems: this.$store.state.events.contextMenu.arg.content,
    };
  },
  methods: {
    firedFrom: function () {
      if (
        this.event.path.findIndex((div) => {
          return div.classList?.contains("vue-grid-layout");
        }) !== -1
      )
        return "canvas";
      if (
        this.event.path.findIndex((div) => {
          return div.hasAttribute?.("id", "side-bar");
        }) !== -1
      )
        return "side-bar";

      return "";
    },
  },
  components: {
    floating,
  },
};
</script>

<style scoped>
.contextMenu {
  min-width: 150px;
  max-width: 180px;
  background: var(--background-color);
  border-radius: 5px;
  border: 1px solid var(--background-active);
  cursor: pointer;
  flex-direction: column;
}
.contextMenu > div {
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid var(--background-accent);
}
.contextMenu > div:last-child {
  border-bottom: none;
}
.contextMenu > div:hover {
  background-color: var(--background-color);
  filter: brightness(130%);
}

.contextMenu > div.delete,
.contextMenu > div.remove {
  background-color: var(--alert-muted);
}
.contextMenu > div.open {
  background-color: var(--button-muted);
}

.contextMenu.url > div.open-in-explorer,
.contextMenu:not(.canvas) > div.remove,
.contextMenu.canvas > div.delete {
  display: none;
}
</style>
