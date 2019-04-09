import { Module } from "vuex";
import { IDrawer, IRootState } from "../types";

const drawer: Module<IDrawer, IRootState> = {
    state: {
        enable: false,
        temporary: true,
        dark: false
    },
    mutations: {
        switch(state) {
            state.enable = !state.enable;
        },
        changeOptions(state, options: IDrawer) {
            for (const property in options) {
                if (options.hasOwnProperty(property)) {
                    (state as any)[property] = (options as any)[property];
                }
            }
        }
    },
    actions: {

    },
};

export default drawer;
