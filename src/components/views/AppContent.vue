<template>
  <div
    id="app-content"
    :class="[this.$store.state.events.sidebar.active ? '' : 'collapse-side-bar']"
  >
    <div id="app-main" @dragover.prevent @drop="drop($event)">
      <router-view ref="canvas" />
      <div class="edit-layouts canvas-info">
        <h1>You don't have an active layout.</h1>
        <div class="button" @click.stop="layoutsMenu">Edit Layouts</div>
      </div>
      <div class="add-link canvas-info">
        <h1>You don't have any links in this layout.</h1>
        <h1>You can right click on links to add them here!</h1>
        <h1>Drag a link to this layout to add it here!</h1>
        <div class="button" @click.stop="addLink">Add Link</div>
      </div>
    </div>
    <div id="side-bar" ref="sideBar">
      <Links />
    </div>
  </div>
</template>

<script>
import Links from "@/components/core/Links.vue";

export default {
  components: {
    Links,
  },
  props: {
    popupVisible: Boolean,
  },
  methods: {
    layoutsMenu: function () {
      this.$store.commit("showPopup", {
        type: "layout-list",
      });
    },
    addLink: function () {
      this.$store.commit("showPopup", {
        type: "add-link",
      });
    },
    drop: function (e) {
      e.preventDefault();
      const linkId = e.dataTransfer.getData("id");
      const activeLayout = this.$store.getters.activeLayout()
      if (activeLayout && linkId){
        this.$store.commit("assignLayout", {linkId, layoutId: activeLayout.id})
      }
    },
  },
  mounted() {
    this.$refs.sideBar.addEventListener("transitionend", () => {
      this.$refs.canvas.updateGrid?.();
    });
  },
};
</script>

<style>
#app-content {
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
  background-color: var(--background-color);
  border-top-left-radius: 10px;
}

#app-main {
  flex-grow: 1;
  border-top-left-radius: 15px;
  background: var(--background-color);
  overflow: auto;
  position: relative;
}

#side-bar {
  min-width: 250px;
  width: 0;
  background-color: var(--background-accent);
  transition: min-width ease-in 100ms;
}
div.collapse-side-bar #side-bar {
  min-width: 0;
}

.canvas-info {
  width: 100%;
  height: 100%;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.canvas-info h1 {
  font-size: 1.5rem;
  padding: 0 50px;
  opacity: 0.2;
  text-align: center;
  margin-top: 10px;
}
.canvas-info .button {
  padding: 10px 30px;
  margin: 15px;
  background-color: var(--background-accent);
  opacity: 0.7;
}
.canvas-info .button:hover {
  opacity: 1;
}
.canvas-info .button:active {
  background-color: var(--background-active);
}
.edit-layouts {
  display: none;
}
#app-main.no-active-layout .vue-grid-layout~.edit-layouts {
  display: flex;
}
.add-link {
  display: none;
}
.add-link h1 {
  font-size: 1.3rem;
}
#app-main.no-active-link:not(.no-active-layout) .vue-grid-layout~.add-link {
  display: flex;
}
</style>
