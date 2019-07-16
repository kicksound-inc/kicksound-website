<template>
    <v-layout wrap>
        <v-flex v-if="!events.length" class="text-xs-center">Il n'y a aucun événements</v-flex>
        <v-flex v-for="event in events" :key="event.id" pa-2 xs12 sm12 md6 lg3>
            <Event :event="event"/>
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
import { IEvent, IUser } from "@/store/types";
import Event from "@/components/Event.vue";

@Component({
    components: {
        Event
    }
})
export default class FollowsEvents extends Vue {
    @State("User") user!: IUser;

    public rating: number = 4;
    public events: IEvent[] = [];

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");
            const events = await this.$http.get<Array<IEvent>>(
                `/accounts/${this.user.userId}/eventByFollowedUser`
            );
            console.log("FollowsEvent", events);
            this.events = events.data;
        } catch (err) {
            throw err;
        }
        
        this.$store.commit("setLoadingDisable");
    }
}
</script>