<template>
    <v-toolbar fixed app>
        <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="onClickDrawer"></v-toolbar-side-icon>
        <v-toolbar-title>
            <router-link to="/" class="title-custom">Kicksound {{ root.version }}</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!user.token" class="hidden-xs-only">
            <v-btn to="/login" flat>Connexion</v-btn>
            <v-btn to="/register" flat>Inscription</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else class="hidden-xs-only">
            <v-btn flat>{{ user.username }}</v-btn>
            <v-btn flat @click="onClickLogout">Logout</v-btn>
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
import { IDrawer, IRootState, IUser } from "@/store/types";

@Component
export default class Toolbar extends Vue {
    @State(state => state) root!: IRootState;
    @State("Drawer") drawer!: IDrawer;
    @State("User") user!: IUser;

    onClickDrawer(): void {
        this.$store.commit("switch");
    }

    onClickLogout() {
        console.log("OnClickLogout");
        this.$store.dispatch("logout")
        .then((response) => {
            console.log("Logout successful");
            this.$router.push({name: "Home"});
        })
        .catch((error) => {
            console.error("Logout error");
        });

    }
}
</script>
