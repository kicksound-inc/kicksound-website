<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field 
                        prepend-icon="person" 
                        name="login" 
                        label="Login" 
                        type="text"></v-text-field>
                        <v-text-field
                            prepend-icon="lock"
                            name="password"
                            label="Password"
                            id="password"
                            type="password"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>
