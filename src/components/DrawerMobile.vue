<template>
    <v-navigation-drawer
        fixed
        right
        temporary
        v-model="drawer.enableMobile"
        disable-resize-watcher
        :dark="drawer.dark"
        app
    >
        <v-list class="pa-1">
            <v-list-tile avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Kicksound</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list v-if="!isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/login">
                <v-list-tile-content>
                    <v-list-tile-title>Connexion</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="!isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/register">
                <v-list-tile-content>
                    <v-list-tile-title>Inscription</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/">
                <v-list-tile-content>
                    <v-list-tile-title>Parcourir</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/playlist">
                <v-list-tile-content>
                    <v-list-tile-title>Playlist</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/events">
                <v-list-tile-content>
                    <v-list-tile-title>Events</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/lives">
                <v-list-tile-content>
                    <v-list-tile-title>Lives</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="isAuthenticated" class="pt-0" dense>
            <v-list-tile to="/lives">
                <v-list-tile-content>
                    <v-list-tile-title>Profile</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list v-if="isAuthenticated" class="pt-0" dense>
            <v-list-tile @click="onClickLogout">
                <v-list-tile-content>
                    <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import { IDrawer, IUser, IDrawerItem } from "@/store/types";

@Component
export default class DrawerMobile extends Vue {
    @State("Drawer") drawer!: IDrawer;
    @State("User") user!: IUser;
    @Getter("isAuthenticated") isAuthenticated!: boolean;

    public onClickLogout() {
        console.log("OnClickLogout");
        this.$store
            .dispatch("logout")
            .then(response => {
                console.log("Logout successful");
                this.$router.push({ name: "Login" });
            })
            .catch(error => {
                console.error("Logout error");
            });
    }
}
</script>
