<template>
  <div class="alert-overlay">
    <div class="alert-container">
      <div class="alert-content">
        <h1>{{ header }}</h1>
        <p>{{ content }}</p>
      </div>
      <div class="alert-buttons">
        <div
          v-show="saveButton"
          @click="save"
          class="button save"
          v-text="saveButtonLabel"
          :style="saveButtonStyle"
          :class="saveButtonClass"
        ></div>
        <div v-show="closeButton" @click="closeAlert" class="button">Cancel</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      alertArg: this.$store.state.events.alert.arg,

      header: "Example Header",
      content: "This is an example explanation for this alert!",

      closeButton: false,

      saveButton: true,
      saveButtonLabel: "OK",
      saveButtonStyle: {}
    };
  },
  created: function() {
    if (this.alertArg.type == "delete-link") {
      this.header = "Delete Link";
      this.content = `Are you sure you want to delete ${
        this.$store.getters.getGridLink(this.alertArg.id).content.label
      }?`;
      this.saveButtonLabel = "Delete";
      this.saveButtonClass = ["delete-link"];
      this.closeButton = true;
    }

    if (this.alertArg.type == "delete-tag") {
      this.header = "Delete Tag";
      this.content = `Are you sure you want to delete the '${
        this.$store.getters.getTagName(this.alertArg.tagID)
      }' tag?`;
      this.saveButtonLabel = "Delete";
      this.saveButtonClass = ["delete-tag"];
      this.closeButton = true;
    }

    if (this.alertArg.type == "link-added") {
      this.header = "Link Added";
      this.content = `Your link ${this.alertArg.label} was added successfully!`;
      this.saveButtonLabel = "Close";
      this.closeButton = false;
    }

    if (this.alertArg.type == "link-edited") {
      this.header = "Link Edited";
      this.content = `Your link ${this.alertArg.label} was edited successfully!`;
      this.saveButtonLabel = "Close";
      this.closeButton = false;
    }
  },
  methods: {
    save: function() {
      if (this.alertArg.type == "delete-link") {
        this.$store.commit("deleteGridElement", { id: this.alertArg.id });
        this.$store.commit("closeAlert");
      }
      if (this.alertArg.type == "delete-tag") {
        this.$store.commit("deleteTag", { id: this.alertArg.tagID });
        this.$store.commit("closeAlert");
      } else this.$store.commit("closeAlert");
    },
    closeAlert: function() {
      this.$store.commit("closeAlert");
    }
  }
};
</script>

<style scoped>
div.alert-overlay {
  z-index: 500;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000a;
  pointer-events: none;
  align-items: center;
  justify-content: center;
}
div.alert-container {
  background-color: var(--main-background-color);
  width: 400px;
  height: 200px;
  flex-direction: column;
  border-radius: 5px;
  pointer-events: all;
}
div.alert-content {
  flex-grow: 1;
  padding: 10px;
  height: inherit;
  flex-direction: column;
}
div.alert-content h1 {
  font-size: 20px;
  padding: 10px;
  opacity: 0.8;
  border-bottom: 1px solid var(--light-background-color);
}
div.alert-content p {
  font-size: 15px;
  padding: 10px;
}

div.alert-buttons {
  flex-direction: row-reverse;
  height: 60px;
  width: 100%;
  background: var(--dark-background-color);
  border-radius: inherit;
  justify-content: space-between;
  padding: 10px;
}
div.alert-buttons > div {
  padding: 15px;
}
div.alert-buttons > div:hover {
  opacity: 1;
  background-color: var(--light-background-color);
}
div.alert-buttons > div.button.save {
  background-color: var(--dark-accent-color);
}
div.alert-buttons > div.button.save:hover {
  background-color: var(--main-accent-color);
}

div.alert-buttons > div.button.delete-link {
  background-color: var(--dark-alert-color);
}
div.alert-buttons > div.button.delete-link:hover {
  background-color: var(--light-alert-color);;
}
</style>