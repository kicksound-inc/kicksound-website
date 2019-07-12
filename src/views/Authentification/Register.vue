<template>
    <v-img class="background-image" :src="require('@/assets/test.jpg')">
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md6 lg4>
                    <v-card>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Register</v-toolbar-title>
                        </v-toolbar>
                        <v-form @submit.prevent="onClickRegister">
                            <v-card-text>
                                <v-text-field
                                    v-validate="'required'"
                                    prepend-icon="person"
                                    name="username"
                                    label="Username"
                                    type="text"
                                    v-model="username"
                                    :error-messages="errors.collect('username')"
                                ></v-text-field>
                                <v-text-field
                                    v-validate="'required|email'"
                                    prepend-icon="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                    :error-messages="errors.collect('email')"
                                ></v-text-field>
                                <v-text-field
                                    ref="password"
                                    v-validate="'required'"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    v-model="password"
                                    :error-messages="errors.collect('password')"
                                ></v-text-field>
                                <v-text-field
                                    v-validate="'required|confirmed:password'"
                                    prepend-icon="lock"
                                    name="verif-password"
                                    label="Verify Password"
                                    id="verif-password"
                                    type="password"
                                    v-model="passwordVerified"
                                    :error-messages="errors.collect('verif-password')"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <p mb-0>
                                    Déjà un compte ?
                                    <router-link to="/">Connecte toi</router-link>
                                </p>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" type="submit">Register</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-img>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Model } from "vue-property-decorator";
import { IUser, ISnackbar, TypeMessage } from "@/store/types";

@Component({
    $_veeValidate: { validator: "new" }
})
export default class Register extends Vue {
    private username: string = "";
    private email: string = "";
    private password: string = "";
    private passwordVerified: string = "";

    public created() {
        console.log("Register component created");
    }

    public destroyed() {
        console.log("Register component destroyed");
    }

    public async onClickRegister(ev: any): Promise<void> {
        console.log("Click Register");
        if (await this.$validator.validate()) {
            if (this.password !== this.passwordVerified) {
                console.log("Password doesn't match");
                this.$store.commit("showSnackbar", {
                    message: "Les mots de passe ne correspondent pas",
                    color: TypeMessage.ERROR
                } as ISnackbar);
            } else {
                let response = await this.$store.dispatch("register", {
                    username: this.username,
                    email: this.email,
                    password: this.password
                } as IUser);

                console.log("onClickRegister : ", response);
                response = await this.$store.dispatch("login", {
                    username: this.username,
                    password: this.password
                });

                console.log("OnLoginAfterRegister : ", response);
                this.$store.commit("setDrawerDesktop", true);
                this.$router.push({ name: "Home" });
            }
        }
    }
}
</script>