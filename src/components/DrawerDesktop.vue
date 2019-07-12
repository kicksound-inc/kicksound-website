<template>
    <v-navigation-drawer
        fixed
        left
        stateless
        clipped
        v-model="drawer.enableDesktop"
        disable-resize-watcher
        width="230"
        :dark="drawer.dark"
        app
        :mini-variant="drawer.enableMini"
    >
        <v-list class="pt-0" dense>
            <v-list-tile to="/">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Découverte</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-list-tile to="/playlists">
                <v-list-tile-action>
                    <v-icon>library_music</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Playlist</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-list-tile to="/events">
                <v-list-tile-action>
                    <v-icon>event</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Events</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-list-tile to="/lives">
                <v-list-tile-action>
                    <v-icon>videocam</v-icon>
                </v-list-tile-action>
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
