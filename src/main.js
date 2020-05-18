import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

//This is a Vue instance
new Vue({
  render: h => h(App)
}).$mount("#app");
