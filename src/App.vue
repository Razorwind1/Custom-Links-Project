<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <LinkButton />
    <LinkButton />
    <LinkButton />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
//I added LinkButton
import LinkButton from "./components/LinkButton.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    LinkButton
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
