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
              <input
                class="tagLabel"
                v-bind:class="{ tagBeingEdited: tagBeingEditedIdx == index }"
                @click="editingName(tag.id, index)"
                :value="tag.name"
                ref="tags"
                v-on:keyup.enter="saveName"
              />
              <div
                @click="stopEditingName()"
                class="xStopEditing"
                v-show="tagBeingEditedIdx == index"
              >
                &#9932;
              </div>
              <div
                @click="saveName()"
                class="checkSaveLabel"
                v-show="tagBeingEditedIdx == index"
              >
                &#x2713;
              </div>
              <div
                @click="
                  colorPicker($event, {
                    tagID: tag.id,
                    tagColor: tag.color,
                  })
                "
              >
                <span
                  class="color-dot"
                  :style="{ 'background-color': tag.color }"
                ></span>
              </div>
              <div class="xDeleteTag">&#9932;</div>
            </div>
            <div class="tag-entry-bottom-row">
              <div
                v-for="(link, i) in $store.getters.getLinksByTag(tag.id)"
                :key="i"
              >
                <div class="associated-link">{{ link.content.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      label: "",
      address: "",
      tagBeingEditedIdx: null,
      tagBeingEditedID: null,
    };
  },
  methods: {
    possiblyCloseEditFields: function () {
      console.log("possiblyCloseEditFields");
    },
    colorPicker: function (event, data) {
      this.$store.commit("colorPicker", {
        arg: {
          pickerType: "tag-color",
          tagColor: data.tagColor,
          tagID: data.tagID,
        },
        event,
      });
    },
    editingName(tagID, index) {
      this.tagBeingEditedIdx = index;
      this.tagBeingEditedID = tagID;
    },
    stopEditingName() {
      this.$refs.tags[this.tagBeingEditedIdx].blur();
      this.tagBeingEditedIdx = null;
    },
    saveName() {
      this.$store.commit("editTagName", {
        tagID: this.tagBeingEditedID,
        newName: this.$refs.tags[this.tagBeingEditedIdx].value,
      });
      this.stopEditingName();
    },
    getTagLabelClass(tagName) {
      return "tag-entry-label-name-" + tagName;
    },
  },
  mounted: function () {},
  props: {
    saveLink: Boolean,
  },
};
</script>

<style scoped>
input.tagLabel {
  background-color: var(--main-background-color);
  border: none;
  padding: 4px;
  padding-left: 10px;
  cursor: pointer;
}
input.tagBeingEdited {
  background-color: var(--light-background-color);
  cursor: text;
}
.xStopEditing {
  font-size: 13px;
  position: absolute;
  left: 182px;
}
.checkSaveLabel {
  font-size: 14px;
  position: absolute;
  left: 168px;
}
.xDeleteTag {
  font-size: 15px;
  margin-right: 5px;
  margin-top: 2px;
}
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
}
.table-header > div {
  padding: 10px;
  font-size: 110%;
  font-weight: bold;
}
.table-header div:nth-child(2) {
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
  position: relative;
}
.tag-entry > div {
  padding: 7px;
}
.tag-entry-top-row > div:hover {
  background-color: var(--light-background-color);
  border-radius: 5px;
  cursor: pointer;
}
.tag-entry-top-row > div:nth-child(1) {
  width: 250px;
}
.tag-entry-top-row > div:nth-child(2) {
  margin-left: 10px;
  margin-right: 15px;
}

.tag-entry-bottom-row {
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid var(--dark-background-color);
}
.associated-link {
  font-size: 80%;
  margin-right: 25px;
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
  opacity: 0.9;
}
</style>