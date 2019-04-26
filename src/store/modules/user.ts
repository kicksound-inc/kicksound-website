import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUser } from "../types";
import axios from "axios";

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
            const connexion = await axios.post("http://localhost:3000/api/accounts/login", {
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

    @Action({ commit: "clearUser"})
    public async logout(access_token: string) {
        console.log("Logout mutation");

        try {
            await axios.post(`http://localhost:3000/api/accounts/logout?access_token=${this.token}`, {
                access_token
            });

            return;
        } catch (err) {
            console.error("Login Action", err);
        }
    }

    @Mutation
    public setUser(user: IUser) {
        this.userId = user.userId;
        this.token = user.token;
        this.username = user.username;
    }

    @Mutation
    public clearUser() {
        this.userId = 0;
        this.token = "";
        this.username = "";
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }
}