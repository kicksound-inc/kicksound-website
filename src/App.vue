<template>
    <v-app>
        <Drawer/>

        <Toolbar/>

        <v-content>
            <router-view/>
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
export default class App extends Vue {
    public created() {
        console.log("App component created");
    }

    public destroyed() {
        console.log("App component destroyed");
    }
}
</script>
