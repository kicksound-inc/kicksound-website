import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { ISearch, IUser, TypeUser, IMusic } from '../types';
import axios, { AxiosResponse } from "axios";

@Module
export default class Search extends VuexModule implements ISearch {

    public loading: boolean = false;
    public searchInput: string = "";
    public users: IUser[] = [];
    public musics: IMusic[] = [];

    @Action({ commit: "updateSearch", rawError: true })
    public async search(search: string): Promise<any> {
        console.log("SEARCHING WITH", search);

        const [artists, musics] = await Promise.all([
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
            })
        ]);

        return { artists: artists.data, musics: musics.data };
    }

    @Action({ rawError: true })
    public async suggestions(search: string): Promise<string[]> {
        return [];
    }

    @Mutation
    public updateSearch(search: any): void {
        this.users = search.artists;
        this.musics = search.musics;
        console.log("JHHUYJKBHGYJK", search);
        this.loading = false;
    }

    @Mutation
    public setSearchInput(search: string): void {
        this.searchInput = search;
    }
}
