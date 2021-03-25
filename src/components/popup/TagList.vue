<template>
  <popup>
    <div class="popup-content">
      <div class="header">
        <h2>Tag List</h2>
        <div class="button new-tag" @click.stop="addTag()">New+</div>
      </div>
      <div class="content">
        <div class="section">
          <div v-for="(tag, index) in $store.state.tags" :key="index">
            <div class="tag-entry">
              <div class="tag-entry-top-row">
                <div class="tagLabelField">
                <input
                  class="tagLabel"
                  v-bind:class="{
                    tagBeingEdited: tagBeingEditedIdx == index && editingFields,
                  }"
                  @focus="editingName(index)"
                  v-on:click.stop
                  :value="tag.name"
                  ref="tags"
                  v-on:keyup.enter="saveName(tag.id)"
                  @blur="stopEditingName()"
                />
                </div>
                <div
                  @mousedown="saveName(tag.id)"
                  class="checkSaveLabel"
                  v-show="tagBeingEditedIdx == index && editingFields"
                >
                  &#x2713;
                </div>
                <div
                  @click="stopEditingName()"
                  class="xStopEditing"
                  v-show="tagBeingEditedIdx == index && editingFields"
                >
                  &#9932;
                </div>
                
                <div>
                <input class="colorPicker" type="color" :value="tag.color" @change="changeTagColor($event, tag.id)" />
                </div>
                <!-- <div
                  @click.stop="
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
                </div> -->
                <div class="delete-button" @click="xDeleteTag(tag.id)">
                    <deleteSVG />
                    <!-- <img src="/public/assets/icons/error.svg"/> -->
                </div>
              </div>
              <div class="tag-entry-bottom-row">
                <div v-for="(link, i) in $store.getters.linksFromTag(tag.id)" :key="i">
                  <div class="associated-link">{{ link.content.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popup-buttons">
      <div @click="close" class="button save">Close</div>
    </div>
  </popup>
</template>

<script>
import popup from "@/components/popup/Popup.vue";
import deleteSVG from "@/components/icons/delete-round.vue";

export default {
  data: function () {
    return {
      tagBeingEditedIdx: null,
      tagsLength: this.$store.state.tags.length,
      editingFields: false,
    };
  },
  methods: {
    // colorPicker: function (event, data) {
    //   this.$store.commit("showColorPicker", {
    //     arg: {
    //       pickerType: "tag-color",
    //       tagColor: data.tagColor,
    //       tagID: data.tagID,
    //     },
    //     event,
    //   });
    // },
    changeTagColor: function (e, id) {
      this.$store.commit("editTag", {
        tagID: id,
        newColor: e.target.value,
      });
    },
    editingName(index) {
      this.$refs.tags[index].focus();
      this.tagBeingEditedIdx = index;
      this.editingFields = true;
    },
    stopEditingName() {
      this.$refs.tags[this.tagBeingEditedIdx].blur();
      this.tagBeingEditedIdx = null;
      this.editingFields = false;
    },
    saveName(tagID) {
      this.$store.commit("editTag", {
        tagID,
        newName: this.$refs.tags[this.tagBeingEditedIdx].value,
      });
      this.stopEditingName();
    },
    getTagLabelClass(tagName) {
      return "tag-entry-label-name-" + tagName;
    },
    addTag() {
      this.$store.commit("addTag");
    },
    xDeleteTag(tagID) {
      this.$store.commit("showAlert", {
        type: "delete-tag",
        tagID,
      });
    },
    close() {
      this.$store.commit("closePopup");
    },
  },
  updated: function () {
    if (this.tagsLength < this.$refs.tags.length)
      this.editingName(this.$refs.tags.length - 1);

    this.tagsLength = this.$refs.tags.length;
  },
  components: {
    popup,
    deleteSVG,
  },
};
</script>

<style scoped>
input.tagLabel {
  background-color: var(--main-background-color);
  border: none;
  padding: 1px;
  padding-left: 3px;
  padding-right: 0px;
  cursor: pointer;
  width: 115px;
  text-overflow: ellipsis;
}
input.tagBeingEdited {
  background-color: var(--background-hover);
  cursor: text;
  padding-right: 40px;
}
.xStopEditing {
  margin-top: 1px;
  font-size: 11px;
  position: absolute;
  left: 105px;
}
.checkSaveLabel {
  font-size: 13px;
  position: absolute;
  left: 93px;
}
/* span.color-dot {
  height: 23px;
  width: 23px;
  border-radius: 50%;
  display: inline-block;
} */
.tag-entry {
  border: 2px solid var(--background-accent);
  width: 170px;
  display: flex;
  flex-flow: column;
  float: left;
}
.tag-entry-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}
.tag-entry > div {
  padding: 4px;
}
.tag-entry-top-row > .tagLabelField {
  margin-right: 3px;
}
.tag-entry-top-row > .tagLabelField:hover {
  background-color: var(--background-hover);
  border-radius: 5px;
  cursor: pointer;
}
.delete-button {
  border-radius: 50%;
}
.delete-button svg {
  width: 16px;
  margin-left: 2px;
  margin-right: 1px;
  fill: var(--background-accent);
  background: transparent;
}
.delete-button:hover svg{
  fill: var(--background-active);
  background-color: var(--background-hover);
  border-radius: 16px;
  cursor: pointer;
}

.tag-entry-bottom-row {
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid var(--background-accent);
  flex-direction: column;
  max-height: 150px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.associated-link {
  font-size: 75%;
  margin-left: 0px;
  margin-right: -12px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.associated-link:hover {
  filter: brightness(80%);
}

.popup-content div.content {
  height: 100%;
  flex-direction: column;
  overflow: auto;
}

.popup-content div.section {
  margin: 1px 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.popup-content div.section > * {
  margin: 8px 5px;
}
.popup-content div.section > h3 {
  margin-bottom: 0;
  font-size: 14px;
  opacity: 0.9;
}

.new-tag {
  font-size: 15px;
  background-color: var(--button-color);
  color: var(--button-text);
  padding: 2px 5px;
  align-self: flex-start;
  margin-left: 10px;
  margin-top: 5px;
  transition: background-color 150ms ease-in-out;
}
.new-tag:hover {
  background-color: var(--button-hover);
}
.new-tag:active {
  background-color: var(--button-accent);
}



</style>
