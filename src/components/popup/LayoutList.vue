<template>
  <popup>
    <div class="popup-content" @click.stop="reset">
      <div class="content">
        <h2>Layouts</h2>
        <div
          v-for="layout in this.$store.state.layouts"
          :key="layout.id"
          class="layout"
          :class="{ active: layout.active, editing: layout.id === editingLayout }"
          @click="selectLayout(layout)"
        >
          <input
            class="name text-overflow"
            :value="layout.name"
            :ref="layout.id"
            :disabled="layout.id !== editingLayout"
            @change="setLayoutName"
            @click.stop
            @keyup="layoutInputKeyUp"
          />
          <input
            type="color"
            :value="layout.color"
            @change="colorSelected"
            :class="{ hidden: layout.id !== editingLayout }"
            @click.stop
          />
          <div
            class="edit"
            @click.stop="editLayout(layout.id)"
            :class="{ hidden: layout.id === editingLayout }"
          >
            <gearSvg />
          </div>
          <div class="edit" :class="{ hidden: layout.id !== editingLayout }">
            <saveSvg />
          </div>
          <div
            class="remove"
            :class="{ hidden: layout.id !== editingLayout }"
            @click.stop="deleteLayout(layout.id)"
          >
            <removeSvg />
          </div>
          <img
            class="favourite"
            src="/assets/svg/freepik/png/021-favourite (3).png"
            :class="{ hidden: !layout.favourite }"
            @click.stop="toggleFavourite(layout.id)"
          />
          <img
            class="favourite"
            src="/assets/svg/freepik/png/021-favourite-white.png"
            :class="{ hidden: layout.favourite }"
            @click.stop="toggleFavourite(layout.id)"
          />
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
// import validateInputs from "@/js/helper/validation.js";
import popup from "@/components/popup/Popup.vue";
import gearSvg from "@/components/icons/gear.vue";
import saveSvg from "@/components/icons/save.vue";
import removeSvg from "@/components/icons/remove.vue";

export default {
  data: function () {
    return {
      popupArg: this.$store.state.events.popup.arg,
      editingLayout: null,
    };
  },
  methods: {
    closePopup: function () {
      this.$store.commit("closePopup");
    },
    toggleFavourite: function (id) {
      this.$store.commit("toggleFavouriteLayout", id);
    },
    selectLayout: function (layout) {
      if (layout.active || layout.id === this.editingLayout) return;
      this.$store.commit("activateLayout", layout.id);
      this.editingLayout = null;
    },
    editLayout: function (id) {
      this.editingLayout = id;
      const input = this.$refs[id][0];
      this.$nextTick(() => {
        input.select();
      });
    },
    deleteLayout: function (id) {
      this.$store.commit("deleteLayout", id);
    },
    reset: function () {
      this.editingLayout = null;
    },
    colorSelected: function ({ target }) {
      this.$store.commit("editLayout", { color: target.value, id: this.editingLayout });
    },
    setLayoutName: function ({ target }) {
      this.$store.commit("editLayout", { name: target.value, id: this.editingLayout });
    },
    layoutInputKeyUp: function (e) {
      if (e.key === "Enter") this.editingLayout = null;
    },
  },
  mounted: function () {},
  components: {
    popup,
    gearSvg,
    saveSvg,
    removeSvg,
  },
};
</script>

<style scoped>
.popup-content {
  padding: 0;
}
.popup-content div.content {
  height: 100%;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  overflow-y: auto;
}

.popup-content div.content h2{
  width: 100%;
  text-align: center;
  font-size: 30px;
  padding: 10px;
  border-bottom: 1px solid black;
  margin-bottom : 5px;
}

.popup-content div.content .layout {
  position: relative;
  max-height: 80px;
  height: 80px;
  margin: 5px;
  padding: 10px 20px;
  background-color: var(--background-accent);
  border-radius: 10px;
  display: grid;
  place-items: center;
  grid-template-columns: 40px auto 40px 40px;
  grid-template-rows: auto;
  grid-template-areas: "fav name name button-edit";
  cursor: pointer;
  transition: background-color 200ms, transform 200ms;
}
.popup-content div.content .layout.editing {
  grid-template-columns: 40px auto 40px 40px;
  grid-template-areas: "fav name button-color button-edit";
}
.popup-content div.content .layout:hover {
  background-color: var(--background-muted);
  transform: scale(1.02);
}
.popup-content div.content .layout.active {
  background-color: var(--background-active);
  transform: scale(1.01);
}
.popup-content div.content .layout img.favourite {
  grid-area: fav;
}
.popup-content div.content .layout input.name {
  grid-area: name;
  width: 100%;
  font-size: 26px;
  padding-right: 10px;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  background-color: transparent;
}
.popup-content div.content .layout input.name[disabled] {
  pointer-events: none;
  border: none;
}
.popup-content div.content .layout input.name[disabled]::selection {
  background-color: transparent;
  user-select: none;
}

.popup-content div.content .layout .edit,
.popup-content div.content .layout .remove {
  display: flex;
  place-items: center;
}
.popup-content div.content .edit {
  fill: var(--button-color);
  grid-area: button-edit;
}
.popup-content div.content .remove {
  fill: var(--alert-hover);
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(-30%);
}
.popup-content div.content .layout svg {
  min-width: 25px;
  transition: transform 150ms ease-out;
}
.popup-content div.content .layout svg:hover {
  transform: scale(1.25);
}
.popup-content div.content .layout svg:active {
  transform: scale(0.9);
}

.popup-content div.content .layout input[type="color"] {
  padding: 0;
  margin: 0;
  border: none;
  width: 23px;
  height: 25px;
  cursor: pointer;
  grid-area: button-color;
}
.popup-content div.content .layout input[type="color"]:hover {
  border: 1px solid var(--button-hover);
}

.popup-content div.content .layout img {
  width: 25px;
  height: 25px;
  transition: transform 150ms ease-out;
}
.popup-content div.content .layout img:hover {
  transform: scale(1.3);
}
</style>
