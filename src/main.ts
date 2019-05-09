import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VeeValidate, { ValidationProvider } from "vee-validate";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
    iconfont: "md",
});

Vue.use(VeeValidate, { inject: false });

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
