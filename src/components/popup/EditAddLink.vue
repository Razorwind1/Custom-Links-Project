<template>
  <popup>
    <div class="popup-content">
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
              @keyup="grabLogo()"
              required
            />
            <div class="button" v-show="type !== 'url'" @click="selectFile">Open</div>
          </div>
        </div>
        <div class="section">
          <h3>Image</h3>
          <div class="img-selection">
            <div class="img-container">
              <img :src="imgSrc" @click="selectImage" />
              <div class="attribution" :class="{ hidden: !imgFetchClearbit }">
                Logos by
                <span v-on:click="attributionLink" style="margin-left: 2px"
                  >Clearbit</span
                >
              </div>
            </div>
            <div class="img-selection-info">
              <div class="reset-image-container">
                <input type="text overflow" v-model="imgLabel" readonly disabled />
                <div class="reset-image-button button" @click="resetImage">X</div>
              </div>

              <div class="button" @click="selectImage">Select Image</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-buttons">
      <div @click="closePopup" class="button">Cancel</div>
      <div @click="saveLink" class="button save">{{ header() }}</div>
    </div>
  </popup>
</template>

<script>
import validateInputs from "@/js/helper/validation.js";
import imgUrlFromBuffer from "@/js/img/imgUrlFromBuffer.js";
import popup from "@/components/popup/Popup.vue";
import defaultImgBuffer from "@/js/img/defaultImgBuffer.js";
import request from "request";

export default {
  data: function () {
    return {
      popupArg: this.$store.state.events.popup.arg,

      label: "",
      address: "",
      type: "url",
      customImg: false,
      imgFetchClearbit: false,

      imgSrc: null,

      imgBuffer: null,
      imgLabel: null,
    };
  },

  methods: {
    grabLogo: function () {
      if (this.type === "url" && this.address !== "" && !this.address.match(/^[a-zA-Z]+:\/\//)) {
        this.address = "http://" + this.address;
      }
      if (this.customImg === true || this.type !== "url" || this.address === "") return;
      let host = new URL(this.address).host;
      request(
        { uri: `https://logo.clearbit.com/${host}`, encoding: null },
        (err, res, buffer) => {
          if (!err) {
            this.imgBuffer = buffer;
            this.imgSrc = imgUrlFromBuffer(buffer);
            this.imgLabel = host;
            this.imgFetchClearbit = true;
          }
        }
      );
    },
    resetImage: function () {
      this.customImg = false;
      this.imgBuffer = new Buffer.from(defaultImgBuffer, "base64");
      this.imgSrc = imgUrlFromBuffer(this.imgBuffer);
      this.imgLabel = "default_icon.png";
      this.imgFetchClearbit = false;
    },
    closePopup: function () {
      this.$store.commit("closePopup");
      this.$store.commit("closeColorPicker");
    },
    selectImage: function () {
      const image = window.ipcRenderer.sendSync("open-image-dialog");
      if (!image) return;

      this.imgSrc = imgUrlFromBuffer(image.buffer);
      this.customImg = true;

      this.imgLabel = image.src;
      this.imgBuffer = image.buffer;
      this.imgFetchClearbit = false;
    },
    selectFile: function () {
      const file = window.ipcRenderer.sendSync("open-file-dialog", {
        type: this.type,
      });
      if (!file) return;

      const nativeIconBuffer = window.ipcRenderer.sendSync("get-native-icon", file);

      this.address = file;
      this.label = this.imgLabel = window.path.parse(file).name;
      this.imgSrc = imgUrlFromBuffer(nativeIconBuffer);
      this.imgBuffer = nativeIconBuffer;
      this.customImg = true;
      this.imgFetchClearbit = false;
    },
    getElementImg: function (id, url) {
      const image = window.ipcRenderer.sendSync("get-image-buffer", {
        id,
        url,
      });

      if (!image) return;

      this.imgSrc = imgUrlFromBuffer(image.buffer);

      this.imgLabel = image.src;
      this.imgBuffer = image.buffer;
    },
    saveLink: function () {
      const inputValid = validateInputs(this.$el);

      if (inputValid) {
        if (this.popupArg.type === "add-link") {
          this.$store.commit("addLink", {
            data: this.$data,
          });
        } else if (this.popupArg.type === "edit-link") {
          this.$store.commit("editLink", {
            id: this.popupArg.linkID,
            data: this.$data,
          });
        }
        this.$store.commit("closePopup");
      }
    },
    header: function () {
      return this.popupArg.type === "add-link" ? "Add Link" : "Save";
    },
    linkType: function (type) {
      this.type = type;
    },
    attributionLink: function () {
      window.ipcRenderer.send("open", "https://www.clearbit.com");
    },
  },
  mounted: function () {
    this.getElementImg(this.popupArg.linkID, this.popupArg.imgUrl);

    if (this.popupArg.type === "edit-link") {
      const linkData = this.$store.getters.linkFromId(this.popupArg.linkID);
      this.label = linkData.content.label;
      this.address = linkData.content.address;
      this.type = linkData.type;
      this.customImg = linkData.content.customImg;
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
      this.customImg = true;
    }
    this.grabLogo();

    const inputs = document.querySelectorAll("input");
    if (inputs[0]) inputs[0].focus();

    // Enter Key to Submit The Form
    inputs.forEach((input) =>
      input.addEventListener("keyup", ({ key }) => {
        key === "Enter" ? this.saveLink() : "";
      })
    );
  },
  components: {
    popup,
  },
};
</script>

<style scoped>
.popup-content div.content {
  height: 100%;
  flex-direction: column;
  overflow: auto;
}

.popup-content div.section {
  flex-direction: column;
  margin: 10px;
}
.popup-content div.section h3 {
  margin-bottom: 5px;
  margin-left: 5px;
  font-size: 14px;
  opacity: 0.9;
}
.popup-content div.section input {
  padding-right: 30px;
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
  background-color: var(--background-accent);
  border: 1px solid var(--background-active);
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
  background-color: var(--button-color);
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
  box-shadow: inset 0 0 1000px var(--background-color);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid rgba(1, 1, 1, 0);
  border-left: 1px solid var(--button-accent);
  transition: box-shadow 150ms ease-in-out;
}
div.address-input div.button:hover {
  box-shadow: inset 0 0 1000px var(--background-hover);
}

div.img-selection {
  padding: 10px;
}
div.img-selection .img-container {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  background: var(--background-accent);
  border: 1px var(--button-accent) solid;
  border-radius: 5px;
  position: relative;
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
  border: 1px solid var(--background-active);
}
div.img-selection div.button {
  padding: 15px;
  background: var(--background-accent);
  border-radius: 50px;
}
div.img-selection div.button:hover {
  background: var(--background-active);
}
.attribution {
  user-select: none;
  position: absolute;
  bottom: -20px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  background-color: transparent;
  opacity: 0.5;
}
.attribution:hover {
  opacity: 0.9;
}
.attribution span {
  color: rgb(108, 187, 233);
  cursor: pointer;
}
.reset-image-container {
  position: relative;
  margin-bottom: 5px;
}
div.img-selection div.reset-image-button {
  position: absolute;
  right: 0;
  height: 100%;
  width: 30px;
  border-radius: 0;
}
</style>
