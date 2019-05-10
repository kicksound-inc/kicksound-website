import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VeeValidate, { ValidationProvider } from "vee-validate";
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
    iconfont: "md",
});

Vue.use(VeeValidate, { inject: false });

console.log("API_URL", process.env.VUE_APP_API_URL);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Authorization"] = store.getters.getToken;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
