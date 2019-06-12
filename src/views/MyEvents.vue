<template>
    <v-layout wrap>
        <v-flex v-if="!events.length" class="text-xs-center">Il n'y a aucun événements</v-flex>
        <v-flex v-for="event in events" :key="event.id" pa-2 xs12 sm9 md6 lg4>
            <v-card to="/events">
                <v-img :src="`http://localhost:3000/event/${event.picture}`" height="200px"></v-img>
                <v-card-title>
                    {{event.title}}
                    <v-spacer></v-spacer>
                    {{readableDate(event.date)}}
                </v-card-title>
                <v-card-text>{{event.description}}</v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IEvent, IUser } from "../store/types";
import moment from "moment";

@Component
export default class MyEvents extends Vue {
    @State("User") user!: IUser;

    public events: IEvent[] = [];

    public async created() {
        try {
            this.$store.commit("setLoadingEnable");
            const events = await this.$http.get(
                `/accounts/${this.user.userId}/events`
            );
            console.log("MyEvents", events);
            this.events = events.data;
        } catch (err) {
            throw new Error(err);
        } finally {
            this.$store.commit("setLoadingDisable");
        }
    }

    public readableDate(date: string): string {
        return moment(date).fromNow();
    }
}
</script>