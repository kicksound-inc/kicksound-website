// 1. Make sure to import 'vue' before declaring augmented types
import Vue from "vue";
import { AxiosStatic } from "axios";
//import { Moment } from "moment";
import { Moment } from "moment-timezone";

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $http: AxiosStatic,
    $moment: Moment,
    $api: string,
    $image: string,
    $music: string
  }
}