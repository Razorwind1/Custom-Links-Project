<template>
  <div class="add-link">
    <div class="header">
      <h2>Add Link</h2>
    </div>
    <div class="content">
      <div class="section">
        <h3 required>Name</h3>
        <input type="text" v-model="label" required/>
      </div>
      <div class="section">
        <h3>Address</h3>
        <input type="text" v-model="address" required />
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
div.add-link {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
div.add-link div.header {
  margin: 5px 0 10px 0;
  padding: 5px 0 15px 0;
  border-bottom: 2px solid var(--dark-background-color);
  align-items: center;
  justify-content: center;
}
div.add-link div.content {
  height: 100%;
  flex-direction: column;
  overflow: auto;
}
div.add-link div.section {
  flex-direction: column;
  margin: 5px 10px;
}
div.add-link div.section > * {
  margin: 8px 5px;
}
div.add-link div.section > h3 {
  margin-bottom: 0;
  font-size: 14px;
  opacity: .9;
}
</style>