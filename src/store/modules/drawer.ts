import { Module } from "vuex";
import { IDrawer, IRootState } from "../types";

const drawer: Module<IDrawer, IRootState> = {
    state: {
        drawer: false
    },
    mutations: {
        switch(state) {
            state.drawer = !state.drawer;
        }
    },
    actions: {

    },
};

export default drawer;
