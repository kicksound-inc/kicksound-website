<template>
    <v-layout wrap>
        <v-flex v-if="!events.length" class="text-xs-center">Il n'y a aucun événements</v-flex>
        <v-flex v-for="event in events" :key="event.id" pa-2 xs12 sm12 md6 lg3>
            <v-card :to="`/event/${event.id}`">
                <v-img
                    :src="`${$image}${event.picture}`"
                    lazy-src="https://picsum.photos/10/6?image=15"
                    :aspect-ratio="16/9"
                >
                    <template v-slot:placeholder>
                        <v-layout fill-height align-center justify-center ma-0>
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                    </template>
                </v-img>
                <v-card-title>
                    <v-container fluid class="pa-0 ma-0">
                        <v-layout>
                            <v-flex>
                                <span class="subheading clamp">{{event.title}}</span>
                            </v-flex>
                            <v-flex shrink>
                                <span class="time ml-1">{{readableDate(event.date)}}</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-title>
            </v-card>
        </v-flex>
        <v-dialog v-model="dialogCreation" max-width="600px" @input="v => v || onClose()">
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" fab dark fixed bottom right color="blue">
                    <v-icon>add</v-icon>
                </v-btn>
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
                                                v-validate="'required|date_format:kk:mm'"
                                                name="time"
                                                type="text"
                                                :error-messages="errors.collect('time')"
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker v-model="time" format="24hr" no-title scrollable>
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
                        <v-btn outline color="blue darken-1" flat @click="reset">Reset</v-btn>
                        <v-btn outline color="blue darken-1" flat @click="dialogCreation = false">Close</v-btn>
                        <v-btn outline :loading="loadingBtn" color="blue darken-1" flat type="submit">Save</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<style scoped>
.time {
    white-space: nowrap;
}
.clamp {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IEvent, IUser, TypeUser } from "@/store/types";
import moment from "moment-timezone";
import store from "@/store/store";

@Component({
    $_veeValidate: { validator: "new" },
    beforeRouteEnter: (to, from, next) => {
        if(store.getters.user.type != TypeUser.USER) {
            next();
        } else {
            next({
                name: from.name ? from.name : "Home"
            })
        }
    }
})
export default class GestionEvents extends Vue {
    @State("User") user!: IUser;

    public events: IEvent[] = [];

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

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");
            const events = await this.$http.get<Array<IEvent>>(
                `/accounts/${this.user.userId}/events`
            );
            console.log("GestionEvents", events);
            this.events = events.data;
        } catch (err) {
            throw err;
        }
        
        this.$store.commit("setLoadingDisable");
    }

    public async onClickCreateEvent(ev: any): Promise<void> {
        if (await this.$validator.validate()) {
            this.loadingBtn = true;
            try {
                this.$store.commit("setLoadingEnable");
                console.log("DEBUG :", this.date + this.time);
                console.log("DEBUG :", moment(this.date + " " + this.time))

                const event = await this.$http.post<any>(`/Events/`, {
                    title: this.title,
                    ticketsNumber: parseInt(this.tickets),
                    picture: this.pictureName,
                    description: this.description,
                    date: moment(this.date + " " + this.time),
                    accountId: this.user.userId
                } as IEvent);

                console.log("Create Event", event.data);

                const formData = new FormData();
                
                formData.append("file", this.imageFile as File);

                const response = await this.$http.post<any>(
                    `/Photos/image/upload`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                console.log("Upload file", response.data);
                this.events.push(event.data as IEvent);
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

    public onClose(): void {
        console.log("ONCLOSE");
    }

    public reset(): void {
        this.title = "";
        this.tickets = "";
        this.pictureName = "";
        this.description = "";
        this.datePicker = "";
        this.date = "";
        this.timePicker = "";
        this.time = "";
        this.$validator.reset();
        this.$refs.creationEventForm.reset();
    }

    public readableDate(date: string): string {
        return moment(date).fromNow();
    }

    public pickFile(): void {
        this.$refs.image.click();
    }

    public onFilePicked(evt: any): void {
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