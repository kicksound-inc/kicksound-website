export interface IRootState {
    version: string;
}

export interface IDrawer {
    enable?: boolean;
    temporary?: boolean;
    dark?: boolean;
}

export interface IUser {
    token: string;
    firstname?: string;
    lastname?: string;
    type: number;
    description?: string;
    realm?: string;
    username: string;
    password?: string;
    email: string;
    emailVerified?: true;
    id?: number;
}
