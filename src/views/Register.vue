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
                                    prepend-icon="person"
                                    name="username"
                                    label="Username"
                                    type="text"
                                    v-model="username"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    v-model="email"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    v-model="password"
                                ></v-text-field>
                                <v-text-field
                                    prepend-icon="lock"
                                    name="verif-password"
                                    label="Verify Password"
                                    id="verif-password"
                                    type="password"
                                    v-model="passwordVerified"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
								<p mb-0>Déjà un compte ? <router-link to="/">Connecte toi</router-link></p>
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
import { Component, Model, Provide } from "vue-property-decorator";
import { IUser } from "../store/types";

@Component
export default class Register extends Vue {
    @Provide() private username: string = "";
    @Provide() private email: string = "";
    @Provide() private password: string = "";
    @Provide() private passwordVerified: string = "";

    public created() {
        console.log("Register component created");
    }

    public destroyed() {
        console.log("Register component destroyed");
    }

    public onClickRegister(ev: any): void {
        console.log("Click Register");

        if (this.password !== this.passwordVerified) {
            console.log("Password doesn't match");
        } else {
            this.$store.dispatch("register", {
                username: this.username,
                email: this.email,
                password: this.password
            } as IUser).then((response) => {
                console.log("onClickRegister : ", response);
                this.$store.dispatch("login", {
                    username: this.username,
                    password: this.password
                }).then((response) => {
                    console.log("OnLoginAfterRegister : ", response);
                    this.$router.push({name: "Dashboard"});
                }).catch((error) => {
                    console.error("OnLoginAfterRegister : ", error);
                });
            }).catch((error) => {
                console.error("onClickRegister : ", error);
            });
        }
    }
}
</script>