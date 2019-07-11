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
                        <v-btn v-if="audioPlayer.isInit || audioPlayer.isPaused" @click="playAudio" icon>
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
                                <v-progress-linear v-model="audioPlayer.currentPercent"></v-progress-linear>
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

    private async playAudio(): Promise<void> {
        await this.$store.dispatch("playAudio");
        this.audioPlayer.audio.onended = () => {
            setTimeout(async () => {
                await this.nextMusic();
                await this.playAudio();
            }, 1000);
        };
    }

    private async pauseAudio(): Promise<void> {
        await this.$store.dispatch("pauseAudio");
    }

    private async nextMusic(): Promise<void> {
        await this.$store.dispatch("nextMusic");
    }
    
    private async previousMusic(): Promise<void> {
        await this.$store.dispatch("previousMusic");
    }
}
</script>
