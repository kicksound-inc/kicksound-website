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
                                <img src="https://www.w3schools.com/howto/img_avatar.png" />
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
                    <Music :music="music"/>
                </v-flex>
            </v-layout>

            <h1>Playlists</h1>
            <v-layout wrap>
                <v-flex v-if="!search.playlists.length">Aucune playlists trouvées</v-flex>
                <v-flex v-for="playlist in search.playlists" :key="playlist.id" shrink ma-2>
                    <Playlist :playlist="playlist"/>
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

@Component({
    components: {
        Playlist,
        Music
    }
})
export default class AllSearch extends Vue {
    @State("Search") search!: ISearch;

    public created() {
        console.log(this.search);
    }
}
</script>
