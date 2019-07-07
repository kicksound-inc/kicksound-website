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
            </v-flex>
        </v-layout>

        <v-data-table :items="musics" :headers="headers" hide-actions>
            <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.location }}</td>
                <td>{{ props.item.releaseDate }}</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IUser, ILoading, IMusic } from "../store/types";
import { State } from "vuex-class";
import { AxiosResponse } from "axios";
import { HttpError } from "../store/errors";

@Component
export default class User extends Vue {
    @State("User") currentUser!: IUser;
    @State("Loading") loading!: ILoading;

    public user!: IUser;
    public alreadyFollow: boolean = false;

    private musics: IMusic[] = [];
    private headers: any = [
        { text: "Titre", align: "left", sortable: false, value: "title" },
        { text: "Location", sortable: false, value: "location" },
        { text: "Date de sortie", sortable: false, value: "releaseDate" }
    ];

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");

            const [user, alreadyFollowing, musics] = await Promise.all([
                this.getUser(),
                this.iAmFollowing(),
                this.getMusicsFromUser()
            ]);

            this.user = user.data;
            this.alreadyFollow = alreadyFollowing;
            this.musics = musics;
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
                if (err.status == 404) return false; // Si l'utilisateur courrant ne suit pas l'utilisateur
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
                        }
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
                `accounts/${this.currentUser.userId}/following/rel/${this.$route.params.id}`
            );

            this.alreadyFollow = true;
            console.log(this.alreadyFollow);
        } catch (err) {
            throw err;
        }
    }

    public async unfollow(): Promise<void> {
        try {
            await this.$http.delete(
                `accounts/${this.currentUser.userId}/following/rel/${this.$route.params.id}`
            );

            this.alreadyFollow = false;
        } catch (err) {
            throw err;
        }
    }
}
</script>