import Vue from "vue";
import Router from "vue-router";
import Test from "@/views/Test.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "Home",
            component: Test,
        },
        {
            path: "/login",
            name: "Login",
            component: () => import(/* webpackChunkName: "about" */ "./views/Login.vue"),
        },
        {
            path: "/register",
            name: "Register",
            component: () => import(/* webpackChunkName: "about" */ "./views/Register.vue"),
        }
        //{
        //path: "/about",
        //name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        //component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
        //},

    ],
});
