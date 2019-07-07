<template>
    <div>
        <h1>Tout</h1>
        <v-container fluid>
            <h1>Artistes</h1>
            <v-layout>
                <v-flex
                    v-for="artist in search.users"
                    :key="artist.id"
                    shrink
                    class="text-xs-center"
                >
                    <v-card class="ma-2" :to="`/user/${artist.id}`">
                        <v-card-text>
                            <v-avatar size="150">
                                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" />
                            </v-avatar>
                            <h2>{{artist.username}}</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>

            <h1>Musiques</h1>
            <v-layout>
                <v-flex>
                    <h1>The Score - Miracle par The Score</h1>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { ISearch } from "../../store/types";

@Component
export default class AllSearch extends Vue {
    @State("Search") search!: ISearch;

    public created() {
        console.log(this.search);
    }
}
</script>
