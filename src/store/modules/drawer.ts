import { Module } from "vuex";
import { IDrawer, IRootState } from "../types";

const drawer: Module<IDrawer, IRootState> = {
    state: {
        drawer: false,
        temporary: false,
        dark: false,
        right: false
    },
    mutations: {
        switch(state) {
            state.drawer = !state.drawer;
        },
        changeOptions(state, options: IDrawer) {
            for (let property in options) {
                if(options.hasOwnProperty(property)) {
                    (state as any)[property] = (options as any)[property];
                    console.log(state.drawer, state.temporary, state.dark, state.right);
                }
            }
        }
    },
    actions: {

    },
};

export default drawer;
