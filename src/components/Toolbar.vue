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
                <v-btn flat>{{ user.username }}</v-btn>
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
import { Component, Provide, Watch } from "vue-property-decorator";
import { State, Getter } from "vuex-class";
import { IDrawer, IRootState, IUser } from "@/store/types";

@Component
export default class Toolbar extends Vue {
    @State(state => state) root!: IRootState;
    @State("Drawer") drawer!: IDrawer;
    @State("User") user!: IUser;
    @Getter("isAuthenticated") isAuthenticated!: boolean;

    private search: string | null = null;

    onClickDrawerDesktop(): void {
        this.$store.commit("switchMini");
    }

    onClickDrawerMobile(): void {
        this.$store.commit("switchMobile");
    }

    onClickLogout() {
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

    onClickSearch() {
        alert("Search : " + this.search);
    }

    @Watch("search")
    onSearchChange(val: string, oldVal: string) {
        console.log(val);
    }

}
</script>
