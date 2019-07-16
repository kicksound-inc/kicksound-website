<template>
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
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import moment from "moment-timezone";
import { IEvent } from "../store/types";

@Component
export default class Event extends Vue {
    @Prop() readonly event!: IEvent;

    public readableDate(date: string): string {
        return moment(date).fromNow();
    }
}
</script>
