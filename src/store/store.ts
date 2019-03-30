import Vue from "vue";
import Vuex, {StoreOptions} from "vuex";
import Drawer from "@/store/modules/drawer";
import {IRootState} from "@/store/types";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
    state: {
        version: "1.0.0"
    },
    modules: {
        Drawer
    }
};

export default new Vuex.Store<IRootState>(store);
