<template>

  <floating
    :event="this.$store.state.events.assignedLayoutsMenu.event"
    class="layoutsMenu"
  >
  <div @click.stop>
    <h4 :style="$store.getters.styleFromName(link.style)" class="text-overflow">{{link.content.label}}</h4>
    <hr>
    <div class="header">Assigned Layouts</div>
    <div
      class="layoutEntry"
      v-for="layout in this.assignedLayouts"
      :key="layout.id"
      v-on:click="unassignLayout(layout.id)"
    >
      <div
        class="checkedCircle"
        :style="{ 'background-color': layout.color }"
      ></div>
      <div class="assignedLayoutLabel">
        {{ layout.name }}
      </div>
    </div>
    <div class="header nonAssignedLayouts">Not Assigned Layouts</div>
    <div
      class="LayoutEntry"
      v-for="layout in this.nonassignedLayouts"
      :key="layout.id"
      v-on:click="assignLayout(layout.id)"
    >
      <div
        class="uncheckedCircle"
        :style="{
          'background-color': layout.color,
        }"
      ></div>
      <div class="nonassignedLayoutLabel">
        {{ layout.name }}
      </div>
    </div>
    </div>
  </floating>
</template>

<script>
import floating from "@/components/floating/Floating.vue";

export default {
  data: function () {
    return {
      link: this.$store.getters.linkFromId(this.$store.state.events.assignedLayoutsMenu.arg.element.id),
      assignedLayouts: [],
      nonassignedLayouts: []
    };
  },
  components: {
    floating,
  },
  methods: {
    unassignLayout(layoutId) {
      this.$store.commit("unassignLayout", {
        layoutId,
        linkId: this.link.id,
      });
      this.updateLayouts()
    },
    assignLayout(layoutId) {
      this.$store.commit("assignLayout", {
        layoutId,
        linkId: this.link.id,
      });
      this.updateLayouts()
    },
    updateLayouts(){
      this.assignedLayouts = this.$store.getters.layoutsFromLinkId(this.link.id)
      this.nonassignedLayouts = this.$store.state.layouts.filter(layout => !this.assignedLayouts.includes(layout))
    }
  },
  created: function (){
    this.updateLayouts()
  }
};
</script>

<style scoped>
h4 {
  margin: 0;
  color: var(--text-accent);
}
hr{
  height: 0px;
  border: none;
  border-bottom: 1px solid var(--line-accent);
  outline: none;
}
.layoutsMenu{
  min-width: 150px;
  max-width: 180px;
  background: var(--background-color);
  border-radius: 5px;
  border: 2px solid var(--background-accent);
  padding: 0;
  max-height: 350px;
}
.layoutsMenu > div{
  padding: 5px;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
}
.layoutsMenu > div > div {
  padding: 2px;
  width: 100%;
}
.header {
  padding: 0;
  font-style: italic;
}

.layoutEntry {
 align-items: center;
 justify-content: center;
 cursor: pointer;
 border-radius: 5px;
}
.layoutEntry:hover {
 background-color: var(--background-hover);
}
.assignedLayoutLabel {
 cursor: pointer;
 margin-left: 10px;
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
}
.nonAssignedLayouts {
 border-top-style: solid;
 border-top-width: 2px;
 border-top-color: var(--line-color);
 margin-top: 12px;
}
.nonassignedLayoutLabel {
 cursor: pointer;
 margin-left: 10px;
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
