<template>
    <v-app>
        <Drawer/>

        <Toolbar/>

        <v-content :class="{ fullScreenImage: enableFullScreenImage() }">
            <router-view/>
        </v-content>
    </v-app>
</template>

<style>
    html { overflow-y: auto !important }
    .fullScreenImage { height: 100vh; }
</style>


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

    public enableFullScreenImage(): boolean {
        return this.$router.currentRoute.meta.enableFullScreenImage === true ? true : false;
    }
}
</script>
