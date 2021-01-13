<template>
  <div class="edit-link">
    <div class="header">
      <h2>{{ header() }}</h2>
    </div>
    <div class="content">
      <div class="section">
        <h3 required>Name</h3>
        <input type="text" v-model="label" required />
      </div>
      <div class="section">
        <div class="address-header">
          <h3>Address</h3>

          <div>
            <div
              class="button"
              :class="[this.type === 'url' ? 'active' : '']"
              @click="linkType('url')"
            >
              Web
            </div>
            <div
              class="button"
              :class="[this.type === 'folder' ? 'active' : '']"
              @click="linkType('folder')"
            >
              Folder
            </div>
            <div
              class="button"
              :class="[this.type === 'file' ? 'active' : '']"
              @click="linkType('file')"
            >
              File
            </div>
          </div>
        </div>
        <div class="address-input">
          <input
            type="text"
            v-model="address"
            :class="this.type === 'url' ? 'url' : ''"
            required
          />
          <div class="button" v-show="type !== 'url'" @click="selectFile">
            Open
          </div>
        </div>
      </div>
      <div class="section">
        <h3>Image</h3>
        <div class="img-selection">
          <div class="img-container">
            <img :src="imgSrc" @click="selectImage" />
          </div>
          <div class="img-selection-info">
            <input type="text" v-model="imgLabel" readonly disabled />
            <div class="button" @click="selectImage">Select Image</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validateInputs from "@/js/validation.js";
import imgUrlFromBuffer from "@/js/img/imgUrlFromBuffer.js";

export default {
  data: function () {
    return {
      popupActive: this.$store.state.events.popup.active,
      popupArg: this.$store.state.events.popup.arg,

      label: "",
      address: "",
      type: "url",

      imgSrc: null,

      imgBuffer: null,
      imgLabel: null,
    };
  },
  methods: {
    selectImage: function () {
      const image = window.ipcRenderer.sendSync("open-image-dialog");
      if (!image) return;

      this.imgSrc = imgUrlFromBuffer(image.buffer);

      this.imgLabel = image.src;
      this.imgBuffer = image.buffer;
    },
    selectFile: function () {
      const file = window.ipcRenderer.sendSync("open-file-dialog", {
        type: this.type,
      });
      if (!file) return;

      const nativeIconBuffer = window.ipcRenderer.sendSync(
        "get-native-icon",
        file
      );

      this.address = file;
      this.label = this.imgLabel = window.path.parse(file).name;
      this.imgSrc = imgUrlFromBuffer(nativeIconBuffer);
      this.imgBuffer = nativeIconBuffer;
    },
    getElementImg: function (id, url) {
      const image = window.ipcRenderer.sendSync("get-image-buffer", {
        id,
        url,
      });

      this.imgSrc = imgUrlFromBuffer(image.buffer);

      this.imgLabel = image.src;
      this.imgBuffer = image.buffer;
    },
    saveLink: function () {
      const inputValid = validateInputs(this.$el);

      if (inputValid) {
        if (this.popupArg.type === "add-link") {
          this.$store.commit("addGridElement", {
            data: this.$data,
          });
        } else if (this.popupArg.type === "edit-link") {
          this.$store.commit("editGridElement", {
            id: this.popupArg.linkID,
            data: this.$data,
          });
        }
        this.$store.commit("closePopup");
      }
    },
    header: function () {
      return this.popupArg.type === "add-link" ? "Add Link" : "Edit Link";
    },
    linkType: function (type) {
      this.type = type;
    },
  },
  mounted: function () {
    this.getElementImg(this.popupArg.linkID, this.popupArg.imgUrl);

    if (this.popupArg.type === "edit-link") {
      const linkData = this.$store.getters.getGridLink(this.popupArg.linkID);
      this.label = linkData.content.label;
      this.address = linkData.content.address;
      this.type = linkData.type;
    }
    if (
      this.popupArg.type === "add-link" &&
      this.popupArg.address &&
      this.popupArg.label &&
      this.popupArg.nativeIconBuffer &&
      this.popupArg.linkType
    ) {
      this.address = this.popupArg.address;
      this.label = this.popupArg.label;
      this.imgLabel = this.popupArg.label;
      this.imgSrc = imgUrlFromBuffer(this.popupArg.nativeIconBuffer);
      this.imgBuffer = this.popupArg.nativeIconBuffer;
      this.type = this.popupArg.linkType;
    }

    const inputs = document.querySelectorAll("input");
    if (inputs[0]) inputs[0].focus();

    // Enter Key to Submit The Form
    inputs.forEach((input) =>
      input.addEventListener("keyup", ({ key }) => {
        key === "Enter" ? this.$emit("save-click") : "";
      })
    );
  },
};
</script>

<style scoped>
div.edit-link {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
div.edit-link div.header {
  margin: 5px 0 10px 0;
  padding: 5px 0 15px 0;
  border-bottom: 2px solid var(--dark-background-color);
  align-items: center;
  justify-content: center;
}
div.edit-link div.content {
  height: 100%;
  flex-direction: column;
  overflow: auto;
}

div.edit-link div.section {
  flex-direction: column;
  margin: 10px;
}
div.edit-link div.section h3 {
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 14px;
  opacity: 0.9;
}
div.edit-link div.section input {
  margin-bottom: 5px;
}

div.address-header {
  position: relative;
}
div.address-header > div {
  position: absolute;
  right: 0;
  bottom: 0;
}
div.address-header div.button {
  font-size: 14px;
  font-style: italic;
  background-color: var(--dark-background-color);
  border: 1px solid var(--active-background-color);
  padding: 0 5px;
  border-radius: 0;
  border-bottom: none;
  border-left: none;
  opacity: 0.6;
  transition: background-color 200ms ease-in-out;
  transition: opacity 200ms ease-in-out;
}
div.address-header div.button:hover {
  opacity: 1;
}
div.address-header div.button:first-child {
  border-top-left-radius: 10px;
}
div.address-header div.button:last-child {
  border-top-right-radius: 10px;
}
div.address-header div.button.active {
  background-color: var(--main-accent-color);
  opacity: 1;
}

div.address-input {
  flex-direction: column;
  position: relative;
}
div.address-input input:not(.url) {
  padding-right: 4rem;
}
div.address-input div.button {
  position: absolute;
  right: 0;
  padding: 10px;
  box-shadow: inset 0 0 1000px var(--main-background-color);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid rgba(1, 1, 1, 0);
  border-left: 1px solid var(--active-accent-color);
  transition: box-shadow 150ms ease-in-out;
}
div.address-input div.button:hover {
  box-shadow: inset 0 0 1000px var(--light-background-color);
}

div.img-selection {
  padding: 10px;
}
div.img-selection .img-container {
  width: 100px;
  height: 100px;
  background: var(--dark-background-color);
  border: 1px var(--dark-accent-color) solid;
  border-radius: 5px;
}
div.img-selection .img-container img {
  max-width: 100%;
  max-height: 100%;
  width: inherit;
  height: inherit;
  object-fit: contain;
  cursor: pointer;
}
div.img-selection > div.img-selection-info {
  margin: 0 10px;
  flex-direction: column;
}
div.img-selection > div.img-selection-info input:focus {
  border: 1px solid var(--active-background-color);
}
div.img-selection div.button {
  padding: 15px;
  background: var(--dark-background-color);
  border-radius: 50px;
}
div.img-selection div.button:hover {
  background: var(--active-background-color);
}
</style>