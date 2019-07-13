<template>
    <div>
        <v-toolbar id="test" flat class="transparent">
            <v-toolbar-title class="mr-4">Playlists</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container>
            <v-layout wrap>
                <v-flex shrink ma-2>
                    <v-dialog v-model="dialog" max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-card v-on="on" height="100%" width="250" class="add">
                                <v-card-text style="height: 100%">
                                    <v-layout align-center justify-center fill-height>
                                        <v-icon size="50px">add</v-icon>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </template>
                        <v-card>
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Creation Playlist</v-toolbar-title>
                            </v-toolbar>
                            <form
                                ref="creationPlaylistForm"
                                @submit.prevent="onClickCreatePlaylist"
                            >
                                <v-card-text>
                                    <v-container grid-list-md pb-0>
                                        <v-layout wrap>
                                            <v-flex xs12>
                                                <v-text-field
                                                    box
                                                    label="Nom*"
                                                    v-validate="'required'"
                                                    name="name"
                                                    type="text"
                                                    v-model="name"
                                                    :error-messages="errors.collect('name')"
                                                ></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn outline color="blue darken-1" flat @click="reset">Reset</v-btn>
                                    <v-btn
                                        outline
                                        color="blue darken-1"
                                        flat
                                        @click="dialog = false"
                                    >Close</v-btn>
                                    <v-btn
                                        outline
                                        :loading="loadingBtn"
                                        color="blue darken-1"
                                        flat
                                        type="submit"
                                    >Save</v-btn>
                                </v-card-actions>
                            </form>
                        </v-card>
                    </v-dialog>
                </v-flex>
                <v-flex v-for="playlist in playlists" :key="playlist.id" shrink ma-2>
                    <v-card height="100%" width="250" :to="`/playlist/${playlist.id}`">
                        <v-img
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

<style scoped>
.add {
    border: 1px dashed;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IPlaylist, IUser } from "@/store/types";
import { State } from "vuex-class";

@Component({
    $_veeValidate: { validator: "new" }
})
export default class Playlist extends Vue {
    @State("User") user!: IUser;

    private dialog: boolean = false;
    private name: string = "";
    private playlists: Array<IPlaylist> = [];
    private loadingBtn: boolean = false;

    $refs!: {
        creationPlaylistForm: HTMLFormElement;
    };

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");

            const { data } = await this.$http.get<Array<IPlaylist>>(
                `/accounts/${this.user.userId}/playlists`
            );
            this.playlists = data;
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

    public async onClickCreatePlaylist(): Promise<void> {
        if (await this.$validator.validate()) {
            this.loadingBtn = true;
            try {
                const { data } = await this.$http.post<IPlaylist>(
                    `/accounts/${this.user.userId}/playlists`,
                    {
                        name: this.name,
                        disabled: false,
                        accountId: this.user.userId
                    } as IPlaylist
                );
                this.playlists.push(data);
            } catch (err) {
                throw err;
            } finally {
                this.loadingBtn = false;
                this.reset();
                this.dialog = false;
            }
        }
    }

    public reset(): void {
        this.name = "";
        this.$validator.reset();
        this.$refs.creationPlaylistForm.reset();
    }
}
</script>