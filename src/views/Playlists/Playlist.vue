<template>
    <v-container fluid v-if="!loading.enable">
        <v-layout column>
            <v-layout row>
                <v-flex shrink ma-4>
                    <v-img
                        height="100%"
                        width="250"
                        src="https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/264x264-000000-80-0-0.jpg"
                    />
                </v-flex>
                <v-flex shrink ma-4>
                    <h1 class="headline">{{playlist.name}}</h1>
                    <span class="subheading">par {{playlist.account.username}}</span>
                </v-flex>
            </v-layout>
            <v-flex>
                <v-data-table :items="musics" :headers="headers" hide-actions :loading="loadingTable">
                    <template v-slot:items="props">
                        <td>{{ props.item.title }}</td>
                        <td>{{ props.item.musicKind.name }}</td>
                        <td>{{ props.item.location }}</td>
                        <td>{{ props.item.releaseDate }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon small class="ma-2" @click="playMusic(props.item)">play_arrow</v-icon>
                            <v-icon
                                small
                                class="ma-2"
                                @click="deleteMusicFromPlaylist(props.item)"
                            >delete</v-icon>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMusic, IPlaylist, ILoading, IUser } from "../../store/types";
import { AxiosResponse } from "axios";
import { State } from "vuex-class";

@Component
export default class Playlist extends Vue {
    @State("Loading") loading!: ILoading;
    @State("User") user!: IUser;

    private playlist!: IPlaylist;
    private musics: Array<IMusic> = [];
    private headers: any = [
        { text: "Titre", align: "left", sortable: false, value: "title" },
        { text: "Genre", sortable: false, value: "musicKind" },
        { text: "Location", sortable: false, value: "location" },
        { text: "Date de sortie", sortable: false, value: "releaseDate" },
        { text: "Actions", sortable: false }
    ];
    private loadingTable: boolean = false;

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");

            const [playlist, musics] = await Promise.all([
                this.getPlaylist(),
                this.getMusics()
            ]);

            this.musics = musics.data;
            this.playlist = playlist.data;
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

    private async getPlaylist(): Promise<AxiosResponse<IPlaylist>> {
        try {
            return await this.$http.get<IPlaylist>(
                `/Playlists/${this.$route.params.id}`,
                {
                    params: {
                        filter: {
                            include: "account"
                        }
                    }
                }
            );
        } catch (err) {
            throw err;
        }
    }

    private async getMusics(): Promise<AxiosResponse<Array<IMusic>>> {
        try {
            this.loadingTable = true;
            return await this.$http.get<Array<IMusic>>(
                `/Playlists/${this.$route.params.id}/musicWithArtist`
            );
        } catch (err) {
            throw err;
        } finally {
            this.loadingTable = false;
        }
    }

    private async playMusic(music: IMusic): Promise<void> {
        console.log(music);
        this.$store.commit("setMusicsList", {
            musics: this.musics,
            musicSelected: music
        });
    }

    private async deleteMusicFromPlaylist(music: IMusic): Promise<void> {
        try {
            this.loadingTable = true;
            const { data } = await this.$http.delete(
                `/accounts/${this.user.userId}/playlists/${this.$route.params.id}/musics/rel/${music.id}`
            );
            this.$delete(this.musics, this.musics.indexOf(music, 0));
        } catch (err) {
            throw err;
        } finally {
            this.loadingTable = false;
        }
    }
}
</script>
