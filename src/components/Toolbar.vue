<template>
    <v-toolbar fixed app>
        <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="onClickDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>
            <router-link to="/" class="title-custom">Kicksound {{ root.version }}</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn to="/login" flat>Connexion</v-btn>
            <v-btn to="/register" flat>Inscription</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<style scoped>
.title-custom {
    color: inherit;
    text-decoration: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IDrawer, IRootState } from "@/store/types";

@Component
export default class Toolbar extends Vue {
    @State(state => state) root!: IRootState;
    @State("Drawer") drawer!: IDrawer;

    onClickDrawer(): void {
        this.$store.commit("switch");
    }
}
</script>
