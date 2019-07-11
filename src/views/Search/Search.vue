<template>
    <div>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="mr-4">Résultat de recherche pour "{{search.searchInput}}"</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
                <v-btn flat exact :to="`/search/${$route.params.searchInput}`">Tout</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat exact :to="`/search/${$route.params.searchInput}/musics`">Musiques</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat exact :to="`/search/${$route.params.searchInput}/artists`">Artistes</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat exact :to="`/search/${$route.params.searchInput}/playlists`">Playlists</v-btn>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Action, State } from 'vuex-class';
import { ISearch } from '../../store/types';

@Component
export default class Search extends Vue {

    @State("Search") search!: ISearch;
    @Action("search") actionSearch!: (search: string) => void;

    public async created(): Promise<void> {
        this.getData();
    }

    @Watch("$route.params.searchInput")
    public onSearchInputChange(oldVal: string, newVal: string) {
        this.getData();
    }

    public async getData(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");
            this.$store.commit("setSearchInput", this.$route.params.searchInput);
            await this.actionSearch(this.$route.params.searchInput);
        } catch(err) {
            throw err;
        }
        this.$store.commit("setLoadingDisable");
    }
}
</script>
