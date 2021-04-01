<template>
  <div id="nav">
    <div>
      <router-link to="/" class="button">
        <homeSvg />
      </router-link>
      <a class="button" @click="addLink">
        <addSvg />
      </a>
    </div>
    <div>
      <a class="button" @click.stop="layoutsMenu">
        <layoutSvg />
      </a>
      <a class="button" @click="tagList">
        <tagSvg />
      </a>
      <router-link to="/settings" class="button">
        <settingsSvg />
      </router-link>
    </div>
  </div>
</template>

<script>
import layoutSvg from "@/components/icons/layout.vue";
import tagSvg from "@/components/icons/tag.vue";
import settingsSvg from "@/components/icons/gear.vue";
import addSvg from "@/components/icons/add.vue";
import homeSvg from "@/components/icons/home.vue";

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
    layoutsMenu: function () {
      this.$store.commit("showPopup", {
        type: "layout-list",
      });
    },
  },
  components: {
    layoutSvg,
    tagSvg,
    settingsSvg,
    addSvg,
    homeSvg
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
#nav > div > a.router-link-exact-active {
  background-color: var(--nav-accent);
  border-radius: 15px;
}

#nav > div > a > svg {
  width: 55%;
  fill: var(--button-color);
  transition: width ease-in-out 100ms;
}
#nav > div > a:hover > svg, #nav > div > a.router-link-exact-active svg {
  filter: brightness(200%);
  width: 65%;
}
</style>
