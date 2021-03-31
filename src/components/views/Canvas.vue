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
    :row-height="canvas.size"
    :is-draggable="true"
    :is-resizable="true"
    :vertical-compact="false"
    :prevent-collision="true"
    :responsive="false"
    :use-style-cursor="false"
    :style="{
      minWidth: (canvas.size + canvas.margin) * canvas.colNum + 'px',
      height: '100%',
    }"
  >
    <div
      @contextmenu.stop="contextMenuCanvas($event)"
      :style="{ width: '100%', height: '100%' }"
      @mousemove="mousemove"
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
          @click="open(element.id)"
          @contextmenu.stop="contextMenuLink($event, element.id)"
        >
          <div class="assignedTagsIcon icons" @click.stop="assignedTagsMenu($event, element)">
            <tagSvg />
          </div>

          <div class="editIcon icons" @click.stop="contextMenuLink($event, element.id)">
            <editSvg />
          </div>

          <!-- <div class="removeIcon icons" @click.stop="removeFromLayout(element.id, element.layoutId)">
            <deleteSvg />
          </div> -->
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
import contextMenuLink from "@/js/link/contextMenu.js";
// import deleteSvg from "@/components/icons/delete.vue";
import editSvg from "@/components/icons/hamburger.vue";
import tagSvg from "@/components/icons/tag.vue";


export default {
  data() {
    return {
      layout: [],
      canvas: {
        size: 100,
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
      return Math.floor(this.containerWidth / (this.canvas.size + this.canvas.margin));
    },
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    tagSvg,
    editSvg,
    // deleteSvg
  },
  methods: {
    updateGrid: function (updateSize) {
      const layoutActive = this.$store.state.layouts.find(
        (layout) => layout.active === true
      );
      this.layout = [];

      if (layoutActive) {
        this.$el.parentNode.classList.remove("no-active-layout");

        if (layoutActive.items.length === 0)
          this.$el.parentNode.classList.add("no-active-link");
        else this.$el.parentNode.classList.remove("no-active-link");

        if (updateSize === true)
          this.$store.commit("editLayout", {
            id: layoutActive.id,
            size: this.canvas.size,
          });
        else {
          this.canvas.size = layoutActive.size || 100;
          this.canvas.margin = this.canvas.size / 10;
        }

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
          });
        });
      } else {
        this.$el.parentNode.classList.add("no-active-layout");
      }

      this.updateGridSize();
    },
    updateGridSize: function () {
      if (this.$el && this.$el.parentNode)
        this.containerWidth = this.$el.parentNode.offsetWidth;

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
    open: function (elementId) {
      if (this.movingElement !== null) {
        this.movingElement = null;
        return;
      }
      openLink.bind(this)(elementId);
    },
    contextMenuLink: function ($event, elementId) {
      contextMenuLink.bind(this)($event, elementId);
    },
    contextMenuCanvas: function (event) {
      this.$store.commit("showContextMenu", {
        content: [
          {
            label: "Open All",
            click: () => {
              this.$store.commit("closeContextMenu");
              this.layout.forEach((element) => {
                this.open(element.id);
              });
            },
          },
          {
            label: "Add Link",
            click: () => {
              this.$store.commit("closeContextMenu");
              this.$store.commit("showPopup", {
                type: "add-link",
              });
            },
          },
          {
            label: "Zoom In",
            click: () => {
              this.$store.commit("closeContextMenu");
              this.increaseGridSize()
            },
          },
          {
            label: "Zoom Out",
            click: () => {
              this.$store.commit("closeContextMenu");
              this.decreaseGridSize()
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
    },
    resizedEvent: function (id, newH, newW) {
      this.$store.commit("setLinkSize", { id, newH, newW });
    },
    assignedTagsMenu: function (event, element) {
      this.$store.commit("showAssignedTagsMenu", {
        element,
        event,
      });
    },
    mousemove: function (e) {
      if (e.buttons !== 1) {
        this.movingElement = null;
      }
    },
    increaseGridSize: function () {
      this.canvas.size += 5;
      if (this.canvas.size > 200) {
        this.canvas.size = 200;
        return;
      }
      this.updateGrid(true);
    },
    decreaseGridSize: function () {
      this.canvas.size -= 5;
      if (this.canvas.size < 25) {
        this.canvas.size = 25;
        return;
      }
      this.updateGrid(true);
    },
  },
  mounted: function () {
    this.updateGrid();
  },
};
</script>

<style scoped>
#canvas {
  width: 100%;
  display: block;
}
.icons{
  position: absolute;
  display: none;
  width: 15px;
}
.vue-grid-item:hover .icons {
  display: flex;
}
.icons svg {
  width: 100%;
}
.icons svg:hover {
  filter: brightness(150%);
  transition: filter 0.1s ease-in-out;
}
.editIcon {
  right: 5px;
  top: 5px;
  fill: var(--background-text);
}
.assignedTagsIcon {
  width: 17px;
  left: 5px;
  top: 5px;
  fill: var(--button-hover);
}
.removeIcon {
  right: 5px;
  top: 5px;
  fill: var(--alert-hover)
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
