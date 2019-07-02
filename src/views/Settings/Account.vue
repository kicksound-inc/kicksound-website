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
                    v-model="user.username"
                    :error-messages="errors.collect('username')"
                ></v-text-field>
                <v-text-field
                    box
                    v-validate="'required|min:4|max:12'"
                    prepend-icon="email"
                    name="email"
                    label="Email"
                    type="email"
                    v-model="user.email"
                    :error-messages="errors.collect('email')"
                ></v-text-field>
                <v-text-field
                    box
                    v-validate="'min:4|max:12'"
                    prepend-icon="person"
                    name="firstname"
                    label="Firstname"
                    type="text"
                    v-model="user.firstname"
                    :error-messages="errors.collect('firstname')"
                ></v-text-field>
                <v-text-field
                    box
                    v-validate="'min:4|max:12'"
                    prepend-icon="person"
                    name="lastname"
                    label="Lastname"
                    type="text"
                    v-model="user.lastname"
                    :error-messages="errors.collect('lastname')"
                ></v-text-field>
                <v-textarea
                    box
                    v-validate="'max:250'"
                    prepend-icon="description"
                    name="description"
                    label="Description"
                    type="text"
                    v-model="user.description"
                    :error-messages="errors.collect('description')"
                ></v-textarea>
                <v-layout justify-end>
                    <v-btn @click="save" outline flat color="normal" class="ma-0">Enregistrer</v-btn>
                </v-layout>
            </v-form>
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

    public save(): void {
        try {
            this.$http.put<IUser>(`/accounts/${this.user.userId}`, {
                username: this.user.username,
                email: this.user.email,
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                description: this.user.description
            } as IUser);
        } catch (err) {
            throw err;
        }
    }
}
</script>