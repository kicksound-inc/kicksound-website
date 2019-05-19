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
    type?: number;
    description?: string;
    realm?: string;
    username: string;
    password?: string;
    email?: string;
    emailVerified?: true;
    id?: number;
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

export interface IEvents {
    events: IEvent[];
    loading: boolean;
}
export interface IEvent {
    title: string;
    description: string;
    ticketsNumber: number;
    picture: string;
    disabled: boolean;
    id: number;
    accountId: number;
}

export interface ILoading {
    enable: boolean;
    value: number;
}

/**
 * ENUM
 */

export enum TypeMessage {
    INFO = "info",
    ERROR = "error",
    SUCCESS = "success"
}