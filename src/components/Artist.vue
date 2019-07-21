<template>
    <v-card class="ma-2" :to="`/user/${artist.id}`">
        <v-card-text>
            <v-avatar size="85%">
                <img src="https://www.w3schools.com/howto/img_avatar.png" />
            </v-avatar>
            <h2>{{artist.username}}</h2>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IUser } from "../store/types";

@Component
export default class Artist extends Vue {
    @Prop() readonly artist!: IUser;
}
</script>
