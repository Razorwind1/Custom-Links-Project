<template>
  <div id="nav">
    <div>
      <router-link to="/" class="button">
        <img src="/assets/svg/freepik/svg/008-home (2).svg" />
      </router-link>
      <a class="add-link-button button" @click="addLink">
        <img src="/assets/svg/freepik/png/051-add.png" />
      </a>
    </div>
    <div>
      <a class="tag-list-button button" @click="tagList">
        <img src="/assets/svg/freepik/svg/dh/label-tag.svg" />
      </a>
      <router-link to="/settings" class="button">
        <img src="/assets/svg/freepik/svg/002-settings (2).svg" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addLink: function () {
      this.$store.commit("showPopup", {
        type: "add-link",
      });
    },
    tagList: function () {
      this.$store.commit("showPopup", {
        type: "tag-list",
      });
    },
  },
};
</script>

<style>
#nav {
  flex-direction: column;
  padding: 5px;
  border-radius: 15px 15px 0 0;
  justify-content: space-between;
  background-color: var(--dark-background-color);
}
#nav > div {
  flex-direction: column;
}
#nav > div > a {
  color: var(--main-text-color);
  width: var(--nav-width);
  height: var(--nav-width);
  border-radius: 50px;
  margin: 5px 0;
  transition: border-radius 100ms linear;
  background-color: var(--dark-background-color);
  box-shadow: 0px 0px 15px 10px var(--main-background-color) inset;
}
#nav > div > a:hover {
  background-color: var(--light-background-color);
}
#nav > div > a.add-link-button:hover {
  background-color: transparent;
}
#nav > div > a.router-link-exact-active {
  background-color: var(--main-accent-color);
  border-radius: 15px;
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