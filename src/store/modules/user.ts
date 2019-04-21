import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import {  IUser } from "../types";
import axios from "axios";

@Module
export default class User extends VuexModule implements IUser {

    public token?: string
    public email?: string;
    public username?: string;
    public type?: number;

    @Action
    public register(payload: IUser) {
        console.log("Register mutation");

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

    @Action
    public login(payload: IUser) {
        console.log("Login mutation");
        axios.post("http://localhost:3000/api/accounts/login", {
            username: payload.username,
            password: payload.password
        }).catch((err) => {
            console.error(err);
        }).then((resp) => {
            console.log(resp);
        });
    }

    @Action
    public logout() {
        console.log("Logout mutation");
    }

    @Mutation
    public setUser(user: IUser) {
        //this.token
    }
    
}