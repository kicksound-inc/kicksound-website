import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUser } from "../types";
import { HttpError } from "@/store/errors";
import axios from "axios";

@Module
export default class User extends VuexModule implements IUser {

    public userId: number = 0;
    public token: string = "";
    public username: string = "";

    @Action({ rawError: true })
    public async register(payload: IUser) {
        console.log("Register mutation");

        try {
            const register = await axios.post("/accounts", {
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            console.log("Register Action", register);
        } catch (err) {
            console.error("Register Action", err.response);
            throw new HttpError(
                err.response.data.error.message,
                err.response.data.error.code
            );
        }
    }

    @Action({ commit: "setUser", rawError: true })
    public async login(payload: IUser) {
        console.log("Login mutation");

        try {
            const connexion = await axios.post("/accounts/login", {
                username: payload.username,
                password: payload.password
            });
            console.log("Login Action : ", connexion);

            axios.defaults.headers.common["Authorization"] = connexion.data.id;

            return {
                userId: connexion.data.userId,
                token: connexion.data.id,
                username: payload.username,
            } as IUser;
        } catch (err) {
            throw new HttpError(
                err.response.data.error.message,
                err.response.data.error.code
            );
        }
    }

    @Action({ commit: "clearUser"})
    public async logout() {
        console.log("Logout mutation");

        try {
            await axios.post("/accounts/logout");

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

    get getToken(): string {
        return this.token;
    }

    get getUserId(): number {
        return this.userId;
    }
}