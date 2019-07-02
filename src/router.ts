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
            meta: { enableFullScreenImage: true }
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("./views/Register.vue"),
            beforeEnter: denyAuth,
            meta: { enableFullScreenImage: true }
        },
        {
            path: "/",
            name: "Home",
            component: () => import("./views/Dashboard.vue"),
            meta: { requireAuth: true }
        },
        {
            path: "/playlists",
            name: "Playlists",
            component: () => import("./views/Playlists.vue"),
            meta: { requireAuth: true }
        },
        {
            path: "/events",
            name: "Events",
            component: () => import("./views/Events/Events.vue"),
            meta: { requireAuth: true },
            children: [
                {
                    path: "my",
                    name: "MyEvents",
                    component: () => import("./views/Events/MyEvents.vue")
                },
                {
                    path: "gestion",
                    name: "GestionEvents",
                    component: () => import("./views/Events/GestionEvents.vue")
                },
                {
                    path: "",
                    name: "FollowsEvents",
                    component: () => import("./views/Events/FollowsEvents.vue")
                },
            ]
        },
        {
            path: "/event/:id",
            meta: { requireAuth: true },
            component: () => import("./views/Events/Event.vue"),
        },
        {
            path: "/user/:id",
            meta: { requireAuth: true },
            component: () => import("./views/User.vue"),
        },
        {
            path: "/lives",
            name: "Lives",
            component: () => import("./views/Lives.vue"),
            meta: { requireAuth: true }
        },
        {
            path: "/settings",
            redirect: "/settings/account",
            name: "Settings",
            component: () => import("./views/Settings/Settings.vue"),
            meta: { requireAuth: true },
            children: [
                {
                    path: "account",
                    name: "Account",
                    component: () => import("./views/Settings/Account.vue")
                },
                {
                    path: "password",
                    name: "Password",
                    component: () => import("./views/Settings/Password.vue")
                }
            ]
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
        store.commit("setDrawerDesktop", false);
        next();
    }
}

export default router;
