import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IDrawer } from "../types";

@Module
export default class Drawer extends VuexModule implements IDrawer {
    public enable: boolean = false;
    public temporary: boolean = true;
    public dark: boolean = false;

    @Mutation
    public switch() {
        this.enable = !this.enable;
    }

    @Mutation
    public changeOptions(options: IDrawer) {
        for (const property in options) {
            if (options.hasOwnProperty(property)) {
                (this as any)[property] = (options as any)[property];
            }
        }
    }
}
