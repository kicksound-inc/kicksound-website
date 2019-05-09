import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { ISnackbar } from "../types";

@Module
export default class Snackbar extends VuexModule implements ISnackbar {
    public enable: boolean = false;
    public timeout: number = 5000;
    public message!: string;
    public color!: string;

    @Mutation
    public showSnackbar(payload: ISnackbar) {
        this.enable = true;
        this.message = payload.message || "Default snackbar message";
        this.color = payload.color || "info";
    }
}
