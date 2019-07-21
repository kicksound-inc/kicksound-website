<template>
    <div v-if="!loading.enable">
        <v-img
            :src="`${$image}${event.picture}`"
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
                <v-flex>
                    <v-btn v-if="!alreadyJoin" @click="join">Participer</v-btn>
                    <v-btn v-else @click="leave">Quitter</v-btn>
                </v-flex>
                <v-flex>Créé par {{event.account.username.toUpperCase()}}</v-flex>
                <v-flex>Evenement le {{readableDate(event.date)}}</v-flex>
                <v-flex>Places : {{event.ticketsNumber}}</v-flex>
                <v-flex>Description : {{event.description}}</v-flex>
            </v-layout>
            <v-layout column v-if="user.userId == event.accountId" pt-3>
                <v-flex>
                    <h1>Participants</h1>
                </v-flex>
                <v-flex v-if="!participants.length" ma-2>Aucun participants trouvés</v-flex>
                <v-layout wrap ma-2>
                    <v-flex
                        v-for="participant in participants"
                        :key="participant.id"
                        pa-2
                        xs12
                        sm6
                        md4
                        lg2
                        class="text-xs-center"
                    >
                        <User :artist="participant" />
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-container>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IEvent, ILoading, IUser } from "@/store/types";
import { State } from "vuex-class";
import moment from "moment-timezone";
import { AxiosResponse } from "axios";
import { HttpError } from "../../store/errors";
import User from "@/components/Artist.vue";

@Component({
    components: {
        User
    }
})
export default class Event extends Vue {
    @State("User") user!: IUser;
    @State("Loading") loading!: ILoading;

    public event!: IEvent;
    public participants!: IUser[];
    public alreadyJoin: boolean = false;

    public async created(): Promise<void> {
        try {
            this.$store.commit("setLoadingEnable");

            const [events, participants, gotTicket] = await Promise.all([
                this.getEvent(),
                this.getParticipants(),
                this.getTicketForEvent()
            ]);

            this.event = events.data;
            this.participants = participants.data;
            this.alreadyJoin = gotTicket;
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

    public async getEvent(): Promise<AxiosResponse<IEvent>> {
        try {
            return await this.$http.get<IEvent>(
                `/Events/${this.$route.params.id}`,
                {
                    params: {
                        filter: {
                            include: "account"
                        }
                    }
                }
            );
        } catch (err) {
            throw err;
        }
    }

    public async getParticipants(): Promise<AxiosResponse<any>> {
        try {
            return await this.$http.get<any>(
                `/Events/${this.$route.params.id}/participants`
            );
        } catch (err) {
            throw err;
        }
    }

    public async getTicketForEvent(): Promise<boolean> {
        try {
            const { data } = await this.$http.get<Array<Object>>(
                `/Events/${this.$route.params.id}/tickets/`,
                {
                    params: {
                        filter: {
                            where: {
                                accountId: this.user.userId
                            }
                        }
                    }
                }
            );
            return data.length == 0 ? false : true;
        } catch (err) {
            if (err instanceof HttpError) {
                if (err.status == 404) return false;
                else if (err.status != 404) return true;
                else throw err;
            } else {
                throw err;
            }
        }
    }

    public readableDate(date: string): string {
        return moment(date).format("LLLL");
    }

    public async join(ev: any): Promise<void> {
        try {
            await this.$http.post<any>(
                `/Events/${this.$route.params.id}/tickets`,
                {
                    accountId: this.user.userId,
                    price: 0
                }
            );

            this.alreadyJoin = true;
        } catch (err) {
            throw err;
        }
    }

    public async leave(ev: any): Promise<void> {
        try {
            await this.$http.delete(
                `/Events/${this.$route.params.id}/tickets`,
                {
                    params: {
                        accountId: this.user.userId
                    }
                }
            );

            this.alreadyJoin = false;
        } catch (err) {
            throw err;
        }
    }
}
</script>