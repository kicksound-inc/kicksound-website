<template>
    <div>
        <v-toolbar id="test" flat class="transparent">
            <v-toolbar-title class="mr-4">Dashboard</v-toolbar-title>
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
export default class Dashboard extends Vue {}
</script>