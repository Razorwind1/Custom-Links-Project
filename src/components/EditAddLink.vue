<template>
  <div class="edit-link">
    <div class="header">
      <h2>{{ header }}</h2>
    </div>
    <div class="content">
      <div class="section">
        <h3 required>Name</h3>
        <input type="text" v-model="label" required />
      </div>
      <div class="section">
        <h3>Address</h3>
        <input type="text" v-model="address" required />
      </div>
      <div class="section">
        <h3>Image</h3>
        <div class="img-selection">
          <img :src="imgSrc" />
          <div class="img-selection-info">
            <input type="text" v-model="imgSrcFile" readonly disabled />
            <div class="button" @click="selectImage">Select Image</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validateInputs from "@/js/validation.js";
import path from 'path'

export default {
  data: function () {
    return {
      header: this.linkArgs.type === "add-link" ? "Add Link" : "Edit Link",
      label: "",
      address: "",
      imgSrc: "/assets/icons/logo.png",
    };
  },
  methods: {
    selectImage: function () {
      window.ipcRenderer.send("open-dialog");
    },
  },
  computed: {
    imgSrcFile: function () {
      return path.basename(this.imgSrc);
    },
  },
  mounted: function () {
    if (this.linkArgs.type === "edit-link") {
      const linkData = this.$store.getters.getGridLink(this.linkArgs.linkID);
      this.label = linkData.content.label;
      this.address = linkData.content.address;
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
  watch: {
    saveLink: function (value) {
      if (value === false) return;

      const inputValid = validateInputs(this.$el);

      if (inputValid) {
        if (this.linkArgs.type === "add-link") {
          this.$store.commit("addGridElement", {
            data: this.$data,
          });
        } else if (this.linkArgs.type === "edit-link") {
          this.$store.commit("editGridElement", {
            id: this.linkArgs.linkID,
            data: this.$data,
          });
        }
        this.$emit("save-success");
      } else {
        this.$emit("save-fail");
      }
    },
  },
  props: {
    saveLink: Boolean,
    linkArgs: Object,
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
  margin: 5px 10px;
}
div.edit-link div.section > * {
  margin: 8px 5px;
}
div.edit-link div.section > h3 {
  margin-bottom: 0;
  font-size: 14px;
  opacity: 0.9;
}

div.img-selection {
  padding: 10px;
}
div.img-selection > img {
  width: 100px;
  height: 100px;
  background: var(--dark-background-color);
  border: 1px var(--dark-accent-color) solid;
  border-radius: 5px;
}
div.img-selection > div.img-selection-info {
  margin: 0 10px;
  flex-direction: column;
}
div.img-selection > div.img-selection-info input:focus {
  border: 1px solid var(--active-background-color);
}
div.img-selection div.button {
  margin-top: 10px;
  padding: 15px;
  background: var(--dark-background-color);
  border-radius: 50px;
}
div.img-selection div.button:hover {
  background: var(--active-background-color);
}
</style>