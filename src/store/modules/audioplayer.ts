import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IAudioPlayer, IMusic } from "../types";

@Module
export default class AudioPlayer extends VuexModule implements IAudioPlayer {

    public musicsList: IMusic[] = [];
    public currentMusic?: IMusic = undefined;

    @Mutation
    public setMusicsList(payload: any) {
        this.musicsList = payload.musics;
        this.currentMusic = payload.musicSelected;
    }

    @Mutation
    public nextMusic() {
        if (this.currentMusic) {
            this.currentMusic =
                this.musicsList[(this.musicsList.indexOf(this.currentMusic) + 1) % this.musicsList.length];
            console.log(this.currentMusic);
        }
    }

    @Mutation
    public previousMusic() {
        if (this.currentMusic) {
            const n = this.musicsList.length;
            this.currentMusic = this.musicsList[((this.musicsList.indexOf(this.currentMusic) - 1) % n + n) % n];
            console.log(this.currentMusic);
        }
    }

    @Mutation
    public resetAudioPlayer() {
        this.musicsList = [];
        this.currentMusic = undefined;
    }
}
