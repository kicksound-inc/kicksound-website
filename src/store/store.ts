import Vue from "vue";
import Vuex, {StoreOptions} from "vuex";
import Drawer from "@/store/modules/drawer";
import User from "@/store/modules/user";
import {IRootState} from "@/store/types";
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store: StoreOptions<IRootState> = {
    state: {
        version: "1.0.0"
    },
    modules: {
        Drawer,
        User
    },
    plugins: [vuexLocal.plugin]
};

export default new Vuex.Store<IRootState>(store);
