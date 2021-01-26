<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="6"
    :max-rows="3"
    :row-height="100"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :prevent-collision="true"
    :responsive="false"
    :style="{ width: '100%', height: '100%' }"
    :use-style-cursor="false"
  >
    <div
      @contextmenu.stop="contextMenuCanvas($event)"
      :style="{ width: '100%', height: '100%' }"
    >
      <grid-item
        v-for="element in layout"
        :x="element.x"
        :y="element.y"
        :w="element.w"
        :h="element.h"
        :i="element.i"
        :key="element.i"
        @move="moveEvent"
        @resized="resizedEvent"
        @moved="movedEvent"
      >
        <div
          class="link"
          v-bind:style="getStyling(element.style)"
          @click="open(element.address)"
          @contextmenu.stop="contextMenuLink($event, element)"
          @mouseover="linkHovered(element.id)"
          @mouseleave="linkUnHovered"
        >
          
          <div class="assignedTagsIcon" v-show="$store.state.events.linkHovered.arg==element.id">
            <img src="/assets/svg/freepik/svg/dh/label-tag.svg" alt="Assigned Tags Icon" @click.stop="assignedTagsMenu($event, element)">
          </div>

          <div class="editIcon" v-show="$store.state.events.linkHovered.arg==element.id">
            <img src="\assets\icons\edit_white.png" alt="Edit Icon" @click.stop="contextMenuLink($event, element)"
            >
          </div>
          <div class="img-container">
            <img v-bind:src="getElementImg(element.id, element.img)" />
          </div>
          <label class="label">{{ element.label }}</label>
        </div>
      </grid-item>
    </div>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import imgUrlFromBuffer from "@/js/img/imgUrlFromBuffer.js";

export default {
  data() {
    return {
      layout: [],
      movingElement: null,
    };
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  methods: {
    updateGrid: function () {
      const links = this.$store.state.links;
      this.layout = [];

      links.forEach((element) => {
        this.layout.push({
          id: element.id,
          x: element.pos.x,
          y: element.pos.y,
          w: element.pos.sizeX,
          h: element.pos.sizeY,
          i: element.id,
          img: element.content.img,
          style: element.style,
          label: element.content.label,
          address: element.content.address,
        });
      });
    },
    open: function (element_address) {
      
      if (this.movingElement !== null) {
        this.movingElement = null;
        return;
      }
        window.ipcRenderer.send("open", element_address);
    },
    contextMenuLink: function (event, element) {
      this.$store.commit("showContextMenu", {
        content: [
          {
            label: "Edit Link",
            click: () => {
              this.editLink(element.id, element.img);
            },
          },
          {
            label: "Delete Link",
            click: () => {
              this.$store.commit("showAlert", {
                type: "delete-link",
                id: element.id,
              });
            },
          },
        ],
        event,
      });
    },
    contextMenuCanvas: function (event) {
      this.$store.commit("showContextMenu", {
        content: [
          {
            label: "Open All",
            click: () => {
              this.layout.forEach((element) => {
                this.open(element.address);
              });
            },
          },
          {
            label: "Add Link",
            click: () => {
              this.$store.commit("showPopup", {
                type: "add-link",
              });
            },
          },
        ],
        event,
      });
    },
    editLink: function (id, url) {
      this.$store.commit("showPopup", {
        type: "edit-link",
        linkID: id,
        imgUrl: url,
      });
    },
    addLink: function () {
      this.$store.commit("showPopup", {
        type: "add-link",
      });
    },
    getElementImg: function (id, url) {
      const imgBuffer = window.ipcRenderer.sendSync("get-image-buffer", {
        id,
        url,
      }).buffer;
      const imgUrl = imgUrlFromBuffer(imgBuffer);
      return imgUrl;
    },
    //returns a special vue "Style Object" from the store
    getStyling: function (styleName) {
      const styleObject = this.$store.getters.styleFromName(styleName);
      return styleObject;
    },
    moveEvent: function (i) {
      this.movingElement = i;
    },
    movedEvent: function (id, newX, newY) {
      this.$store.commit("setLinkPosition", { id, newX, newY });
    },
    resizedEvent: function (id, newH, newW) {
      this.$store.commit("setLinkSize", { id, newH, newW });
      this.updateGrid();
    },
    displayTagLabel: function (tagCircle) {
      console.log(tagCircle);
    },
    hideTaglabel: function (tagCircle) {
      console.log(tagCircle);
    },
    linkHovered: function (linkID) {
      this.$store.commit("linkHovered", linkID)
    },
    linkUnHovered: function () {
      this.$store.commit("linkUnHovered");
    },
    assignedTagsMenu: function(event, element) {
      this.$store.commit("showAssignedTagsMenu", {
        element,
        event
      });
    }
  },
  created: function () {
    this.updateGrid();

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (
        mutation.type === "addLink" ||
        mutation.type === "editLink" ||
        mutation.type === "deleteLink" ||
        mutation.type === "setState"
      ) {
        this.updateGrid();
      }
    });
  },
  mounted: function () {
    this._keyListener = function (e) {
      if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
        this.addLink();
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy: function () {
    this.unsubscribe();
    document.removeEventListener("keydown", this._keyListener);
  },
};
</script>

<style scoped>
#canvas {
  width: 100%;
  display: block;
}
.editIcon {
  position: absolute;
  right: 5px;
  top: 5px;
}
.editIcon img {
  width: 13px;
}
.editIcon img:hover {
  filter: brightness(85%);
  transition: filter 0.1s ease-in-out; 
}
.assignedTagsIcon {
  position: absolute;
  left: 5px;
  top: 5px;
}
.assignedTagsIcon img {
  width: 13px;
} 
.assignedTagsIcon img:hover {
  filter: brightness(85%);
  transition: filter 0.1s ease-in-out; 
}

.link {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 8px 8px 4px 8px;
}
.link .img-container {
  max-width: 100%;
  max-height: 75%;
  width: inherit;
  height: inherit;
  object-fit: contain;
  align-items: center;
  justify-content: center;
}
.link .img-container img {
  max-width: 100%;
  max-height: 100%;
}

.link .label {
  max-height: 20%;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.tagIndicator-dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
}
.tagIndicator-bar {
  color: transparent;
}
.tagIndicator-bar:hover {
  display: inline-block;
  position: absolute;
  top: 18px;
  height: 20px;
  min-width: 20px;
  border-radius: 5px;
  padding: 10px;
  padding-top: 0px;
  background-color: inherit;

  font-size: 13px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans";
  color: white;
}
.vue-grid-layout {
  overflow-y: auto;
}
.vue-grid-item {
  cursor: pointer !important;
  transition: background-color 100ms ease-in-out;
  background-color: var(--dark-background-color);
  border-radius: 5px;
}
.vue-grid-item:hover {
  background-color: var(--light-background-color);
}
</style>




 