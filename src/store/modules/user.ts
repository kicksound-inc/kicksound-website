import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IUser, TypeUser } from "../types";
import { HttpError } from "@/store/errors";
import axios from "axios";

@Module
export default class User extends VuexModule implements IUser {

    public userId: number = 0;
    public token: string = "";
    public firstname?: string;
    public lastname?: string;
    public type: TypeUser = 0;
    public description?: string;
    public realm?: string;
    public username: string = "";
    public email: string = "";
    public emailVerified?: true;

    @Action({ rawError: true })
    public async register(payload: IUser): Promise<void> {
        console.log("Register mutation");

        try {
            const register = await axios.post("/accounts", {
                username: payload.username,
                email: payload.email,
                password: payload.password,
            });
            console.log("Register Action", register);
        } catch (err) {
            throw err;
        }
    }

    @Action({ commit: "setAuthInformation", rawError: true })
    public async login(payload: IUser): Promise<IUser> {
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
            throw err;
        }
    }

    @Action({ commit: "setUser", rawError: true })
    public async getUser(): Promise<IUser> {
        try {
            const user = await axios.get<IUser>(`/accounts/${this.userId}`);
            return user.data;
        } catch (err) {
            throw err;
        }
    }

    @Action({ commit: "clearUser", rawError: true})
    public async logout(): Promise<void> {
        console.log("Logout mutation");

        try {
            await axios.post("/accounts/logout");
        } catch (err) {
            throw err;
        }
    }

    @Mutation
    public setAuthInformation(user: IUser): void {
        this.userId = user.userId;
        this.token = user.token;
        this.username = user.username;
    }

    @Mutation
    public setUser(user: IUser): void {
        this.firstname = user.firstname,
        this.lastname = user.lastname,
        this.type = user.type,
        this.description = user.description,
        this.realm = user.realm,
        this.email = user.email,
        this.emailVerified = user.emailVerified;
    }

    @Mutation
    public modifyUser(user: IUser): void {

        if (user.username) { this.username = user.username; }
        if (user.email) { this.email = user.email; }
        if (user.firstname) { this.firstname = user.firstname; }
        if (user.lastname) { this.lastname = user.lastname; }
        if (user.description) { this.description = user.description; }

    }

    @Mutation
    public clearUser(): void {
        this.userId = 0;
        this.token = "";
        this.username = "";
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.description = "";
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }

    get user(): IUser {
        return {
            userId: this.userId,
            token: this.token,
            firstname: this.firstname,
            lastname: this.lastname,
            type: this.type,
            description: this.description,
            realm: this.realm,
            username: this.username,
            email: this.email,
            emailVerified: this.emailVerified
        };
    }
}
