<template>
    <div>
        <v-toolbar id="test" flat class="transparent">
            <v-toolbar-title class="mr-4">Events</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
                <v-btn flat>Creer</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat>Supprimer</v-btn>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-layout wrap>
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
import { IEvent, IEvents } from "../store/types";

@Component
export default class Event extends Vue {
    @State("Events") events!: IEvents;

    public created() {
        this.$store.dispatch("requestEvents");
    }
}
</script>