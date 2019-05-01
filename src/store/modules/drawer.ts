import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IDrawer } from "../types";

@Module
export default class Drawer extends VuexModule implements IDrawer {
    public enableDesktop: boolean = true;
    public enableMobile: boolean = false;
    public dark: boolean = false;

    @Mutation
    public switchDesktop() {
        this.enableDesktop = !this.enableDesktop;
    }

    @Mutation
    public setDrawerDesktop(enable: boolean) {
        this.enableDesktop = enable;
    }

    @Mutation
    public switchMobile() {
        this.enableMobile = !this.enableMobile;
    }

    @Mutation
    public setDrawerMobile(enable: boolean) {
        this.enableMobile = enable;
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
