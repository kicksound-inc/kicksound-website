<template>
    <v-navigation-drawer 
    fixed 
    v-model="drawer.enable"
    disable-resize-watcher
    :temporary="drawer.temporary"
    :dark="drawer.dark"
    app>
        <v-list class="pa-1">
            <v-list-tile avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Kicksound</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>Connexion</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
                <v-list-tile-content>
                    <v-list-tile-title>Inscription</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";
import { IDrawer } from "@/store/types";

@Component
export default class Drawer extends Vue {
    @State("Drawer") drawer!: IDrawer;
}
</script>
