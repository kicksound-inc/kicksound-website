<template>
    <v-layout align-center column id="tez">
        <v-flex ma-3 id="flexForm">
            <form>
                <v-text-field
                    box
                    prepend-icon="lock"
                    name="currentPassword"
                    label="Current Password"
                    id="currentPassword"
                    type="password"
                    v-model="currentPassword"
                ></v-text-field>
                <v-text-field
                    box
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="password"
                ></v-text-field>
                <v-text-field
                    box
                    prepend-icon="lock"
                    name="verif-password"
                    label="Verify Password"
                    id="verif-password"
                    type="password"
                    v-model="passwordVerified"
                ></v-text-field>
                <v-layout justify-end>
                    <v-btn outline flat color="normal" class="ma-0">Enregistrer</v-btn>
                </v-layout>
            </form>
        </v-flex>
    </v-layout>
</template>

<style scoped>
#flexForm {
    width: 600px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Password extends Vue {
    private currentPassword: string = "";
    private password: string = "";
    private passwordVerified: string = "";
}
</script>