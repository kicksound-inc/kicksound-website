<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
            <v-card>
                <!--<v-form @submit="onClickRegister">-->
                <v-form>
                    <v-card-text>
                        <!--<v-form>-->
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
                        ></v-text-field>
                        <!--</v-form>-->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!--<v-btn type="submit" color="primary">Register</v-btn>-->
                        <v-btn color="primary" @click="onClickRegister">Register</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
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

    public created() {
        console.log("Register component created");
    }

    public destroyed() {
        console.log("Register component destroyed");
    }

    public onClickRegister(): void {
        console.log("Click Register");
        this.$store.dispatch("register", {
            username: this.username,
            email: this.email,
            password: this.password
        } as IUser);
    }
}
</script>