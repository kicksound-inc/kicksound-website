export interface IRootState {
    version: string;
}

export interface IDrawer {
    enable?: boolean;
    dark?: boolean;
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
