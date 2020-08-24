<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">H</router-link>
      <router-link to="/about">A</router-link>
      <router-link to="/hello">H</router-link>
      <router-link to="/these">A</router-link>
      <router-link to="/are">H</router-link>
      <router-link to="/for">A</router-link>
      <router-link to="/testing">H</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
:root {
  height: 100%;
  
  --main-text-color: #eeeeee;
  --main-background-color: #2c2c2c;
  --nav-border-color: #646464;
  --nav-hover-color: #3b3b3b;
  --nav-active-color: #242424;

  --nav-width: 50px;
}
* {
  margin: 0;
  padding: 0;
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;

  color: var(--main-text-color);
  background-color: var(--main-background-color);
  display: flex;
}

#nav {
  display: flex;
  flex-direction: column;
  width: var(--nav-width);
  margin: 5px;
  border: 1px solid var(--nav-border-color);
  border-radius: 15px;
}
#nav>a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-text-color);
  width: var(--nav-width);
  height: var(--nav-width);
  border-radius: 15px;
}
#nav>a:hover {
  background-color: var(--nav-hover-color);
}
#nav>a.router-link-exact-active {
  background-color: var(--nav-active-color);
}

</style>
