<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg4>
                <v-card>
                    <v-form>
                        <v-card-text>
                            <v-text-field
                                prepend-icon="person"
                                name="login"
                                label="Login"
                                type="text"
                                v-model="username"
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="lock"
                                name="password"
                                label="Password"
                                id="password"
                                type="password"
                                v-model="password"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="onClickLogin">Login</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Provide } from "vue-property-decorator";
import { IUser } from "../store/types";

@Component
export default class Login extends Vue {
    @Provide() private username: string = "";
    @Provide() private password: string = "";

    public created() {
        console.log("Login component created");
    }

    public destroyed() {
        console.log("Login component destroyed");
    }

    public onClickLogin(): void {
        console.log("Click login");
        this.$store.dispatch("login", {
            username: this.username,
            password: this.password
        } as IUser).then((response) => {
            console.log("onClickLogin response : ", response);
            this.$router.push({name: "Dashboard"});
        }).catch((error) => {
            console.error("onClickLogin error : ", error);
        });
    }
}
</script>
