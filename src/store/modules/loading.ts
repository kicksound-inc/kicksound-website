import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { ILoading } from "../types";

@Module
export default class Loading extends VuexModule implements ILoading {

    public enable: boolean = false;
    public value: number = 0;

    @Mutation
    public setLoadingEnable() {
        this.enable = true;
    }

    @Mutation
    public setLoadingDisable() {
        this.enable = false;
    }

    @Mutation
    public setValue(value: number) {
        this.value = value;
    }

    @Mutation
    public clearValue() {
        this.value = 0;
    }

}
