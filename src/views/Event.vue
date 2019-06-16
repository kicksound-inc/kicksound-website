<template>
    <div v-if="!loading.enable">
        <v-img
            :src="`http://localhost:3000/event/${event.picture}`"
            lazy-src="https://picsum.photos/10/6?image=15" 
            max-height="500"
        >
            <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
            </template>
        </v-img>
        <v-container>
            <v-layout align-center column justify-center>
                <h1 class="display-2 font-weight-thin mb-3">{{event.title}}</h1>
            </v-layout>
            <v-layout column justify-center wrap>
                <v-flex><v-btn @click="participate">Participer</v-btn></v-flex>
                <v-flex>Créé par {{event.id}}</v-flex>
                <v-flex>Evenement le {{readableDate(event.date)}}</v-flex>
                <v-flex>Places : {{event.ticketsNumber}}</v-flex>
                <v-flex>Description : {{event.description}}</v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IEvent, ILoading, IUser } from "../store/types";
import { State } from "vuex-class";
import moment from "moment-timezone";

@Component
export default class Event extends Vue {
    @State("User") user!: IUser;
    @State("Loading") loading!: ILoading;

    public event!: IEvent;
    public participants!: any;

    public async created() {
        try {
            this.$store.commit("setLoadingEnable");

            let events = await this.$http.get(
                `/Events/${this.$route.params.id}`
            );

            let participants = await this.$http.get(
                `/Events/${this.$route.params.id}/participants`
            )

            this.event = events.data;
            this.participants = participants.data;
        } catch (err) {
            throw new Error(err);
        } finally {
            this.$store.commit("setLoadingDisable");
        }
    }

    public readableDate(date: string): string {
        return moment(date).format("LLLL");
    }

    public participate(ev: any) {
        this.$http.post(
            `/Events/${this.$route.params.id}/tickets`,
            {
                accountId: this.user.userId,
                price: 0
            }
        );
    }
}
</script>