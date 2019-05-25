<template>
    <div>
        <v-toolbar id="test" flat class="transparent">
            <v-toolbar-title class="mr-4">Events</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
                <v-dialog v-model="dialogCreation" max-width="600px" @input="v => v || onClose()">
                    <template v-slot:activator="{ on }">
                        <v-btn flat v-on="on">Creer</v-btn>
                    </template>
                    <v-card>
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Creation événement</v-toolbar-title>
                        </v-toolbar>
                        <form ref="creationEventForm" @submit.prevent="onClickCreateEvent">
                            <v-card-text>
                                <v-container grid-list-md pb-0>
                                    <v-layout wrap>
                                        <v-flex xs12 sm9 md9>
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
                                        <v-flex xs12 sm3 md3>
                                            <v-text-field
                                                box
                                                label="Places*"
                                                v-validate="'required'"
                                                name="tickets"
                                                type="number"
                                                v-model="tickets"
                                                :error-messages="errors.collect('tickets')"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field
                                                box
                                                hide-details
                                                readonly
                                                browser-autocomplete="off"
                                                label="Picture*"
                                                v-validate="'required'"
                                                name="pictureName"
                                                type="text"
                                                v-model="pictureName"
                                                :error-messages="errors.collect('picture')"
                                                @click="pickFile"
                                            ></v-text-field>
                                            <input
                                                type="file"
                                                style="display: none"
                                                ref="image"
                                                accept="image/*"
                                                @change="onFilePicked"
                                            >
                                        </v-flex>
                                        <v-flex xs12 sm3 md3>
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
                                        <v-flex xs12 sm3 md3>
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
                                                        v-validate="'required|date_format:hh:mm'"
                                                        name="time"
                                                        type="text"
                                                        :error-messages="errors.collect('time')"
                                                    ></v-text-field>
                                                </template>
                                                <v-time-picker v-model="time" no-title scrollable>
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
                                        <v-flex x12 sm12 md12>
                                            <v-textarea
                                                box
                                                rows="3"
                                                label="Description"
                                                auto-grow
                                                clearable
                                                v-model="description"
                                            ></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" flat @click="reset">Reset</v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    flat
                                    @click="dialogCreation = false"
                                >Close</v-btn>
                                <v-btn :loading="loadingBtn" color="blue darken-1" flat type="submit">Save</v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-dialog>
                <v-divider vertical></v-divider>
                <v-btn flat>Supprimer</v-btn>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-layout wrap>
                <v-flex
                    v-if="!events.events.length"
                    class="text-xs-center"
                >Il n'y a aucun événements</v-flex>
                <v-flex v-for="event in events.events" :key="event.id" pa-2 xs12 sm9 md6 lg4>
                    <v-card to="/events">
                        <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                            height="200px"
                        ></v-img>
                        <v-card-title>{{event.title}}</v-card-title>
                        <v-card-text>{{event.description}}</v-card-text>
                    </v-card>
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
import { State } from "vuex-class";
import { IEvent, IEvents, IUser } from "../store/types";
import moment from "moment";

@Component({
    $_veeValidate: { validator: "new" }
})
export default class Event extends Vue {
    @State("Events") events!: IEvents;
    @State("User") user!: IUser;

    private dialogCreation: boolean = false;
    private title: string = "";
    private tickets: string = "";
    private pictureName: string = "";
    private description: string = "";
    private datePicker: string = "";
    private date: string = "";
    private timePicker: string = "";
    private time: string = "";
    private loadingBtn: boolean = false;

    private imageFile: File | null = null;

    $refs!: {
        image: HTMLInputElement;
        creationEventForm: HTMLFormElement;
    };

    public created() {
        this.$store.dispatch("requestEvents");
    }

    public async onClickCreateEvent(ev: any): Promise<any> {
        if (await this.$validator.validate()) {
            this.loadingBtn = true;
            let response = await this.$store.dispatch("createEvent", {
                title: this.title,
                ticketsNumber: parseInt(this.tickets),
                picture: this.pictureName,
                description: this.description,
                date: moment(this.date + this.time, "YYYY-MM-DD mm:ss"),
                accountId: this.user.userId
            } as IEvent);

            console.log("Response create event", response);

            this.loadingBtn = false;
            this.dialogCreation = false;
        }
    }

    public onClose() {
        console.log("ONCLOSE");
    }

    public reset() {
        this.$refs.creationEventForm.reset();
    }

    public pickFile() {
        this.$refs.image.click();
    }

    public onFilePicked(evt: any) {
        const files = evt.target.files;
        if (files[0] !== undefined) {
            this.pictureName = files[0].name;
            if (this.pictureName.lastIndexOf(".") <= 0) {
                return;
            }
            const fr = new FileReader();
            fr.readAsDataURL(files[0]);
            fr.addEventListener("load", () => {
                this.imageFile = files[0];
            });
        } else {
            this.pictureName = "";
            this.imageFile = null;
        }
    }
}
</script>