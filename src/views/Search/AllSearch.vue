<template>
    <div>
        <h1>Tout</h1>
        <v-container fluid>
            <h1>Artistes</h1>
            <v-layout wrap>
                <v-flex v-if="!search.users.length">Aucun artistes trouvés</v-flex>
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
            <v-layout wrap>
                <v-flex v-if="!search.musics.length">Aucune musiques trouvées</v-flex>
                <v-flex v-for="music in search.musics" :key="music.id" shrink ma-2>
                    <v-card>
                        <v-img
                            width="250"
                            src="https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/264x264-000000-80-0-0.jpg"
                        />
                        <v-card-title>
                            <div class="headline text-truncate">{{music.title}}</div>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>

            <h1>Playlists</h1>
            <v-layout wrap>
                <v-flex v-if="!search.playlists.length">Aucune playlists trouvées</v-flex>
                <v-flex v-for="playlist in search.playlists" :key="playlist.id" shrink ma-2>
                    <v-card :to="`/playlist/${playlist.id}`">
                        <v-img
                            width="250"
                            src="https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/264x264-000000-80-0-0.jpg"
                        />
                        <v-card-title>
                            <div class="headline text-truncate">{{playlist.name}}</div>
                        </v-card-title>
                    </v-card>
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
