import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { ISearch, IUser, TypeUser, IMusic, IPlaylist } from '../types';
import axios, { AxiosResponse } from "axios";

@Module
export default class Search extends VuexModule implements ISearch {

    public loading: boolean = false;
    public searchInput: string = "";
    public users: IUser[] = [];
    public musics: IMusic[] = [];
    public playlists: IPlaylist[] = [];

    @Action({ commit: "updateSearch", rawError: true })
    public async search(search: string): Promise<any> {
        console.log("SEARCHING WITH", search);

        const [artists, musics, playlists] = await Promise.all([
            axios.get<IUser[]>(`/accounts`, {
                params: {
                    filter: {
                        where: {
                            and: [
                                {
                                    username: {
                                        like: `%${search}%`
                                    }
                                },
                                {
                                    type: {
                                        neq: TypeUser.USER
                                    }
                                },
                                {
                                    id: {
                                        neq: this.context.rootState.User.userId
                                    }
                                },
                            ]
                        }
                    }
                }
            }),
            axios.get<IMusic[]>(`/Music`, {
                params: {
                    filter: {
                        where: {
                            title: {
                                like: `%${search}%`
                            }
                        }
                    }
                }
            }),
            axios.get<IMusic[]>(`/Playlists`, {
                params: {
                    filter: {
                        where: {
                            name: {
                                like: `%${search}%`
                            }
                        }
                    }
                }
            })
        ]);

        return {
            artists: artists.data,
            musics: musics.data,
            playlists: playlists.data
        };
    }

    @Action({ rawError: true })
    public async suggestions(search: string): Promise<string[]> {
        return [];
    }

    @Mutation
    public updateSearch(search: any): void {
        this.users = search.artists;
        this.musics = search.musics;
        this.playlists = search.playlists;
        this.loading = false;
    }

    @Mutation
    public setSearchInput(search: string): void {
        this.searchInput = search;
    }
}
