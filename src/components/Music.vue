<template>
    <v-card>
        <v-img
            src="https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/264x264-000000-80-0-0.jpg"
            :aspect-ratio="1"
        />
        <v-card-title>
            <div class="headline text-truncate">{{music.title}}</div>
        </v-card-title>
    </v-card>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IMusic } from "../store/types";

@Component
export default class Music extends Vue {
    @Prop() readonly music!: IMusic;
}
</script>
