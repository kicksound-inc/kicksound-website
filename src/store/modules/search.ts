import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { ISearch, IUser, TypeUser } from '../types';
import axios from "axios";

@Module
export default class Search extends VuexModule implements ISearch {

    public loading: boolean = false;
    public searchInput: string = "";
    public users: IUser[] = [];
    public musics: string[] = [];

    @Action({ commit: "updateSearch", rawError: true })
    public async search(search: string): Promise<IUser[]> {
        console.log("SEARCHING WITH", search);

        try {
            const users = await axios.get<IUser[]>(`/accounts`, {
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
            });
            return users.data;
        } catch (err) {
            throw err;
        }
    }

    @Action({ rawError: true })
    public async suggestions(search: string): Promise<string[]> {
        return [];
    }

    @Mutation
    public updateSearch(users: IUser[]): void {
        this.users = users;
        this.loading = false;
    }

    @Mutation
    public setSearchInput(search: string): void {
        this.searchInput = search;
    }
}
