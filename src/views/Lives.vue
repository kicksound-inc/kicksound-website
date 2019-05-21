<template>
    <div>
        <v-toolbar id="test" flat class="transparent">
            <v-toolbar-title class="mr-4">Lives</v-toolbar-title>
            <v-toolbar-items>
                <v-divider vertical></v-divider>
                <v-btn flat>Creer</v-btn>
                <v-divider vertical></v-divider>
                <v-btn flat>Supprimer</v-btn>
                <v-divider vertical></v-divider>
            </v-toolbar-items>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <p>Soon available</p>
        </v-container>
    </div>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Lives extends Vue {

}
</script>