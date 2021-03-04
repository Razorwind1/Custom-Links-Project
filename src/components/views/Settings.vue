<template>
  <div class="settings">
    <div>
      <label for="theme">Theme:</label>
      <select name="select" id="theme" @change="theme($event)" :value="this.$store.state.theme">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="darkRed">Dark Red</option>
        <option value="hufflepuff">Hufflepuff</option>
        <option value="ravenclaw">Ravenclaw</option>
      </select>
    </div>

    <div class="attribution">
      Icons made by
      <span v-on:click="attributionLink">Freepik</span>
    </div>
  </div>
</template>


<script>

export default {
  methods: {
    attributionLink: function () {
      window.shell.openExternal("https://www.flaticon.com/authors/freepik");
    },
    theme(e){
      this.$store.commit("setTheme", e.target.value)
    }
  },
};
</script>

<style>
.settings {
  width: 100%;
  margin-bottom: 15px;
  padding-right: 5px;
  overflow: auto;
}
.settings > div {
  margin: 20px 0;
  width: 80%;
  margin: 20px auto;
  height: 40px;
  align-items: center;
  justify-content: "flex-start";
}
.settings > div label {
  margin-right: 20px;
}

.settings .attribution {
  user-select: none;
  height: auto;
  display: block;
  position: fixed;
  bottom: 2px;
  left: 0px;
  width: 100%;
  margin: 0;
  text-align: right;
  padding: 0 6px;
  font-size: 12px;
  background-color: transparent;
  opacity: 0.5;
}
.settings .attribution:hover {
  opacity: 0.9;
}
.settings .attribution span {
  color: rgb(108, 187, 233);
  cursor: pointer;
}

.settings select {
  width: 150px;
  background-color: var(--background-accent);
  color: var(--background-text);
  border: none;
  height: 70%;
  padding: 0 10px;
}
.settings select:hover {
  cursor: pointer;
}
</style>
