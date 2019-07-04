<template>
    <v-container fluid>
        <p>Soon available</p>
        <h1></h1>
    </v-container>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IUser, TypeUser } from '../store/types';
import { State } from 'vuex-class';

@Component
export default class Search extends Vue {
    
    @State("User") user!: IUser;

    private users!: Array<IUser>

    public async created() {
        try {
            this.$store.commit("setLoadingEnable");

            const users = await this.$http.get<Array<IUser>>(`/accounts`, {
                params: {
                    filter: {
                        where: {
                            and: [
                                {
                                    like: {
                                        username: this.$route.query.search_query
                                    }
                                },
                                {
                                    neq: {
                                        type: TypeUser.USER
                                    }
                                },
                                {
                                    neq: {
                                        id: this.user.userId
                                    }
                                },
                            ]
                        }
                    }
                }
            });
            this.users = users.data;
            console.log(this.users);
        } catch (err) {
            throw err;
        }

        this.$store.commit("setLoadingDisable");
    }

}
</script>