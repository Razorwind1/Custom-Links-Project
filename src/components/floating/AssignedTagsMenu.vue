<template>
  <floating :event="this.$store.state.events.assignedTagsMenu.event" class="tagsMenu">
    <div class="header">Assigned Tags</div>
    <div class="assignedTagEntry" v-for="tagID in this.assignedTags" :key="tagID">
      <label v-on:click="unassignTag(tagID)">
        <input
          type="checkbox"
          checked="true"
          class="checkedCheckbox"
          :style="{ 'background-color': $store.getters.tagColorFromId(tagID) }"
        />
        {{ $store.getters.tagNameFromId(tagID) }}</label
      >
    </div>
    <div class="header">Nonassigned Tags</div>
    <div
      class="nonassignedTagEntry"
      v-for="nonassignedTagID in this.nonassignedTags"
      :key="'nonAssigned' + nonassignedTagID"
    >
      <label v-on:click="assignTag(nonassignedTagID)">
        <input type="checkbox" />
        {{ $store.getters.tagNameFromId(nonassignedTagID) }}</label
      >
    </div>
  </floating>
</template>

<script>
import floating from "@/components/floating/Floating.vue";

export default {
  data: function () {
    let linkID = this.$store.state.events.assignedTagsMenu.arg.element.id;
    let assignedTags = this.$store.getters.tagsFromLinkId(linkID);
    return {
      linkID,
      assignedTags,
      nonassignedTags: this.$store.state.tags.map(tag => tag.id).filter(item => !assignedTags.includes(item)),
    };
  },
  components: {
    floating,
  },
  methods: {
    unassignTag(tagID) {
      this.$store.commit("unassignTag", {
        tagID,
        linkID: this.linkID,
      });
      this.assignedTags = this.$store.getters.tagsFromLinkId(this.linkID);
      this.nonassignedTags = this.$store.state.tags.map(tag => tag.id).filter(item => !this.assignedTags.includes(item));
    },
    assignTag(tagID) {
      this.$store.commit("assignTag", {
        tagID,
        linkID: this.linkID,
      });
      this.assignedTags = this.$store.getters.tagsFromLinkId(this.linkID);
      this.nonassignedTags = this.$store.state.tags.map(tag => tag.id).filter(item => !this.assignedTags.includes(item));
    },
  },
};
</script>

<style scoped>
.tagsMenu {
  min-width: 100px;
  max-width: 180px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  flex-direction: column;
  padding: 0;
}
.tagsMenu > div {
  padding: 2px;
  width: 100%;
}
.header {
  padding: 0;
  font-size: 12px;
  font-style: italic;
}
label {
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
}
label:hover {
  filter: brightness(85%);
  transition: filter 0.1s ease-in-out;
}
label input {
  cursor: pointer;
  margin-right: 4px;
}
.checkedCheckbox {
  -webkit-appearance: none;
  border: 1px solid black;
  padding: 9px; /*size of circle checkbox*/
  border-radius: 50%;
  display: inline-block;
}
</style>
