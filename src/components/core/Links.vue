<template>
  <div class="container">
    <div class="link" v-for="link in $store.state.links" :key="link.id">
      <img :src="getLinkImg(link.id, link.content.img)" alt="">
      <label class="text-overflow">{{ link.content.label }}</label>
    </div>
  </div>
</template>

<script>
import getLinkImg from "@/js/img/getLinkImg.js";

export default {
  methods: {
    getLinkImg
  },
};
</script>

<style scoped>
div.container {
  flex-direction: column;
  overflow-y: auto;
  padding: 15px 10px 10px 15px;
}
div.link {
  width: 100%;
  padding: 5px;
  margin: 1px 0;
  border-radius: 5px;
  background-color: var(--background-color);
  height: 30px;
  cursor: pointer;
}
div.link:hover {
  background-color: var(--background-hover);
}
div.link img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}


::-webkit-scrollbar:hover {
  background-color: var(--background-active);
}
::-webkit-scrollbar-thumb {
  background-color: var(--background-color);
}
::-webkit-scrollbar-thumb:hover {
  background-color: var(--background-color);
}
</style>
