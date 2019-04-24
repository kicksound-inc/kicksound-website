import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUser, ILoginData } from "../types";
import axios, { AxiosResponse } from "axios";

@Module
export default class User extends VuexModule implements IUser {

    public userId: number = 0;
    public token: string = "";
    public username: string = "";

    @Action
    public async register(payload: IUser) {
        console.log("Register mutation");

        try {
            const register = await axios.post("http://localhost:3000/api/accounts", {
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            console.log("Register Action", register);
        } catch (err) {
            console.error(err);
        }
    }

    @Action({ commit: "setUser" })
    public async login(payload: IUser) {
        console.log("Login mutation");

        try {
            const connexion = await axios.post<ILoginData>("http://localhost:3000/api/accounts/login", {
                username: payload.username,
                password: payload.password
            });
            console.log("Login Action : ", connexion);

            return {
                userId: connexion.data.userId,
                token: connexion.data.id,
                username: payload.username,
            } as IUser;
        } catch (err) {
            console.error("Login Action", err);
        }
    }

    @Action
    public logout() {
        console.log("Logout mutation");
    }

    @Mutation
    public setUser(user: IUser) {
        this.userId = user.userId;
        this.token = user.token;
        this.username = user.username;
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }
}