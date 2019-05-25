import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VeeValidate, { ValidationProvider } from "vee-validate";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpError } from './store/errors';
import { TypeMessage, ISnackbar } from './store/types';

Vue.config.productionTip = false;

Vue.config.errorHandler = function (error, vm, info) {
    if (error instanceof HttpError) {
        store.commit("showSnackbar", {
            message:
                error.message[0].toUpperCase() +
                error.message.slice(1),
            color: TypeMessage.ERROR
        } as ISnackbar);
    } else {
        console.error("Global Error : ", error, vm, info);
        store.commit("showSnackbar", {
            message: "Something went wrong, contact admin",
            color: TypeMessage.ERROR
        } as ISnackbar);
    }
};

Vue.use(Vuetify, {
    iconfont: "md",
});

Vue.use(VeeValidate, { inject: false });

console.log("API_URL", process.env.VUE_APP_API_URL);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Authorization"] = store.getters.getToken;

axios.interceptors.response.use((config) => {
    return config;
}, (error: any) => {

    const err: Error = error.response.data.error;
    console.error("Axios error", err);
    return Promise.reject(error);
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
