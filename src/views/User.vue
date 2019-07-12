<template>
    <v-container v-if="!loading.enable" fluid>
        <v-layout align-center column>
            <v-flex class="text-xs-center">
                <v-avatar size="150">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" />
                </v-avatar>
                <h1>{{user.username}}</h1>
            </v-flex>
            <v-flex>
                <v-btn v-if="!alreadyFollow" @click="follow">Follow</v-btn>
                <v-btn v-else @click="unfollow">Unfollow</v-btn>
                <v-btn v-if="currentUser.type >= typeKnownArtist  && !alreadyHiglighting" @click="highlight">Soutenir</v-btn>
                <v-btn v-if="currentUser.type >= typeKnownArtist  && alreadyHiglighting" @click="unhighlight">Ne plus soutenir</v-btn>
            </v-flex>
        </v-layout>

        <v-data-table :items="musics" :headers="headers" hide-actions class="ma-3">
            <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.musicKind.name }}</td>
                <td>{{ props.item.location }}</td>
                <td>{{ props.item.releaseDate }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small class="ma-2" @click="playMusic(props.item)">play_arrow</v-icon>
                    <v-menu v-model="menu" :close-on-content-click="false">
                        <template v-slot:activator="{ on }">
                            <v-icon
                                small
                                class="ma-2"
                                v-on="on"
                                @click="loadPlaylist(props.item)"
                            >playlist_add</v-icon>
                        </template>
                        <v-card>
                            <v-card-text>
                                <v-combobox
                                    v-model="selectedPlaylist"
                                    width="150px"
                                    :items="playlists"
                                    item-text="name"
                                    label="Choisissez la playlist"
                                    return-object
                                    :loading="loadingCombobox"
                                    @change="onChangeCombobox"
                                ></v-combobox>
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IUser, ILoading, IMusic, IPlaylist, TypeUser } from "../store/types";
import { State } from "vuex-class";
import { AxiosResponse } from "axios";
import { HttpError } from "../store/errors";
@Component
export default class User extends Vue {
    @State("User") currentUser!: IUser;
    @State("Loading") loading!: ILoading;

    public user!: IUser;
    public alreadyFollow: boolean = false;
    public alreadyHiglighting: boolean = false;

    private musics: IMusic[] = [];
    private headers: any = [
        { text: "Titre", align: "left", sortable: false, value: "title" },
        { text: "Genre", sortable: false, value: "musicKind" },
        { text: "Location", sortable: false, value: "location" },
        { text: "Date de sortie", sortable: false, value: "releaseDate" },
        { text: "Actions", sortable: false }
    ];

    private menu: boolean = false;
    private selectedPlaylist: string = "";
    private playlists: Array<IPlaylist> = [];
    private loadingCombobox: boolean = false;
    // Variable temporaire pour stocker la musique
    // selectionné lors du clique sur l'ajout en playlist
    private tempMusicSelected!: IMusic;
    private typeKnownArtist = TypeUser.KNOWN_ARTIST;

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");

            const [user, alreadyFollowing, musics, alreadyHiglighting] = await Promise.all([
                this.getUser(),
                this.iAmFollowing(),
                this.getMusicsFromUser(),
                this.iAmHiglighting()
            ]);
            console.log("not this", musics);
            this.user = user.data;
            this.alreadyFollow = alreadyFollowing;
            this.alreadyHiglighting = alreadyHiglighting;
            this.musics = musics;
            console.log("this", this.musics);
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

    public async getUser(): Promise<AxiosResponse<IUser>> {
        return await this.$http.get<IUser>(
            `/accounts/${this.$route.params.id}`
        );
    }

    public async iAmFollowing(): Promise<boolean> {
        try {
            const { data } = await this.$http.get<any>(
                `/accounts/${this.currentUser.userId}/following/${this.$route.params.id}`
            );
            console.log("iAmFollowing", data);
            return true;
        } catch (err) {
            if (err instanceof HttpError) {
                if (err.status == 404) return false;
                // Si l'utilisateur courrant ne suit pas l'utilisateur
                else if (err.status != 404) return true;
                else throw err;
            } else {
                throw err;
            }
        }
    }

    public async getMusicsFromUser(): Promise<Array<IMusic>> {
        try {
            const musics = await this.$http.get<Array<IMusic>>(`/Music`, {
                params: {
                    filter: {
                        where: {
                            accountId: this.$route.params.id
                        },
                        include: "musicKind"
                    }
                }
            });
            console.log("Musics", musics);
            return musics.data;
        } catch (err) {
            throw err;
        }
    }

    public async follow(): Promise<void> {
        try {
            await this.$http.put<any>(
                `/accounts/${this.currentUser.userId}/following/rel/${this.$route.params.id}`
            );

            this.alreadyFollow = true;
        } catch (err) {
            throw err;
        }
    }

    public async unfollow(): Promise<void> {
        try {
            await this.$http.delete(
                `/accounts/${this.currentUser.userId}/following/rel/${this.$route.params.id}`
            );

            this.alreadyFollow = false;
        } catch (err) {
            throw err;
        }
    }

    public playMusic(music: IMusic): void {}

    public async loadPlaylist(music: IMusic): Promise<void> {
        try {
            this.tempMusicSelected = music;
            this.loadingCombobox = true;
            const { data } = await this.$http.get<Array<IPlaylist>>(
                `/accounts/${this.currentUser.userId}/playlists`
            );
            this.playlists = data;
            this.loadingCombobox = false;
        } catch (err) {
            throw err;
        }
    }

    public async onChangeCombobox(playlist: IPlaylist): Promise<void> {
        try {
            this.loadingCombobox = true;
            const { data } = await this.$http.put<IMusic>(
                `/accounts/${this.currentUser.userId}/playlists/${playlist.id}/musics/rel/${this.tempMusicSelected.id}`
            );
        } catch (err) {
            throw err;
        } finally {
            this.loadingCombobox = false;
            this.menu = false;
        }
    }

    private async iAmHiglighting(): Promise<boolean> {
        try {
            const { data } = await this.$http.get<any>(
                `/accounts/${this.currentUser.userId}/highlight/${this.$route.params.id}`
            );
            return true;
        } catch (err) {
            if (err instanceof HttpError) {
                if (err.status == 404) return false;
                // Si l'utilisateur courrant ne suit pas l'utilisateur
                else if (err.status != 404) return true;
                else throw err;
            } else {
                throw err;
            }
        }
    }

    private async highlight(): Promise<void> {
        try {
            await this.$http.put<any>(
                `/accounts/${this.currentUser.userId}/highlight/rel/${this.$route.params.id}`
            );

            this.alreadyHiglighting = true;
        } catch (err) {
            throw err;
        }
    }

    private async unhighlight(): Promise<void> {
        try {
            await this.$http.delete(
                `/accounts/${this.currentUser.userId}/highlight/rel/${this.$route.params.id}`
            );

            this.alreadyHiglighting = false;
        } catch (err) {
            throw err;
        }
    }
}
</script>