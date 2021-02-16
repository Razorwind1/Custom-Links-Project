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
    :margin="[canvas.margin, canvas.margin]"
    :row-height="link.h"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :prevent-collision="true"
    :responsive="false"
    :use-style-cursor="false"
    :style="{ minWidth: (link.w + canvas.margin) * canvas.colNum + 'px', height: '100%' }"
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
          :style="getStyling(element.style)"
          @click="open(element.address, element.type)"
          @contextmenu.stop="contextMenuLink($event, element)"
        >
          <div class="assignedTagsIcon">
            <img
              src="/assets/svg/freepik/svg/dh/label-tag.svg"
              alt="Assigned Tags Icon"
              @click.stop="assignedTagsMenu($event, element)"
            />
          </div>

          <div class="editIcon">
            <img
              src="\assets\icons\edit_white.png"
              alt="Edit Icon"
              @click.stop="contextMenuLink($event, element)"
            />
          </div>
          <div class="img-container">
            <img v-bind:src="getLinkImg(element.id, element.img)" />
          </div>
          <label class="label text-overflow">{{ element.label }}</label>
        </div>
      </grid-item>
    </div>
  </grid-layout>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import getLinkImg from "@/js/img/getLinkImg.js";
import openLink from "@/js/link/open.js";
import contextMenuLinkFunc from "@/js/link/contextMenu.js";

export default {
  data() {
    return {
      layout: [],
      link: {
        w: 100,
        h: 100,
      },
      canvas: {
        colNum: 6,
        margin: 10,
      },
      movingElement: null,
      containerWidth: 0,
    };
  },
  computed: {
    maxLinkX: function () {
      return Math.max(...this.layout.map((el) => el.x + el.w));
    },
    maxCanvasX: function () {
      return Math.floor(this.containerWidth / (this.link.w + this.canvas.margin));
    },
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  methods: {
    updateGrid: function () {
      const layoutActive = this.$store.state.layouts.find(
        (layout) => layout.active === true
      );
      this.layout = [];

      if (layoutActive)
        layoutActive.items.forEach((element) => {
          const link = this.$store.getters.linkFromId(element.id);
          this.layout.push({
            id: element.id,
            x: element.pos.x,
            y: element.pos.y,
            w: element.pos.sizeX,
            h: element.pos.sizeY,
            i: element.id,
            img: link.content.img,
            style: link.style,
            label: link.content.label,
            address: link.content.address,
            type: link.type,
          });
        });
    },
    updateGridSize: function () {
      if (this.containerWidth) {
        if (this.maxCanvasX >= this.canvas.colNum) {
          this.canvas.colNum = this.maxCanvasX;
        }

        if (this.maxCanvasX <= this.canvas.colNum) {
          if (this.maxCanvasX > this.maxLinkX) this.canvas.colNum = this.maxCanvasX;
          else this.canvas.colNum = this.maxLinkX;
        }
      }
    },
    open: function (element_address, element_type) {
      if (this.movingElement !== null) {
        this.movingElement = null;
        return;
      }
      openLink(element_address, element_type).bind(this);
    },
    contextMenuLink: function ($event, element) {
      contextMenuLinkFunc.bind(this)($event, element);
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
    getLinkImg,

    getStyling: function (styleName) {
      const styleObject = this.$store.getters.styleFromName(styleName);
      if (styleObject[0])
        return { ...styleObject[0], marginBottom: this.canvas.margin + "px" };
      else return { marginBottom: this.canvas.margin + "px" };
    },
    moveEvent: function (i) {
      this.movingElement = i;
    },
    movedEvent: function (id, newX, newY) {
      this.$store.commit("setLinkPosition", { id, newX, newY });
      this.updateGrid();
      this.updateContainerWidth();
    },
    resizedEvent: function (id, newH, newW) {
      this.$store.commit("setLinkSize", { id, newH, newW });
      this.updateGrid();
      this.updateContainerWidth();
    },
    updateContainerWidth: function () {
      this.$store.commit("toggleSidebar", {resizing: true})
      if (this.$el && this.$el.parentNode)
        this.containerWidth = this.$el.parentNode.offsetWidth;
      this.updateGridSize();
    },
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
        this.$store.commit("showPopup", {
          type: "add-link",
        });
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));

    this._mouseMove = function (e) {
      if (e.buttons !== 1) {
        this.movingElement = null;
      }
    };
    document.addEventListener("mousemove", this._mouseMove.bind(this));

    this.updateContainerWidth();
    window.addEventListener("resize", this.updateContainerWidth);
  },
  beforeDestroy: function () {
    this.unsubscribe();
    document.removeEventListener("keydown", this._keyListener);
    document.removeEventListener("mousemove", this._mouseMove);
    window.removeEventListener("resize", this.updateContainerWidth);
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
.vue-grid-item:hover .editIcon {
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
.vue-grid-item:hover .assignedTagsIcon {
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
  cursor: pointer;
}
.vue-grid-layout {
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
