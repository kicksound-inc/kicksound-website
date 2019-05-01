<template>
    <v-navigation-drawer
        fixed
        left
        clipped
        v-model="drawer.enableDesktop"
        disable-resize-watcher
        :dark="drawer.dark"
        app
    >
        <v-list class="pt-0" dense>
            <v-list-tile to="/">
                <v-list-tile-content>
                    <v-list-tile-title>Accueil</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-list-tile to="/playlist">
                <v-list-tile-content>
                    <v-list-tile-title>Playlist</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-list-tile to="/events">
                <v-list-tile-content>
                    <v-list-tile-title>Events</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-list-tile to="/lives">
                <v-list-tile-content>
                    <v-list-tile-title>Lives</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import { IDrawer, IUser, IDrawerItem } from "@/store/types";

@Component
export default class DrawerDesktop extends Vue {
    @State("Drawer") drawer!: IDrawer;
    @State("User") user!: IUser;
    @Getter("isAuthenticated") isAuthenticated!: boolean;

}
</script>
