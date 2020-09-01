<template>
  <div id="nav">
    <router-link to="/">H</router-link>
    <router-link to="/about">A</router-link>
    <router-link to="/hello">H</router-link>
    <router-link to="/these">A</router-link>
    <router-link to="/are">H</router-link>
    <router-link to="/for">A</router-link>
    <router-link to="/testing">H</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
#nav {
  user-select: none;
  display: flex;
  flex-direction: column;
  width: var(--nav-width);
  margin: 5px;
  border: 1px solid var(--nav-border-color);
  border-radius: 15px;
}
#nav > a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-text-color);
  width: var(--nav-width);
  height: var(--nav-width);
  border-radius: 15px;
  -webkit-user-drag: none;
}
#nav > a:hover {
  background-color: var(--nav-hover-color);
}
#nav > a.router-link-exact-active {
  background-color: var(--nav-active-color);
}
</style>