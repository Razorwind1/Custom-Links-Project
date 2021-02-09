<template>
  <div id="nav">
    <div>
      <router-link to="/" class="button">
        <img src="/assets/icons/freepik/svg/008-home (2).svg" />
      </router-link>
      <a class="add-link-button button" @click="addLink">
        <img src="/assets/icons/freepik/png/051-add.png" />
      </a>
    </div>
    <div>
      <a class="tag-list-button button" @click="tagList">
        <img src="/assets/icons/label-tag.svg" />
      </a>
      <router-link to="/settings" class="button">
        <img src="/assets/icons/freepik/svg/002-settings (2).svg" />
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
  background-color: var(--background-accent);
}
#nav > div {
  flex-direction: column;
}
#nav > div > a {
  color: var(--background-text);
  width: var(--nav-width);
  height: var(--nav-width);
  border-radius: 50%;
  margin: 5px 0;
  transition: border-radius 100ms linear;
  background-color: var(--background-accent);
  box-shadow: 0px 0px 30px 5px var(--background-accent) inset;
}
#nav > div > a:hover {
  background-color: var(--nav-accent);
}
#nav > div > a.add-link-button:hover {
  
}
#nav > div > a.router-link-exact-active {
  background-color: var(--nav-accent);
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