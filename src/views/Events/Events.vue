<template>
    <div>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="mr-4">Événements</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
                <v-btn flat exact to="/events">Abonnements</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat exact to="/events/my">Mes événements</v-btn>
                <v-divider vertical></v-divider>
                <v-btn v-if="!user.type" flat exact to="/events/gestion">Gérer</v-btn>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IEvent, IUser } from "@/store/types";

@Component
export default class Events extends Vue {
    @State("User") user!: IUser;

}
</script>