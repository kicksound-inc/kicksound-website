<template>
    <v-app>
    
        <Drawer temporary/>

        <Toolbar/>

        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Toolbar from "@/components/Toolbar.vue";
import Drawer from "@/components/Drawer.vue";

@Component({
    components: {
        Toolbar,
        Drawer
    }
})
export default class App extends Vue {}
</script>
