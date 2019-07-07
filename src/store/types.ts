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

export interface ISearch {
    loading: boolean;
    searchInput: string;
    users: IUser[];
    musics: string[]; //TODO: IMusic au lieu de string
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
