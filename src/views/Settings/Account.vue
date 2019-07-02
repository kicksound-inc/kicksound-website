<template>
    <v-layout v-if="!loading.enable" align-center column>
        <v-flex class="text-xs-center">
            <v-avatar size="150">
                <img src="https://www.w3schools.com/howto/img_avatar.png" />
            </v-avatar>
            <h1>FGOUARIN</h1>
        </v-flex>
        <v-flex mt-4 id="flexForm">
            <v-form>
                <v-text-field
                    box
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="username"
                ></v-text-field>
                <v-text-field
                    box
                    prepend-icon="person"
                    name="firstname"
                    label="Firstname"
                    type="text"
                    v-model="firstname"
                ></v-text-field>
                <v-text-field
                    box
                    prepend-icon="person"
                    name="lastname"
                    label="Lastname"
                    type="text"
                    v-model="lastname"
                ></v-text-field>
                <v-text-field
                    box
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="email"
                    v-model="email"
                ></v-text-field>
                <v-textarea
                    box
                    prepend-icon="description"
                    name="description"
                    label="Description"
                    type="text"
                    v-model="description"
                ></v-textarea>
                <v-layout justify-end>
                    <v-btn outline flat color="normal" class="ma-0">Enregistrer</v-btn>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<style scoped>
#flexForm {
    width: 600px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from 'vuex-class';
import { IUser, ILoading } from '../../store/types';

@Component
export default class Account extends Vue {
    @State("Loading") loading!: ILoading;
    @State("User") user!: IUser;

    private username!: string;
    private email!: string;
    private description?: string;
    private firstname?: string;
    private lastname?: string;

    public async created() {
        try {
            this.$store.commit("setLoadingEnable");

            const { data } = await this.$http.get<IUser>(`/accounts/${this.user.userId}`);

            this.username = data.username;
            this.email = data.email;
            this.description = data.description;
            this.firstname = data.firstname;
            this.lastname = data.lastname;
        } catch (err) {
            throw err;
        } 

        this.$store.commit("setLoadingDisable");
    }
}
</script>