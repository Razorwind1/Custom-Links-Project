<template>
  <div class="container" :style="containerPosition" ref="container"
  @click.stop>
    <div class="header">Assigned Tags</div>
    <div
    class="assignedTagEntry"
    v-for="tagID in this.assignedTags"
    :key="tagID">
    
    <label v-on:click="unassignTag(tagID)">
    <input type="checkbox" checked="true" class="checkedCheckbox" :style="{ 'background-color': $store.getters.getTagColor(tagID) }">
        {{$store.getters.getTagName(tagID)}}</label>
      
    </div>
    <div class="header">Nonassigned Tags</div>
    <div
    class="nonassignedTagEntry"
    v-for="nonassignedTagID in this.nonassignedTags"
    :key="'nonAssigned'+nonassignedTagID">
    
    <label v-on:click="assignTag(nonassignedTagID)">
      <input type="checkbox">
    {{ $store.getters.getTagName(nonassignedTagID) }}</label>
        
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      containerPosition: {
        top: "200px",
        left: "250px",
      },
      linkID: null,
      assignedTags: null,
      nonassignedTags: null,
      focusedTag: null,
    };
  },
  mounted: function () {
    this.setContainerPosition(this.$store.state.events.assignedTagsMenu.event);
    this.linkID = this.$store.state.events.assignedTagsMenu.arg.element.id;
    this.assignedTags = this.$store.getters.getTagsofLink(this.linkID);
    this.nonassignedTags = this.$store.getters.getTagsNotofLink(this.linkID);
    console.log("assignedTags: "+this.assignedTags +" nonassignedTags: "+ this.nonassignedTags);
  },
  updated: function () {
    this.setContainerPosition(this.$store.state.events.assignedTagsMenu.event);
  },
  methods: {
    unassignTag(tagID) {
      this.$store.commit("unassignTag", {
        tagID,
        linkID: this.linkID
      });
      this.assignedTags = this.$store.getters.getTagsofLink(this.linkID);
      this.nonassignedTags = this.$store.getters.getTagsNotofLink(this.linkID);
      console.log("assignedTags: "+this.assignedTags +" nonassignedTags: "+ this.nonassignedTags);
    },
    assignTag(tagID) {
      this.$store.commit("assignTag", {
        tagID,
        linkID: this.linkID
      });
      this.assignedTags = this.$store.getters.getTagsofLink(this.linkID);
      this.nonassignedTags = this.$store.getters.getTagsNotofLink(this.linkID);
      console.log("assignedTags: "+this.assignedTags +" nonassignedTags: "+ this.nonassignedTags);
    },
    setContainerPosition(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const windowW = window.innerWidth;
        const windowH = window.innerHeight;

        const menuW = this.$refs.container.getBoundingClientRect().width;
        const menuH = this.$refs.container.getBoundingClientRect().height;

        if (mouseX + menuW >= windowW) {
          this.containerPosition.left = mouseX - menuW + "px";
        } else {
          this.containerPosition.left = mouseX + "px";
        }

        if (mouseY + menuH >= windowH) {
          this.containerPosition.top = windowH - menuH - 5 + "px";
        } else {
          this.containerPosition.top = mouseY + "px";
        }
    },
  },
};
</script>


<style scoped>
.container {
  position: absolute;
  min-width: 100px;
  max-width: 180px;
  background: var(--dark-background-color);
  border-radius: 5px;
  border: 1px solid var(--active-background-color);
  flex-direction: column;
  padding: 0;
}
.container > div {
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
