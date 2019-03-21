import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
    iconfont: "md",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
