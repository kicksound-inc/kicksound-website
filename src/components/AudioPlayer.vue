<template>
    <v-container fluid class="ma-0 pa-0">
        <v-card>
            <v-card-text class="pa-3">
                <v-layout fill-height row align-center>
                    <v-flex shrink>
                        <v-btn icon @click="previousMusic">
                            <v-icon large color="blue darken-2">skip_previous</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn v-if="isInit || isPaused" @click="playAudio" icon>
                            <v-icon large color="blue darken-2">play_arrow</v-icon>
                        </v-btn>
                        <v-btn v-else @click="pauseAudio" icon>
                            <v-icon large color="blue darken-2">pause</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn icon @click="nextMusic">
                            <v-icon large color="blue darken-2">skip_next</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-layout column>
                            <v-flex>
                                <v-progress-linear v-model="currentPercent"></v-progress-linear>
                            </v-flex>
                            <v-flex>
                                <span>{{audioPlayer.currentMusic.title}}</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex shrink></v-flex>
                    <v-flex shrink>
                        <v-btn icon>
                            <v-icon color="blue darken-2">volume_up</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
</style>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State } from 'vuex-class';
import { IAudioPlayer, IMusic } from '../store/types';

@Component
export default class AudioPlayer extends Vue {

    @State("AudioPlayer") audioPlayer!: IAudioPlayer;

    private audio: HTMLAudioElement = new Audio();
    private isInit: boolean = true;
    private isPaused: boolean = false;
    private currentPercent: number = 0;

    public created() {
        this.audio = new Audio(`http://localhost:3000/music/${this.audioPlayer.currentMusic!.location}`);
        this.audio.load();
        console.log("PAUSED", this.audio.paused);
    }

    private playAudio(): void {
        this.audio.play();
        this.isInit = false;
        this.isPaused = false;
        this.audio.ontimeupdate = this.updateCurrentTime;
        this.audio.onended = this.onEnded;
        console.log("PAUSED", this.audio.paused);
    }

    private updateCurrentTime(ev: any): void {
        this.currentPercent = this.audio.currentTime / this.audio.duration * 100;
        console.log(this.currentPercent);
    }

    private onEnded(ev: any): void {
        setTimeout(() => {
            this.nextMusic();
            this.playAudio();
        }, 1000);
    }

    private pauseAudio(): void {
        this.audio.pause();
        this.isPaused = true;
    }

    private nextMusic(): void {
        this.audio.pause();
        this.isPaused = true;
        this.audio.currentTime = 0;
        this.$store.commit("nextMusic");
        this.changeMusic();
    }
    
    private previousMusic(): void {
        this.audio.pause();
        this.isPaused = true;
        this.audio.currentTime = 0;
        this.$store.commit("previousMusic");
        this.changeMusic();
    }

    private changeMusic(): void {
        if(this.audioPlayer.currentMusic) {
            this.audio = new Audio(`http://localhost:3000/music/${this.audioPlayer.currentMusic.location}`);
            this.audio.load();
        }
    }
}
</script>
