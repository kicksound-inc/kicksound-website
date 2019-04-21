import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("./views/Login.vue"),
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("./views/Register.vue"),
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () => import("./views/Dashboard.vue"),

        }
    ],
});
