<template>
  <div class="tag-list">
    <div class="header">
      <h2>Tag List</h2>
      <div class="button new-tag" @click.stop="addTag()">New+</div>
    </div>
    <div class="content">
      <div class="section">
        <div v-for="(tag, index) in $store.state.tags" :key="index">
          <div class="tag-entry">
            <div class="tag-entry-top-row">
              <input
                class="tagLabel"
                v-bind:class="{ tagBeingEdited: tagBeingEditedIdx == index && $store.state.events.editingFields.active}"
                @click="editingName(index)"
                v-on:click.stop
                :value="tag.name"
                ref="tags"
                v-on:keyup.enter="saveName(tag.id)"
              />
              <div
                @click="stopEditingName()"
                class="xStopEditing"
                v-show="tagBeingEditedIdx == index && $store.state.events.editingFields.active"
              >&#9932;</div>
              <div
                @click="saveName(tag.id)"
                class="checkSaveLabel"
                v-show="tagBeingEditedIdx == index && $store.state.events.editingFields.active"
              >&#x2713;</div>
              <div
                @click.stop="
                  colorPicker($event, {
                    tagID: tag.id,
                    tagColor: tag.color,
                  })
                "
              >
                <span class="color-dot" :style="{ 'background-color': tag.color }"></span>
              </div>
              <div class="xDeleteTag" @click="xDeleteTag(tag.id)">&#9932;</div>
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
</template>

<script>
export default {
  data: function() {
    return {
      tagBeingEditedIdx: null,
      tagsLength: this.$store.state.tags.length
    };
  },
  methods: {
    colorPicker: function(event, data) {
      this.$store.commit("showColorPicker", {
        arg: {
          pickerType: "tag-color",
          tagColor: data.tagColor,
          tagID: data.tagID
        },
        event
      });
    },
    editingName(index) {
      this.$refs.tags[index].focus();
      this.tagBeingEditedIdx = index;
      this.$store.commit("allowEditingFields");
    },
    stopEditingName() {
      this.$refs.tags[this.tagBeingEditedIdx].blur();
      this.tagBeingEditedIdx = null;
      this.$store.commit("closeEditingFields");
    },
    saveName(tagID) {
      this.$store.commit("editTag", {
        tagID,
        newName: this.$refs.tags[this.tagBeingEditedIdx].value
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
        tagID
      });
    }
  },
  updated: function() {
    if (this.tagsLength < this.$refs.tags.length)
      this.editingName(this.$refs.tags.length - 1);

    this.tagsLength = this.$refs.tags.length;
  },
  props: {
    saveLink: Boolean
  }
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
  width: 120px;
 text-overflow: ellipsis;
}
input.tagBeingEdited {
  background-color: var(--light-background-color);
  cursor: text;
  padding-right: 40px;
}
.xStopEditing {
  margin-top: 1px;
  font-size: 12px;
  position: absolute;
  left: 97px;
}
.checkSaveLabel {
  font-size: 13px;
  position: absolute;
  left: 92px;
}
div.xDeleteTag {
  font-size: 11px;
  margin-right: -2px;
}
span.color-dot {
  height: 23px;
  width: 23px;
  border-radius: 50%;
  display: inline-block;
}
.tag-entry {
  border: 2px solid var(--dark-background-color);
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
.tag-entry-top-row > div:hover {
  background-color: var(--light-background-color);
  border-radius: 5px;
  cursor: pointer;
}
.tag-entry-top-row > div:nth-child(1) {
  width: 120px;
}
.tag-entry-top-row > div:nth-child(2) {
  margin-left: 10px;
  margin-right: 15px;
}

.tag-entry-bottom-row {
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid var(--dark-background-color);
  flex-direction: column;
}
.associated-link {
  font-size: 75%;
  margin-left: -8px;
 margin-right: -12px;
 display: inline-block;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
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
  overflow: auto;
}
div.tag-list div.section {
  flex-direction: column;
  margin: 1px 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
div.tag-list div.section > * {
  margin: 8px 5px;
}
div.tag-list div.section > h3 {
  margin-bottom: 0;
  font-size: 14px;
  opacity: 0.9;
}

.new-tag {
  font-size: 15px;
  background-color: var(--main-accent-color);
  padding: 2px 5px;
  align-self: flex-start;
  margin-left: 10px;
  margin-top: 5px;
  transition: background-color 150ms ease-in-out;
}
.new-tag:hover {
  background-color: var(--dark-accent-color);
}
.new-tag:active {
  background-color: var(--active-accent-color);
}
</style>