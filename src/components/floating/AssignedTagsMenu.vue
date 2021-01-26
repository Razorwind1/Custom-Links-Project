<template>

  <floating
    :event="this.$store.state.events.assignedTagsMenu.event"
    class="tagsMenu"
  >
  <div @click.stop>
    <div class="header">Assigned Tags</div>
    <div
      class="tagEntry"
      v-for="tagID in this.assignedTags"
      :key="tagID"
      v-on:click="unassignTag(tagID)"
    >
      <div
        class="checkedCircle"
        :style="{ 'background-color': $store.getters.tagColorFromId(tagID) }"
      ></div>
      <div class="assignedTagLabel">
        {{ $store.getters.tagNameFromId(tagID) }}
      </div>
    </div>
    <div class="header nonAssignedTags">Nonassigned Tags</div>
    <div
      class="tagEntry"
      v-for="nonassignedTagID in this.nonassignedTags"
      :key="'nonAssigned' + nonassignedTagID"
      v-on:click="assignTag(nonassignedTagID)"
    >
      <div
        class="uncheckedCircle"
        :style="{
          'background-color': $store.getters.tagColorFromId(nonassignedTagID),
        }"
      ></div>
      <div class="nonassignedTagLabel">
        {{ $store.getters.tagNameFromId(nonassignedTagID) }}
      </div>
    </div>
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
      nonassignedTags: this.$store.state.tags
        .map((tag) => tag.id)
        .filter((item) => !assignedTags.includes(item)),
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
      this.nonassignedTags = this.$store.state.tags
        .map((tag) => tag.id)
        .filter((item) => !this.assignedTags.includes(item));
    },
    assignTag(tagID) {
      this.$store.commit("assignTag", {
        tagID,
        linkID: this.linkID,
      });
      this.assignedTags = this.$store.getters.tagsFromLinkId(this.linkID);
      this.nonassignedTags = this.$store.state.tags
        .map((tag) => tag.id)
        .filter((item) => !this.assignedTags.includes(item));
    },
  },
};
</script>

<style scoped>
.tagsMenu{
  min-width: 100px;
  max-width: 180px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  padding: 0;
  max-height: 350px;
}
.tagsMenu > div{
  padding: 5px;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
}
.tagsMenu > div > div {
  padding: 2px;
  width: 100%;
}
.header {
  padding: 0;
  font-size: 12px;
  font-style: italic;
}

.tagEntry {
 align-items: center;
 justify-content: center;
 cursor: pointer;
 border-radius: 5px;
}
.tagEntry:hover {
 background-color: var(--active-background-color);
}
.assignedTagLabel {
 cursor: pointer;
 margin-left: 10px;
 font-size: 14px;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 display: inline-block;
 flex-grow: 2;
 margin-top: 4px;
 margin-bottom: 0px;
}
.checkedCircle {
 height: 21px;
 width: 21px;
 min-width: 21px;
 margin-left: 4px;
 border-radius: 50%;
 display: inline-block;
 border: solid var(--active-background-color) 1px;
}
.nonAssignedTags {
 border-top-style: solid;
 border-top-width: 2px;
 border-top-color: var(--active-background-color);
 margin-top: 12px;
}
.nonassignedTagLabel {
 cursor: pointer;
 margin-left: 10px;
 font-size: 12px;
 filter: brightness(50%);
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 display: inline-block;
 flex-grow: 2;
 margin-top: 4px;
 margin-bottom: 0px;
}
.uncheckedCircle {
 height: 16px;
 width: 16px;
 min-width: 16px;
 margin-left: 7px;
 border-radius: 50%;
 display: inline-block;
}
</style>
