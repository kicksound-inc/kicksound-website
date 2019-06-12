<template>
    <v-container fluid>
        <v-img src=""></v-img>
        <p>Soon available</p>
    </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IEvent } from '../store/types';

@Component
export default class Event extends Vue {

    public event!: IEvent;

    public /*async*/ created() {
        //await this.$http.get(`/Events/${1}`)
    }

}
</script>