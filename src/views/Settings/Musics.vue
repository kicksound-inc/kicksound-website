<template>
    <div>
        <h1>Musiques</h1>
        <v-data-table :items="musics" :headers="headers" hide-actions>
            <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.location }}</td>
                <td>{{ props.item.releaseDate }}</td>
                <td class="justify-center layout px-0">
                    <v-icon small @click="deleteMusic(props.item)">delete</v-icon>
                </td>
            </template>
        </v-data-table>

        <v-dialog v-model="dialogCreation" max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab dark fixed bottom right color="blue">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Creation événement</v-toolbar-title>
                </v-toolbar>
                <form ref="creationMusicForm" @submit.prevent="onClickCreateMusic">
                    <v-card-text>
                        <v-container grid-list-md pb-0>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        box
                                        label="Titre*"
                                        v-validate="'required'"
                                        name="title"
                                        type="text"
                                        v-model="title"
                                        :error-messages="errors.collect('title')"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-menu
                                        ref="menuDatePicker"
                                        v-model="datePicker"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="date"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                box
                                                v-model="date"
                                                label="Date"
                                                readonly
                                                v-on="on"
                                                v-validate="'required|date_format:yyyy-MM-dd'"
                                                name="date"
                                                type="text"
                                                :error-messages="errors.collect('date')"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="datePicker = false"
                                            >Cancel</v-btn>
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="$refs.menuDatePicker.save(date)"
                                            >OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-menu
                                        ref="menuTimePicker"
                                        v-model="timePicker"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="time"
                                        lazy
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                box
                                                v-model="time"
                                                label="Time"
                                                readonly
                                                v-on="on"
                                                v-validate="'required|date_format:kk:mm'"
                                                name="time"
                                                type="text"
                                                :error-messages="errors.collect('time')"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-model="time"
                                            format="24hr"
                                            no-title
                                            scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="timePicker = false"
                                            >Cancel</v-btn>
                                            <v-btn
                                                flat
                                                color="primary"
                                                @click="$refs.menuTimePicker.save(time)"
                                            >OK</v-btn>
                                        </v-time-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        box
                                        hide-details
                                        readonly
                                        browser-autocomplete="off"
                                        label="Musique*"
                                        v-validate="'required'"
                                        name="musicName"
                                        type="text"
                                        v-model="musicName"
                                        :error-messages="errors.collect('musicName')"
                                        @click="pickFile"
                                    ></v-text-field>
                                    <input
                                        type="file"
                                        style="display: none"
                                        ref="music"
                                        accept="audio/*"
                                        @change="onFilePicked"
                                    />
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
                            @click="dialogCreation = false"
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
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IMusic, IUser } from "../../store/types";
import { State } from "vuex-class";
import moment from "moment-timezone";

@Component({
    $_veeValidate: { validator: "new" }
})
export default class Musics extends Vue {
    @State("User") user!: IUser;

    private dialogCreation: boolean = false;
    private title: string = "";
    private datePicker: string = "";
    private date: string = "";
    private timePicker: string = "";
    private time: string = "";
    private musicName: string = "";
    private loadingBtn: boolean = false;

    private musicFile: File | null = null;
    private musics: IMusic[] = [];
    private headers: any = [
        { text: "Titre", align: "left", sortable: false, value: "title" },
        { text: "Location", sortable: false, value: "location" },
        { text: "Date de sortie", sortable: false, value: "releaseDate" },
        { text: "Actions", sortable: false }
    ];

    $refs!: {
        music: HTMLInputElement;
        creationMusicForm: HTMLFormElement;
    };

    public async created() {
        try {
            this.$store.commit("setLoadingEnable");
            const musics = await this.$http.get<Array<IMusic>>(`/Music`, {
                params: {
                    filter: {
                        where: {
                            accountId: this.user.userId
                        }
                    }
                }
            });
            console.log("Musics", musics);
            this.musics = musics.data;
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

    public async deleteMusic(music: IMusic) {
        console.log("Delete", music);
        try {
            this.$store.commit("setLoadingEnable");
            await this.$http.delete(`/Music/${music.id}`);
            this.$delete(this.musics, this.musics.indexOf(music, 0));
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

    public async onClickCreateMusic() {
        console.log("Create Musique");
        if (await this.$validator.validate()) {
            this.loadingBtn = true;
            try {
                this.$store.commit("setLoadingEnable");

                // Create music
                let response = await this.$http.post<IMusic>(
                    `/accounts/${this.user.userId}/artistMusic`,
                    {
                        title: this.title,
                        location: this.musicName,
                        releaseDate: moment(this.date + " " + this.time)
                    } as IMusic
                );

                this.musics.push(response.data);

                // Upload music
                const formData = new FormData();
                console.log("Music File", this.musicFile);
                formData.append("file", this.musicFile as File);

                response = await this.$http.post<any>(
                    `/Photos/music/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                console.log("Upload file", response.data);
            } catch (err) {
                throw err;
            } finally {
                this.loadingBtn = false;
                this.reset();
                this.dialogCreation = false;
            }

            this.$store.commit("setLoadingDisable");
        }
    }

    public reset(): void {
        this.title = "";
        this.datePicker = "";
        this.date = "";
        this.timePicker = "";
        this.time = "";
        this.musicName = "";
        this.$validator.reset();
        this.$refs.creationMusicForm.reset();
    }

    public pickFile(): void {
        this.$refs.music.click();
    }

    public onFilePicked(evt: any): void {
        const files = evt.target.files;
        if (files[0] !== undefined) {
            this.musicName = files[0].name;
            if (this.musicName.lastIndexOf(".") <= 0) {
                return;
            }
            const fr = new FileReader();
            fr.readAsDataURL(files[0]);
            fr.addEventListener("load", () => {
                this.musicFile = files[0];
            });
        } else {
            this.musicName = "";
            this.musicFile = null;
        }
    }
}
</script>