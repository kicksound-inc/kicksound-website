import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import store from "@/store/store";
import NotFound from "@/views/NotFound.vue";

Vue.use(Router);

const router: Router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "Login",
            component: Login,
            beforeEnter: denyAuth,
            meta: { enableFullScreenImage: true}
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("./views/Register.vue"),
            beforeEnter: denyAuth,
            meta: { enableFullScreenImage: true}
        },
        {
            path: "/",
            name: "Home",
            component: () => import("./views/Dashboard.vue"),
            meta: { requireAuth: true }
        },
        {
            path: "*",
            component: NotFound
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

function denyAuth(to: any, from: any, next: any) {
    if (store.getters.isAuthenticated) {
        next({
            name: from.name ? from.name : "Home"
        });
    } else {
        next();
    }
}

export default router;
