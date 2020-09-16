<template>
  <div id="nav">
    <div>
      <router-link to="/">
        <img src="/assets/svg/freepik/svg/008-home (2).svg" />
      </router-link>
      <a class="add-link-button" @click="addLink">
        <img src="/assets/svg/freepik/png/051-add.png" />
      </a>
    </div>
    <div>
      <router-link to="/settings">
        <img src="/assets/svg/freepik/svg/002-settings (2).svg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addLink : function () {
      this.$emit("show-popup", "add-link")
    }
  }
};
</script>

<style>
#nav {
  user-select: none;
  display: flex;
  flex-direction: column;
  width: calc (var(--nav-width) + 10px);
  padding: 5px;
  border-radius: 15px 15px 0 0;
  justify-content: space-between;
  background-color: var(--dark-background-color);
}
#nav > div > a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-text-color);
  width: var(--nav-width);
  height: var(--nav-width);
  border-radius: 15px;
  -webkit-user-drag: none;
  transition: background-color ease-in-out 100ms;
  cursor: pointer;
  margin: 5px 0;
}
#nav > div > a:hover {
  background-color: var(--nav-hover-color);
}
#nav > div > a.add-link-button:hover {
  background-color: transparent;
}
#nav > div > a.router-link-exact-active {
  background-color: var(--nav-active-color);
}

#nav > div > a > img {
  width: 50%;
  transition: width ease-in-out 100ms;
  -webkit-user-drag: none;
  filter: grayscale(80%);
}
#nav > div > a.add-link-button > img {
  filter: grayscale(30%);
}
#nav > div > a:hover > img {
  width: 60%;
  filter: grayscale(0%);
}
#nav > div > a.router-link-exact-active > img {
  width: 60%;
  filter: grayscale(0%);
}
</style>