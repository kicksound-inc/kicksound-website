<template>
        <div>
        <v-toolbar id="test" flat class="transparent">
            <v-toolbar-title class="mr-4">Paramètres</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
                <v-btn flat exact to="/settings/account">Compte</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat exact to="/settings/password">Mot de passe</v-btn>
                <v-divider vertical></v-divider>
                <v-btn v-if="user.type" flat exact to="/settings/musics">Musiques</v-btn>
                <v-divider v-if="user.type" vertical></v-divider>
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
import { State } from 'vuex-class';
import { IUser } from '@/store/types';

@Component
export default class Settings extends Vue {
    @State("User") user!: IUser;

}
</script>