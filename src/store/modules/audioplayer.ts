import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IAudioPlayer, IMusic } from "../types";

@Module
export default class AudioPlayer extends VuexModule implements IAudioPlayer {

    public musicsList: IMusic[] = [];
    public currentMusic?: IMusic = undefined;
    public audio: HTMLAudioElement = new Audio();
    public isInit: boolean = true;
    public isPaused: boolean = false;
    public currentPercent: number = 0;

    @Mutation
    public setMusicsList(payload: any) {
        this.musicsList = [];
        this.currentMusic = undefined;
        this.isInit = true;
        this.isPaused = false;
        this.audio.pause();
        this.audio.currentTime = 0;
        this.currentPercent = 0;

        this.musicsList = payload.musics;
        this.currentMusic = payload.musicSelected;
        this.audio = new Audio(`${process.env.VUE_APP_MUSIC_URL}${payload.musicSelected.location}`);
    }

    @Action({ commit: "postPlayAudio", rawError: true })
    public async playAudio(): Promise<void> {
        this.audio.play();
    }

    @Action({ commit: "postPauseAudio", rawError: true })
    public async pauseAudio() {
        this.audio.pause();
    }

    @Action({ commit: "postNextMusic", rawError: true })
    public async previousMusic() {
        this.audio.pause();
    }

    @Action({ commit: "postNextMusic", rawError: true })
    public async nextMusic() {
        this.audio.pause();
    }

    @Mutation
    public postPlayAudio(): void {
        this.isInit = false;
        this.isPaused = false;
        this.audio.ontimeupdate = () => {
            this.currentPercent = this.audio.currentTime / this.audio.duration * 100;
        };
    }

    @Mutation
    public postPauseAudio() {
        this.isPaused = true;
    }

    @Mutation
    public postNextMusic(): void {
        this.isPaused = true;
        this.audio.currentTime = 0;
        this.currentPercent = 0;
        if (this.currentMusic) {
            this.currentMusic =
                this.musicsList[(this.musicsList.indexOf(this.currentMusic) + 1) % this.musicsList.length];
            this.audio = new Audio(`${process.env.VUE_APP_MUSIC_URL}${this.currentMusic.location}`);
            this.audio.load();
        }
    }

    @Mutation
    public postPreviousMusic() {
        this.isPaused = true;
        this.audio.currentTime = 0;
        this.currentPercent = 0;
        if (this.currentMusic) {
            const n = this.musicsList.length;
            this.currentMusic = this.musicsList[((this.musicsList.indexOf(this.currentMusic) - 1) % n + n) % n];
            this.audio = new Audio(`${process.env.VUE_APP_MUSIC_URL}${this.currentMusic.location}`);
            this.audio.load();
        }
    }

    @Mutation
    public resetAudioPlayer() {
        this.musicsList = [];
        this.currentMusic = undefined;
        this.isInit = true;
        this.isPaused = false;
        this.currentPercent = 0;
        this.audio = new Audio();
    }
}
