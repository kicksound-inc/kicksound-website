import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IDrawer } from "../types";

@Module
export default class Drawer extends VuexModule implements IDrawer {
    public enableDesktop: boolean = true;
    public enableMobile: boolean = false;
    public dark: boolean = false;

    @Mutation
    public SwitchDesktop() {
        this.enableDesktop = !this.enableDesktop;
    }

    @Mutation
    public DisableDesktop() {
        this.enableDesktop = false;
    }

    @Mutation
    public EnableDesktop() {
        this.enableDesktop = true;
    }

    @Mutation
    public SwitchMobile() {
        this.enableMobile = !this.enableMobile;
    }

    @Mutation
    public DisableMobile() {
        this.enableMobile = false;
    }

    @Mutation
    public EnableMobile() {
        this.enableMobile = true;
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
