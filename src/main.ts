import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VeeValidate from "vee-validate";
import axios from "axios";
import { HttpError } from "./store/errors";
import { TypeMessage, ISnackbar } from "./store/types";
import moment from "moment-timezone";

/**
 * Vue Configuration
 */

Vue.config.productionTip = false;

Vue.config.errorHandler = (error, vm, info) => {
    if (error instanceof HttpError) {
        store.commit("showSnackbar", {
            message:
                error.message[0].toUpperCase() +
                error.message.slice(1),
            color: TypeMessage.ERROR
        } as ISnackbar);
    } else {
        console.error("Vue =>", error, vm, info);
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

/**
 * Axios configuration
 */

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common["Authorization"] = store.getters.getToken;

axios.interceptors.response.use((response) => {
    return response;
}, (error: any) => {
    const err: HttpError = new HttpError(
        error.response.data.error.message,
        error.response.data.error.code,
        error.response.status,
        error.response.statusText
    );
    console.error("Axios =>", err);
    return Promise.reject(err);
});

/**
 * Moment configuration
 * Moment ne peut pas être une variable global car il a un constructor
 */

moment.locale(window.navigator.language || "en");
moment.tz(moment.tz.guess());

/**
 * Vue global variable
 */

Vue.prototype.$http = axios;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
