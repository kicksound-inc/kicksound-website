import moment from "moment";
/**
 * Interface
 */
export interface IRootState {
    version: string;
}

export interface IDrawer {
    enable?: boolean;
    dark?: boolean;
    temporary?: boolean;
    clipped?: boolean;
}

export interface IUser {
    userId: number;
    token: string;
    firstname?: string;
    lastname?: string;
    type: TypeUser;
    description?: string;
    realm?: string;
    username: string;
    password?: string;
    email: string;
    emailVerified?: true;
}

export interface IDrawerItem {
    name: string;
    icon?: string;
    route?: string;
    click: any;
    requireAuth?: boolean;
    excludeDesktop?: boolean;
}

export interface ISnackbar {
    enable: boolean;
    timeout: number;
    message: string;
    color: string;
}

export interface IEvent {
    title: string;
    description: string;
    ticketsNumber: number;
    picture: string;
    date: moment.Moment;
    disabled: boolean;
    id: number;
    accountId: number;
}

export interface ILoading {
    enable: boolean;
    value: number;
}

export interface IMusic {
    id: number;
    title: string;
    location: string;
    releaseDate: moment.Moment; //TODO: Date
    disabled: number;
    albumId: number;
    accountId: number;
    musicKind: IMusicKind;
    musicKindId: number;
}

export interface ISearch {
    loading: boolean;
    searchInput: string;
    users: IUser[];
    musics: IMusic[];
}

export interface IMusicKind {
    id: number;
    name: string;
}

export interface IAudioPlayer {
    musicsList: IMusic[];
    currentMusic?: IMusic;
    audio: HTMLAudioElement;
    isInit: boolean;
    isPaused: boolean;
    currentPercent: number;
}

export interface IPlaylist {
    id: number;
    name: string;
    disabled: boolean;
    accountId: number;
}

/**
 * ENUM
 */

export enum TypeMessage {
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success"
}

export enum TypeUser {
    USER = 0,
    UNKNOWN_ARTIST = 1,
    KNOWN_ARTIST = 2,
    ADMIN = 3
}
