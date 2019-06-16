<template>
    <v-layout wrap>
        <v-flex v-if="!events.length" class="text-xs-center">Vous participez à aucun événement</v-flex>
        <v-flex v-for="event in events" :key="event.id" pa-2 xs12 sm12 md6 lg3>
            <v-card :to="`/event/${event.id}`">
                <v-img
                    :src="`http://localhost:3000/event/${event.picture}`"
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
import { IEvent, IUser } from "../store/types";
import moment from "moment-timezone";

@Component
export default class MyEvents extends Vue {
    @State("User") user!: IUser;

    public events: IEvent[] = [];

    public async created() {
        try {
            this.$store.commit("setLoadingEnable");
            const events = await this.$http.get<Array<IEvent>>(
                `/accounts/${this.user.userId}/eventParticipation`
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