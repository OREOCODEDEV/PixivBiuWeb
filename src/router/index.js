import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/search/:search_content",
            name: "search",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/SearchView.vue"),
            children: [
                {
                    path: "all",
                    name: "search-all",
                    component: () => import("../views/SearchView/Image.vue"),
                },
                {
                    path: "illustrations",
                    name: "search-illustrations",
                    component: () => import("../views/SearchView/Image.vue"),
                },
                {
                    path: "manga",
                    name: "search-manga",
                    component: () => import("../views/SearchView/Image.vue"),
                },
                {
                    path: "dynamic",
                    name: "search-dynamic",
                    component: () => import("../views/SearchView/Image.vue"),
                },
                {
                    path: "users",
                    name: "search-users",
                    component: () => import("../views/SearchView/Illustrations.vue"),
                },
            ],
        },
        {
            path: "/settings",
            name: "settings",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/SettingsView.vue"),
            children: [
                {
                    path: "network",
                    name: "settings-network",
                    component: () => import("../views/SettingsView/NetWork.vue"),
                },
                {
                    path: "filter",
                    name: "settings-filter",
                    component: () => import("../views/SettingsView/Filter.vue"),
                },
                {
                    path: "browse",
                    name: "settings-browse",
                    component: () => import("../views/SettingsView/Browse.vue"),
                },
            ],
        },
    ],
});

export default router;
