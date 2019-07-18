<template>
    <v-layout align-center column>
        <v-flex class="text-xs-center">
            <v-avatar size="150">
                <img src="https://www.w3schools.com/howto/img_avatar.png" />
            </v-avatar>
            <h1>{{user.username.toUpperCase()}}</h1>
        </v-flex>
        <v-flex mt-4 id="flexForm">
            <v-form>
                <v-text-field
                    box
                    v-validate="'required|min:4|max:12'"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    type="text"
                    v-model="username"
                    :error-messages="errors.collect('username')"
                ></v-text-field>
                <v-text-field
                    box
                    v-validate="'required|min:4|max:12'"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="email"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                ></v-text-field>
                <v-text-field
                    box
                    v-validate="'min:4|max:12'"
                    prepend-icon="person"
                    name="firstname"
                    label="Firstname"
                    type="text"
                    v-model="firstname"
                    :error-messages="errors.collect('firstname')"
                ></v-text-field>
                <v-text-field
                    box
                    v-validate="'min:4|max:12'"
                    prepend-icon="person"
                    name="lastname"
                    label="Lastname"
                    type="text"
                    v-model="lastname"
                    :error-messages="errors.collect('lastname')"
                ></v-text-field>
                <v-textarea
                    box
                    v-validate="'max:250'"
                    prepend-icon="description"
                    name="description"
                    label="Description"
                    type="text"
                    v-model="description"
                    :error-messages="errors.collect('description')"
                ></v-textarea>
                <v-layout justify-end>
                    <v-btn @click="save" :loading="loadingSaveBtn" outline flat color="normal" class="ma-0">Enregistrer</v-btn>
                </v-layout>
            </v-form>
        </v-flex>
        <v-flex>
            <h1 class="ma-2">Supprimer son compte</h1>
        </v-flex>
        <v-flex>
            <v-btn outline flat color="error" @click="deleteAccount">Supprimer</v-btn>
        </v-flex>
    </v-layout>
</template>

<style scoped>
#flexForm {
    width: 600px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { IUser } from "../../store/types";

@Component({
    $_veeValidate: { validator: "new" }
})
export default class Account extends Vue {
    @State("User") user!: IUser;

    private loadingSaveBtn: boolean = false;
    private loadingDeleteBtn: boolean = false;

    private username!: string;
    private email!: string;
    private firstname?: string;
    private lastname?: string;
    private description?: string;

    public created() {
        this.username = this.user.username;
        this.email = this.user.email;
        this.firstname = this.user.firstname;
        this.lastname = this.user.lastname;
        this.description = this.user.description;
    }

    public async save(): Promise<void> {
        try {
            this.loadingSaveBtn = true;
            await this.$http.post<IUser>(
                `/accounts/update`,
                {
                    username: this.username,
                    email: this.email,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    description: this.description
                } as IUser,
                {
                    params: {
                        where: {
                            id: this.user.userId
                        }
                    }
                }
            );

            this.$store.commit("modifyUser", {
                username: this.username,
                email: this.email,
                firstname: this.firstname,
                lastname: this.lastname,
                description: this.description
            } as IUser);

        } catch (err) {
            throw err;
        }

        this.loadingSaveBtn = false;
    }

    private async deleteAccount(): Promise<void> {
        this.loadingDeleteBtn = true;

        await this.$http.delete(`/accounts/${this.user.userId}`);
        this.$store.commit("clearUser");
        this.$router.push({name: "Login"});

        this.loadingDeleteBtn = false;
    }
}
</script>