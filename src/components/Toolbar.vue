<template>

    <div>
        <v-navigation-drawer
            fixed
            v-model="drawer"
            app
            >
                <v-list class="pa-1">
                    <v-list-tile avatar>            
                        <v-list-tile-content>
                            <v-list-tile-title>Kicksound</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            
                <v-list class="pt-0" dense>
                    <v-divider></v-divider>
            
                    <v-list-tile @click="">     
                        <v-list-tile-content>
                            <v-list-tile-title>Connexion</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="">     
                        <v-list-tile-content>
                            <v-list-tile-title>Inscription</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
        </v-navigation-drawer>

        <v-toolbar fixed app>    
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Kicksound</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat>Connexion</v-btn>
                <v-btn flat>Inscription</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
    
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Toolbar extends Vue {

    private drawer: any = null;

}
</script>
