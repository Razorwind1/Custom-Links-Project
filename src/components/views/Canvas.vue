<template>
<!-- 
    :max-rows="3"
    :margin="[20, 20]"
    :is-mirrored="true"
    :auto-size="true"
    :use-css-transforms="false"
    :breakpoints="false"
    :cols="false"
 -->
  <grid-layout
    :layout.sync="layout"
    :col-num="canvas.colNum"
    :row-height="link.h"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :prevent-collision="true"
    :responsive="false"
    :use-style-cursor="false"
    :style="{ minWidth: link.w * canvas.colNum + 'px', height: '100%' }"
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
        >
          
          <div class="assignedTagsIcon">
            <img src="/assets/svg/freepik/svg/dh/label-tag.svg" alt="Assigned Tags Icon" @click.stop="assignedTagsMenu($event, element)">
          </div>

          <div class="editIcon">
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
      link: {
        w: 100,
        h: 100
      },
      canvas: {
        colNum: 6,
      },
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
  display: none;
}
.vue-grid-item:hover .editIcon{
  display: flex;
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
  display: none;
}
.vue-grid-item:hover .assignedTagsIcon{
  display: flex;
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
.vue-grid-layout{
  /* display: block; */
}
.vue-grid-item {
  cursor: pointer !important;
  transition: background-color 100ms ease-in-out;
  background-color: var(--link-color);
  border-radius: 5px;
  color: var(--link-text);
}
.vue-grid-item:hover {
  background-color: var(--link-hover);
}
</style>




 