<template>
    <v-app v-resize="onResize">
        <DrawerDesktop/>
        <DrawerMobile/>

        <Toolbar/>

        <v-content :class="{ fullScreenImage: enableFullScreenImage() }">
            <router-view/>
        </v-content>
    </v-app>
</template>

<style>
html {
    overflow-y: auto !important;
}
.fullScreenImage {
    height: 100vh;
}
</style>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Toolbar from "@/components/Toolbar.vue";
import DrawerMobile from "@/components/DrawerMobile.vue";
import DrawerDesktop from "@/components/DrawerDesktop.vue";
import { State } from "vuex-class";

@Component({
    components: {
        Toolbar,
        DrawerDesktop,
        DrawerMobile
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
        return this.$router.currentRoute.meta.enableFullScreenImage === true
            ? true
            : false;
    }

    public onResize() {
        if(window.innerWidth < 600)
            this.$store.commit("setDrawerDesktop", false);
    }
}
</script>
