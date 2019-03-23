<template>
  <v-app>

        <Toolbar/>

        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
    
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Toolbar from "@/components/Toolbar.vue";

@Component({
    components: {
        Toolbar
    }
})
export default class App extends Vue {

}

</script>
