import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUser } from "../types";
import axios from "axios";
import router from "@/router";

@Module
export default class User extends VuexModule implements IUser {

    public token: string = "";
    public email: string = "";
    public username: string = "";
    public type: number = 0;

    @Action({ commit: "setUser" })
    public register(payload: IUser) {
        console.log("Register mutation");

        if (process.env.VUE_APP_FAKE_USER) {
            return {
                token: "yolo",
                email: "fake email",
                username: "fake username",
                type: 0
            } as IUser;
        } else {
            axios.post("http://localhost:3000/api/accounts", {
                username: payload.username,
                email: payload.email,
                password: payload.password
            }).catch((err) => {
                console.error(err);
            }).then((resp) => {
                console.log(resp);
            });
        }
    }

    @Action({ commit: "setUser" })
    public login(payload: IUser) {
        console.log("Login mutation");

        if (process.env.VUE_APP_FAKE_USER) {
            return {
                token: "yolo",
                email: "fake email",
                username: "fake username",
                type: 0
            } as IUser;
        } else {
            axios.post("http://localhost:3000/api/accounts/login", {
                username: payload.username,
                password: payload.password
            }).catch((err) => {
                console.error(err);
            }).then((resp) => {
                console.log(resp);
            });
        }
    }

    @Action
    public logout() {
        console.log("Logout mutation");
    }

    @Mutation
    public setUser(user: IUser) {
        this.token = user.token;
        this.email = user.email;
        this.username = user.username;
        this.type = user.type;
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }
}