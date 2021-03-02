<template>
  <popup>
    <div class="popup-content" @click.stop="discardChanges">
      <div class="content">
        <h2>Layouts</h2>
        <div
          v-for="layout in this.$store.state.layouts"
          :key="layout.id"
          class="layout"
          :class="{ active: layout.active, editing: layout.id === editingLayout }"
          @click.stop="selectLayout(layout)"
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
          <div
            class="discard"
            :class="{ hidden: layout.id !== editingLayout }"
            @click.stop="discardChanges"
          >
            <discardSvg />
          </div>
          <div
            class="save"
            :class="{ hidden: layout.id !== editingLayout }"
            @click.stop="saveChanges"
          >
            <checkmarkSvg />
          </div>
          <div
            class="trash"
            :class="{ hidden: layout.id !== editingLayout }"
            @click.stop="deleteLayout(layout.id)"
          >
            <trashSvg />
          </div>
          <div
            class="favourite"
            :class="{ hidden: layout.id === editingLayout }"
            @click.stop="toggleFavourite(layout.id)"
          >
            <heartSvg v-if="layout.favourite" />
            <heartEmptySvg v-if="!layout.favourite" />
          </div>
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
// import validateInputs from "@/js/helper/validation.js";
import popup from "@/components/popup/Popup.vue";
import gearSvg from "@/components/icons/gear.vue";
import discardSvg from "@/components/icons/close-round.vue";
import trashSvg from "@/components/icons/trash.vue";
import heartEmptySvg from "@/components/icons/heart-empty.vue";
import heartSvg from "@/components/icons/heart.vue";
import checkmarkSvg from "@/components/icons/checkmark.vue";

export default {
  data: function () {
    return {
      popupArg: this.$store.state.events.popup.arg,
      editingLayout: null,
      name: null,
      color: null,
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
      if (layout.id !== this.editingLayout) {
        this.discardChanges();
      }
      if (layout.id !== this.editingLayout && !layout.active) this.$store.commit("activateLayout", layout.id);
    },
    editLayout: function (id) {
      this.editingLayout = id;
      const input = this.$refs[id][0];
      this.$nextTick(() => {
        input.select();
      });
    },
    deleteLayout: function (id) {
      this.$store.commit("showAlert", {
        type: "delete-layout",
        id: id,
      });
    },
    colorSelected: function ({ target }) {
      this.color = target.value;
    },
    setLayoutName: function ({ target }) {
      this.name = target.value;
    },
    layoutInputKeyUp: function (e) {
      if (e.key === "Enter") this.saveChanges();
      if (e.key === "Escape") this.discardChanges();
    },
    discardChanges: function () {
      this.editingLayout = null;
      this.name = null;
      this.color = null;
    },
    saveChanges: function () {
      this.$store.commit("editLayout", {
        color: this.color,
        name: this.name,
        id: this.editingLayout,
      });
      this.editingLayout = null;
      this.name = null;
      this.color = null;
    },
  },
  mounted: function () {},
  components: {
    popup,
    gearSvg,
    discardSvg,
    trashSvg,
    heartEmptySvg,
    heartSvg,
    checkmarkSvg,
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

.popup-content div.content h2 {
  width: 100%;
  text-align: center;
  font-size: 30px;
  padding: 10px;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
}

.popup-content div.content .layout {
  position: relative;
  max-height: 50px;
  height: 50px;
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
  grid-template-areas: "button-trash name button-color button-edit";
}
.popup-content div.content .layout:hover {
  background-color: var(--background-muted);
  transform: scale(1.02);
}
.popup-content div.content .layout.active {
  background-color: var(--background-active);
  transform: scale(1.01);
}
.popup-content div.content .layout input.name {
  grid-area: name;
  width: 100%;
  font-size: 26px;
  padding: 0 10px;
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

.popup-content div.content .edit {
  fill: var(--button-color);
  grid-area: button-edit;
}
.popup-content div.content .favourite {
  fill: var(--alert-hover);
  grid-area: fav;
}
.popup-content div.content .trash {
  fill: var(--alert-hover);
  grid-area: button-trash;
}
.popup-content div.content .discard {
  fill: var(--alert-hover);
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-30%) translateY(-30%);
}
.popup-content div.content .save {
  fill: var(--button-color);
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(30%) translateY(-30%);
}
.popup-content div.content .layout svg {
  min-width: 25px;
  transition: transform 50ms ease-out;
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
</style>
