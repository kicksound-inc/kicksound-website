<template>
    <v-toolbar fixed app>
        <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="onClickDrawer"></v-toolbar-side-icon>
        <v-spacer v-if="!isAuthenticated"></v-spacer>
        <v-toolbar-title>
            <router-link to="/" class="title-custom">Kicksound</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="isAuthenticated" class="hidden-xs-only">
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
import { State, Getter } from "vuex-class";
import { IDrawer, IRootState, IUser } from "@/store/types";

@Component
export default class Toolbar extends Vue {
    @State(state => state) root!: IRootState;
    @State("Drawer") drawer!: IDrawer;
    @State("User") user!: IUser;
    @Getter("isAuthenticated") isAuthenticated!: boolean;

    onClickDrawer(): void {
        this.$store.commit("switch");
    }

    onClickLogout() {
        console.log("OnClickLogout");
        this.$store.dispatch("logout")
        .then((response) => {
            console.log("Logout successful");
            this.$router.push({name: "Login"});
        })
        .catch((error) => {
            console.error("Logout error");
        });

    }
}
</script>
