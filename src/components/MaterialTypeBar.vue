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

import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const router_type = [
    { name: "全部", value: "search-all", icon: InBoxIcon, icon_fill: InBoxFilterIcon },
    { name: "插画", value: "search-illustrations", icon: ImageIcon, icon_fill: ImageFillIcon },
    { name: "漫画", value: "search-manga", icon: MangaIcon, icon_fill: MangaFillIcon },
    { name: "动图", value: "search-dynamic", icon: MultiImageIcon, icon_fill: ImageFillIcon },
    { name: "用户", value: "search-users", icon: PersonIcon, icon_fill: ImageFillIcon },
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
            <RouterLink :to="{ name: current_type.value, params: route.params, query: route.query }" class="mx-5 flex cursor-pointer flex-col items-center">
                <div class="flex rounded-full p-1 px-4" :class="[is_activated_route(current_type.value) ? 'bg-blue-200' : 'hover:bg-gray-300']">
                    <component :is="current_type.icon" v-if="!is_activated_route(current_type.value)"></component>
                    <component :is="current_type.icon_fill" v-else></component>
                </div>
                <span class="pt-1 font-bold" :class="[is_activated_route(current_type.value) ? 'text-blue-900' : 'text-gray-700']"> {{ current_type.name }}</span>
            </RouterLink>
        </template>
    </div>
</template>
