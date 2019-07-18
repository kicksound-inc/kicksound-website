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
                    <Artist :artist="artist" />
                </v-flex>
            </v-layout>

            <h1>Musiques</h1>
            <v-layout wrap>
                <v-flex v-if="!search.musics.length">Aucune musiques trouvées</v-flex>
                <v-flex v-for="music in search.musics" :key="music.id" pa-2 xs12 sm6 md4 lg2>
                    <Music :music="music" />
                </v-flex>
            </v-layout>

            <h1>Playlists</h1>
            <v-layout wrap>
                <v-flex v-if="!search.playlists.length">Aucune playlists trouvées</v-flex>
                <v-flex
                    v-for="playlist in search.playlists"
                    :key="playlist.id"
                    xs12
                    sm6
                    md4
                    lg2
                    pa-2
                >
                    <Playlist :playlist="playlist" />
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
import Playlist from "@/components/Playlist.vue";
import Music from "@/components/Music.vue";
import Artist from "@/components/Artist.vue";

@Component({
    components: {
        Playlist,
        Music,
        Artist
    }
})
export default class AllSearch extends Vue {
    @State("Search") search!: ISearch;

    public created() {
        console.log(this.search);
    }
}
</script>
