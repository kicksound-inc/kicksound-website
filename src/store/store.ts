import Vue from "vue";
import Vuex, {StoreOptions} from "vuex";
import Drawer from "@/store/modules/drawer";
import User from "@/store/modules/user";
import Snackbar from "@/store/modules/snackbar";
import {IRootState} from "@/store/types";
import VuexPersistence from "vuex-persist";
import Loading from "@/store/modules/loading";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["User"],
});

const store: StoreOptions<IRootState> = {
    state: {
        version: "1.0.0"
    },
    modules: {
        Drawer,
        User,
        Snackbar,
        Loading
    },
    plugins: [vuexLocal.plugin]
};

export default new Vuex.Store<IRootState>(store);
