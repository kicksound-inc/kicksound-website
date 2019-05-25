<template>
    <v-progress-linear indeterminate v-if="loading.enable" id="progressbar" class="ma-0" v-model="loading.value"></v-progress-linear>
</template>

<style scoped>
#progressbar {
    position: absolute;
}
</style>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from 'vuex-class';
import { ILoading } from '../store/types';

@Component
export default class Loading extends Vue {

    @State("Loading") public loading!: ILoading;

}
</script>
