<template>
    <div v-if="!loading.enable">
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="mr-4">{{musicKind.name}}</v-toolbar-title>
            <v-divider vertical></v-divider>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container fluid>
            <v-layout column>
                <v-flex>
                    <h1>Musiques du style {{musicKind.name}}</h1>
                </v-flex>
                <v-flex ma-2>
                    <v-data-table
                        :items="musics"
                        :headers="headers"
                        hide-actions
                    >
                        <template v-slot:items="props">
                            <td>{{ props.item.title }}</td>
                            <td>{{ props.item.location }}</td>
                            <td>{{ props.item.releaseDate }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon small class="ma-2" @click="playMusic(props.item)">play_arrow</v-icon>
                                <v-icon
                                    v-if="canDelete"
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
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IUser, IMusicKind, ILoading, IMusic } from "../../store/types";
import { AxiosResponse } from "axios";

@Component
export default class DiscoveryDetails extends Vue {
    @State("Loading") loading!: ILoading;
    @State("User") user!: IUser;

    private musicKind!: IMusicKind;
    private musics: Array<IMusic> = [];
    private headers: any = [
        { text: "Titre", align: "left", sortable: false, value: "title" },
        { text: "Location", sortable: false, value: "location" },
        { text: "Date de sortie", sortable: false, value: "releaseDate" },
        { text: "Actions", sortable: false }
    ];
    
    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");
            const [musicKind, musics] = await Promise.all([
                this.getMusicKind(),
                this.getMusics()
            ]);
            this.musicKind = musicKind.data;
            this.musics = musics.data;
        } catch (err) {
            throw err;
        } finally {
            this.$store.commit("setLoadingDisable");
        }
    }

    private async getMusicKind(): Promise<AxiosResponse<IMusicKind>> {
        try {
            return await this.$http.get<IMusicKind>(
                `/musicKinds/${this.$route.params.genreId}`
            );
        } catch (err) {
            throw err;
        }
    }

    private async getMusics(): Promise<AxiosResponse<Array<IMusic>>> {
        try {
            return await this.$http.get<Array<IMusic>>(
                `/Music`,
                {
                    params: {
                        filter: {
                            where: {
                                musicKindId: this.$route.params.genreId
                            }
                        }
                    }
                }
            );
        } catch (err) {
            throw err;
        }
    }

    public async playMusic(music: IMusic): Promise<void> {
        console.log(music);
        this.$store.commit("setMusicsList", {
            musics: this.musics,
            musicSelected: music
        });
    }
}
</script>
