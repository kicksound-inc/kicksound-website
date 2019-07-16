<template>
    <v-card height="100%" width="250" :to="`/playlist/${playlist.id}`">
        <v-img
            src="https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/264x264-000000-80-0-0.jpg"
        />
        <v-card-title>
            <div class="headline text-truncate">{{playlist.name}}</div>
        </v-card-title>
    </v-card>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IPlaylist } from "../store/types";

@Component
export default class Playlist extends Vue {
    @Prop() readonly playlist!: IPlaylist;
}
</script>
