<template>
    <v-container fluid class="ma-0 pa-0">
        <v-card>
            <v-card-text class="pa-3">
                <v-layout fill-height row align-center>
                    <v-flex shrink>
                        <v-btn icon>
                            <v-icon large color="blue darken-2">skip_previous</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn @click="playAudio" icon>
                            <v-icon large color="blue darken-2">play_arrow</v-icon>
                        </v-btn>
                    </v-flex>

                    <v-flex shrink>
                        <v-btn icon>
                            <v-icon large color="blue darken-2">skip_next</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-layout column>
                            <v-flex>
                                <v-progress-linear v-model="valueDeterminate"></v-progress-linear>
                            </v-flex>
                            <v-flex>
                                <span>Titre 1 - Salut</span>
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

@Component
export default class AudioPlayer extends Vue {
    private valueDeterminate: number = 25;
    private audio!: HTMLAudioElement;
    private music: string =
        "https://course.oc-static.com/ftp-tutos/cours/javascript/part5/chap2/hype_home.mp3";

    public created() {
        this.audio = new Audio(this.music);
    }

    private playAudio(): void {
        this.audio.play();
    }
}
</script>
