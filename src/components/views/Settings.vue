<template>
  <div class="settings">
    <h1>Settings</h1>
    <div>
      <label for="theme">Theme:</label>
      <select
        name="select"
        id="theme"
        @change="theme($event)"
        :value="this.$store.state.theme"
      >
        <option value="dark">Dark</option>
        <option value="light">Light</option>
        <option value="darkRed">Dark Red</option>
        <option value="hufflepuff">Hufflepuff</option>
        <option value="ravenclaw">Ravenclaw</option>
      </select>
    </div>
    <div>
      <label for="startup">Launch Link Tailor at startup:</label>
      <div class="checkbox" id="startup" @click="startupToggle" :checked="startup"></div>
    </div>

    <div class="attribution">
      Icons made by
      <span v-on:click="attributionLink">Freepik</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startup: true
    }
  },
  methods: {
    attributionLink: function () {
      window.shell.openExternal("https://www.flaticon.com/authors/freepik");
    },
    theme(e) {
      this.$store.commit("setTheme", e.target.value);
    },
    startupToggle() {
      this.startup = !this.startup

      window.ipcRenderer.send("set-startup-behavior", this.startup);
    }
  },
  created: function () {
    this.startup = window.ipcRenderer.sendSync("get-startup-behavior").openAtLogin
  }
};
</script>

<style scoped>
.settings {
  width: 100%;
  margin-bottom: 15px;
  padding-right: 5px;
  overflow: auto;
  flex-direction: column;
}
h1{
  margin: 20px;
}
.settings > div {
  width: 80%;
  margin: 20px auto;
  height: 40px;
  align-items: center;
  justify-content: "flex-start";
}
.settings > div label {
  width: 50%;
  margin-right: 20px;
}

div.attribution {
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
div.attribution:hover {
  opacity: 0.9;
}
div.attribution span {
  color: rgb(108, 187, 233);
  cursor: pointer;
}

select {
  width: 150px;
  background-color: var(--background-accent);
  color: var(--background-text);
  border: none;
  height: 70%;
  padding: 0 10px;
}
select:hover {
  cursor: pointer;
}

.checkbox {
  background-color: var(--background-accent);
  width: 50px;
  height: 30px;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
}
.checkbox:hover{
  filter: contrast(150%);
}
.checkbox::after {
  content: "";
  width: 25px;
  height: 25px;
  margin: 2.5px;
  background: red;
  background-color: var(--alert-color);
  border-radius: 100%;
  transition: margin 200ms ease-in-out;
}
.checkbox[checked]::after {
  background-color: var(--button-color);
  margin-left: 22px;
}
</style>
