<template>
    <div>
        <v-toolbar flat class="transparent">
            <v-toolbar-title class="mr-4">Découverte</v-toolbar-title>
            <v-divider vertical></v-divider>
        </v-toolbar>
        <v-divider></v-divider>

        <v-container fluid v-if="!loading">
            <v-layout wrap justify-center ma-4>
                <v-flex v-for="musicKind in musicKinds" :key="musicKind.id" pa-2 xs12 sm6 md3 lg2>
                    <v-card :to="`/discovery/${musicKind.id}`">
                        <v-img
                            :aspect-ratio="1/1"
                            src="https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                        >
                            <v-container fill-height fluid>
                                <v-layout align-center justify-center fill-height>
                                    <v-flex shrink>
                                        <span class="headline white--text">{{musicKind.name}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
            <h1>Suggestion Artiste</h1>
            <v-layout>
                <v-flex v-if="!usersSuggested.length">Aucun artistes trouvés</v-flex>
                <v-flex v-else v-for="user in usersSuggested" :key="user.id" shrink class="text-xs-center">
                    <Artist :artist="user"/>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMusicKind, IUser } from "@/store/types";
import { AxiosResponse } from "axios";
import { State } from "vuex-class";
import Artist from "@/components/Artist.vue";

@Component({
    components: {
        Artist
    }
})
export default class Discovery extends Vue {
    @State("User") user!: IUser;

    private musicKinds: Array<IMusicKind> = [];
    private usersSuggested: Array<IUser> = [];

    private rowsPerPageItems: Array<number> = [4, 10, 12];
    private pagination: any = {
        rowsPerPage: 3
    };

    private loading: boolean = false;

    public async created() {
        try {
            this.loading = true;
            const [musicKinds, userSuggestion] = await Promise.all([
                this.getMusicKinds(),
                this.getUserSuggestion()
            ]);
            this.loading = false;

            this.musicKinds = musicKinds.data;
            this.usersSuggested = userSuggestion.data;
        } catch (err) {
            throw err;
        }
    }

    private async getMusicKinds(): Promise<AxiosResponse<Array<IMusicKind>>> {
        try {
            return await this.$http.get<Array<IMusicKind>>(`/musicKinds`);
        } catch (err) {
            throw err;
        }
    }

    private async getUserSuggestion(): Promise<AxiosResponse<Array<IUser>>> {
        try {
            return await this.$http.get<Array<IUser>>(
                `/accounts/${this.user.userId}/unknownArtistsByArtistFollowed`
            );
        } catch (err) {
            throw err;
        }
    }
}
</script>