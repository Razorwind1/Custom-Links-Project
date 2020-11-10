<template>
  <div class="confirm-popup">
    <div class="header">
      <h3>Confirm Delete</h3>
    </div>
    <div class="content">
      <div class="section">
        <h3>Are you sure you want to remove this link?</h3>
        <br />
        <br />
      </div>
      <div class="warning">
        <h4>WARNING! Deleting this link will remove all tags and styles associated with it.</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      popupArg: this.$store.state.events.popup.arg
    };
  },
  methods: {
    deleteLink: function() {
      this.$store.commit("deleteGridElement", { id: this.popupArg.id });
      this.$store.commit("closePopup");
    }
  },
};
</script>

<style scoped>
div.confirm-popup {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
div.confirm-popup div.header {
  margin: 5px 0 10px 0;
  padding: 5px 0 15px 0;
  border-bottom: 2px solid var(--dark-background-color);
  align-items: center;
  justify-content: center;
}
div.confirm-popup div.content {
  height: 100%;
  flex-direction: column;
  overflow: auto;
}
div.confirm-popup div.section {
  flex-direction: column;
  margin: 5px 10px;
}
div.confirm-popup div.section > * {
  margin: 8px 5px;
}
div.confirm-popup div.section > h3 {
  margin-bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 25px;
  text-align: center;
  opacity: 0.9;
}
div.confirm-popup div.warning > h4 {
  margin-bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  text-align: center;
  opacity: 0.9;
}
</style>
