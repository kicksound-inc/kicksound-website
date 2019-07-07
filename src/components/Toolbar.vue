<template>
    <div>
        <v-toolbar v-if="!isAuthenticated" fixed app>
            <v-layout align-center>
                <v-flex xs3></v-flex>
                <v-flex xs6 text-xs-center>
                    <v-toolbar-title>
                        <router-link to="/" class="title-custom">Kicksound</router-link>
                    </v-toolbar-title>
                </v-flex>
                <v-flex xs3 text-xs-right>
                    <v-toolbar-side-icon class="hidden-sm-and-up" @click="onClickDrawerMobile"></v-toolbar-side-icon>
                </v-flex>
            </v-layout>
        </v-toolbar>
        <v-toolbar v-else fixed clipped-left app>
            <v-toolbar-side-icon class="hidden-xs-only" @click="onClickDrawerDesktop"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" class="title-custom">Kicksound</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-form id="searchbar" @submit.prevent="onClickSearch">
                <v-autocomplete
                    :append-icon="null"
                    :search-input.sync="search"
                    cache-items
                    flat
                    hide-no-data
                    hide-details
                    clearable
                    label="Search"
                    deletable-chips
                    prepend-inner-icon="search"
                    solo-inverted
                ></v-autocomplete>
            </v-form>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if="isAuthenticated" class="hidden-xs-only">
                <v-btn flat to="/settings">{{ user.username }}</v-btn>
                <v-btn flat @click="onClickLogout">Logout</v-btn>
            </v-toolbar-items>
            <v-toolbar-side-icon class="hidden-sm-and-up" @click="onClickDrawerMobile"></v-toolbar-side-icon>
        </v-toolbar>
    </div>
</template>

<style scoped>
.title-custom {
    color: inherit;
    text-decoration: none;
}

#searchbar {
    width: 800px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation } from "vuex-class";
import {
    IDrawer,
    IRootState,
    IUser,
    TypeMessage,
    ISnackbar
} from "@/store/types";
import { HttpError } from "@/store/errors";

@Component
export default class Toolbar extends Vue {
    @State(state => state) root!: IRootState;
    @State("Drawer") drawer!: IDrawer;
    @State("User") user!: IUser;
    @Getter("isAuthenticated") isAuthenticated!: boolean;

    private search: string = "";

    private onClickDrawerDesktop(): void {
        this.$store.commit("switchMini");
    }

    private onClickDrawerMobile(): void {
        this.$store.commit("switchMobile");
    }

    private async onClickLogout() {
        console.log("OnClickLogout");
        const response = await this.$store.dispatch("logout");
        console.log("Logout successful");
        this.$router.push({ name: "Login" });
    }

    private async onClickSearch() {
        if(!this.search) return;
        this.$router.push({ name: "AllSearch", params: {searchInput: this.search} });
    }

    @Watch("search")
    private onSearchChange(val: string, oldVal: string) {
        //console.log(val);
    }
}
</script>
