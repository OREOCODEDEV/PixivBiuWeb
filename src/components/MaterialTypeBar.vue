<script setup>
import InBoxIcon from "@/assets/InBoxIcon.vue";
import PersonIcon from "@/assets/PersonIcon.vue";
import MangaIcon from "@/assets/MangaIcon.vue";
import ImageIcon from "@/assets/ImageIcon.vue";
import MultiImageIcon from "@/assets/MultiImageIcon.vue";

import InBoxFilterIcon from "@/assets/InBoxFilterIcon.vue";
import ImageFillIcon from "@/assets/ImageFillIcon.vue";
import MangaFillIcon from "@/assets/MangaFillIcon.vue";
import SettingsIcon from "@/assets/SettingsIcon.vue";
import SearchIcon from "@/assets/SearchIcon.vue";
import HomeIcon from "@/assets/HomeIcon.vue";
import HomeIconFill from "@/assets/HomeIconFill.vue";

import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const router_type = [
    { name: "首页", value: "home", icon: HomeIcon, icon_fill: HomeIconFill },
    route.name.includes("search") ? { name: "搜索", value: "search-all", icon: SearchIcon, icon_fill: SearchIcon } : undefined,
    { name: "设置", value: "settings", icon: SettingsIcon, icon_fill: SettingsIcon },
];

const is_activated_route = computed(() => {
    return (route_name) => {
        return route.name == route_name;
    };
});
</script>

<template>
    <div class="flex flex-col space-y-3 bg-gray-100 py-6">
        <template v-for="current_type of router_type">
            <RouterLink :to="{ name: current_type.value, params: route.params, query: route.query }" class="mx-5 flex cursor-pointer flex-col items-center" v-if="current_type">
                <div class="flex rounded-full p-1 px-4" :class="[is_activated_route(current_type.value) ? 'bg-blue-200' : 'hover:bg-gray-300']">
                    <component :is="current_type.icon" v-if="!is_activated_route(current_type.value)"></component>
                    <component :is="current_type.icon_fill" class="fill-blue-900" v-else></component>
                </div>
                <span class="pt-1 font-bold" :class="[is_activated_route(current_type.value) ? 'text-blue-900' : 'text-gray-700']"> {{ current_type.name }}</span>
            </RouterLink>
        </template>
    </div>
</template>
