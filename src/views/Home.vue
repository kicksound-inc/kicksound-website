<template>
    <v-layout>
        <HelloWorld :title="msg"/>
    </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  }
})
export default class Home extends Vue {

    msg: string = "Welcome to Your Vue.js + TypeScript + Vuetify App";

    onClick(): void {
        alert("Bonjour");
    }
}

</script>
