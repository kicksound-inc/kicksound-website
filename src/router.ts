import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import store from "@/store/store";

Vue.use(Router);

const router: Router = new Router({
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
            meta: { requireAuth: true }
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requireAuth)) {
        if (!store.getters.isAuthenticated) {
            next({
                name: "Login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
