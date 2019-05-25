<template>
    <v-img class="background-image" :src="require('@/assets/test.jpg')">
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6 lg4>
                    <v-card>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-form @submit.prevent="onClickLogin">
                            <v-card-text>
                                <v-text-field
                                    v-validate="'required'"
                                    prepend-icon="person"
                                    name="login"
                                    label="Login"
                                    type="text"
                                    v-model="username"
                                    :error-messages="errors.collect('login')"
                                ></v-text-field>
                                <v-text-field
                                    v-validate="'required'"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    v-model="password"
                                    :error-messages="errors.collect('password')"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <p>
                                    Vous n'avez pas de compte ?
                                    <router-link to="/register">Enregistre toi</router-link>
                                </p>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" type="submit">Login</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-img>
</template>

<style>
.background-image {
    height: 100%;
}
</style>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IUser, ISnackbar, TypeMessage } from "../store/types";
import { HttpError } from "@/store/errors";

@Component({
    $_veeValidate: { validator: "new" }
})
export default class Login extends Vue {
    private username: string = "";
    private password: string = "";

    public created() {
        console.log("Login component created");
    }

    public destroyed() {
        console.log("Login component destroyed");
    }

    public async onClickLogin(ev: any): Promise<any> {
        console.log("Click login");
        if (await this.$validator.validate()) {
            const response = await this.$store.dispatch("login", {
                username: this.username,
                password: this.password
            } as IUser);

            console.log("onClickLogin response : ", response);
            this.$store.commit("setDrawerDesktop", true);
            this.$router.push({ name: "Home" });
        }
    }
}
</script>
