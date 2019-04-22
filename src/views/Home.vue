<template>
    <section>
        <v-parallax height="600" :src="require('@/assets/test.jpg')">
            <v-layout align-center column justify-center>
                <h1 class="display-2 font-weight-thin mb-3">Kicksound</h1>
                <h4 class="subheading">Listen without limits</h4>
            </v-layout>
        </v-parallax>

        <v-container>
            <v-layout justify-center>
                <h1>Home Page</h1>
            </v-layout>
        </v-container>
    </section>
</template>

<style scoped>

</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
