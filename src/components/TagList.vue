<template>
  <div class="tag-list">
    <div class="header">
      <h2>Tag List</h2>
    </div>
    <div class="content">
      <div class="section">
        <div class="table-header">
          <div>Tag Name</div>
          <div>Color</div>
        </div>
        <div v-for="(tag, index) in $store.getters.getTags" :key="index">
        <div class="tag-entry">
        <div class="tag-entry-top-row">
          <div>{{tag.name}}</div>
          <div><span class="color-dot" :style="{'background-color': tag.color}"></span></div>
        <div>&#10005;</div>
        </div>
        <div class="tag-entry-bottom-row">
          <div v-for="(link, i) in $store.getters.getLinksByTag(tag.name)" :key="i">
            <div class="associated-link">{{link.content.label}}</div> 
          </div>
        </div>

        </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import validateInputs from "@/js/validation.js";

export default {
  data: function () {
    return {
      label: "",
      address: "",
    };
  },
  watch: {
    saveLink: function (value) {
      if (value === false) return;

      const inputValid = validateInputs(this.$el);

      if (inputValid) {
        this.$store.commit("addGridElement", this.$data);
        this.$emit("save-success");
      }
      else{
        this.$emit("save-fail");
      }
    },
  },
  mounted: function () {
    const inputs = document.querySelectorAll("input");
    if (inputs[0]) inputs[0].focus();

    // Enter Key to Submit The Form
    inputs.forEach((input) =>
      input.addEventListener("keyup", ({ key }) => {
        key === "Enter" ? this.$emit("save-click") : "";
      })
    );
  },
  props: {
    saveLink: Boolean,
  },
};
</script>

<style scoped>
span.color-dot {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}
.table-header {
  display: flex;
  border: 2px solid var(--dark-background-color);
  justify-content: space-between;
}.table-header > div {
  padding: 10px;
  font-size: 110%;
  font-weight: bold;
}.table-header div:nth-child(2) {
  margin-right: 20px;
}
.tag-entry {
  border: 2px solid var(--dark-background-color);
  width: 100%;
  display: flex;
  flex-flow: column;
}
.tag-entry-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}.tag-entry > div {
  padding: 10px;
}.tag-entry-top-row > div:hover {
  background-color: var(--light-background-color);
  border-radius: 5px;
  cursor: pointer;
}.tag-entry-top-row >div:nth-child(1) {
  width: 250px;
}.tag-entry-top-row >div:nth-child(2) {
  margin-left: 10px;
  margin-right: 15px;
}

.tag-entry-bottom-row {
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid var(--dark-background-color);
}.associated-link {
  font-size: 80%;
  margin-right: 25px
}


/*for consistent pop-up css:*/
div.tag-list {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
div.tag-list div.header {
  margin: 5px 0 10px 0;
  padding: 5px 0 15px 0;
  border-bottom: 2px solid var(--dark-background-color);
  align-items: center;
  justify-content: center;
}
div.tag-list div.content {
  height: 100%;
  flex-direction: column;
  overflow: auto;
}
div.tag-list div.section {
  flex-direction: column;
  margin: 5px 10px;
}
div.tag-list div.section > * {
  margin: 8px 5px;
}
div.tag-list div.section > h3 {
  margin-bottom: 0;
  font-size: 14px;
  opacity: .9;
}
</style>