<template>
    <v-app v-resize="onResize">
        <DrawerDesktop />
        <DrawerMobile />

        <Toolbar />

        <v-snackbar
            v-model="snackbar.enable"
            right
            top
            :timeout="snackbar.timeout"
            :color="snackbar.color"
        >{{snackbar.message}}</v-snackbar>

        <v-content :class="{ fullScreenImage: enableFullScreenImage() }">
            <Loading></Loading>
            <router-view />
        </v-content>
        <v-footer v-if="audioPlayer.musicsList.length" app height="auto" fixed>
            <AudioPlayer/>
        </v-footer>
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
import { State, Getter } from "vuex-class";
import { ISnackbar, IUser, IAudioPlayer, IMusic } from "./store/types";
import Loading from "@/components/Loading.vue";
import AudioPlayer from "@/components/AudioPlayer.vue";
import { HttpError } from './store/errors';

@Component({
    components: {
        Toolbar,
        DrawerDesktop,
        DrawerMobile,
        Loading,
        AudioPlayer
    }
})
export default class App extends Vue {
    @State("Snackbar") snackbar!: ISnackbar;
    @Getter("isAuthenticated") isAuthenticated!: boolean;
    @State("AudioPlayer") audioPlayer!: IAudioPlayer;

    public async created(): Promise<void> {
        console.log("App component created");
        // Check token validity
        try {
            await this.$http.get('/accounts/me');
        } catch ( err ) {
            if (err instanceof HttpError) {
                if (err.status == 401){
                    this.$store.commit("clearUser");
                    this.$router.push({name: "Login"});
                }
                else throw err;
            } else {
                throw err;
            }
        }
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
        if (
            window.innerWidth < 600 ||
            this.$route.name == "Login" ||
            this.$route.name == "Register"
        )
            this.$store.commit("setDrawerDesktop", false);
        else this.$store.commit("setDrawerDesktop", true);
    }
}
</script>
