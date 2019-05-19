<template>
    <v-container fluid>
        <h1>Event Page</h1>

        <v-layout wrap>
            <v-flex v-for="event in events.events" :key="event.id" pa-2 xs12 sm9 md6 lg4>
                <v-card to="/events">
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                        height="200px"
                    >
                    </v-img>
                    <v-card-title>{{event.title}}</v-card-title>
                    <v-card-text>{{event.description}}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IEvent, IEvents } from '../store/types';

@Component
export default class Event extends Vue {

    @State("Events") events!: IEvents;

    public created() {
        this.$store.dispatch("requestEvents");
    }

}
</script>