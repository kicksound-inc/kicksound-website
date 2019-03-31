<template>
    <v-navigation-drawer 
    fixed 
    v-model="drawer.drawer"
    :temporary="drawer.temporary"
    :dark="drawer.dark"
    :right="drawer.right"
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

            <v-list-tile @click="onClickConnexion()">
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
    /*@Prop({
        type: Boolean,
        default: false
    }) temporary!: boolean;*/
    @State("Drawer") drawer!: IDrawer;

    onClickConnexion(): void {
        this.$store.commit("changeOptions", {
            temporary: true,
            dark: true,
            right: true
        } as IDrawer)
    }
}
</script>
