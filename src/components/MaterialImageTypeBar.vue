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
];

const is_activated_route = computed(() => {
    return (route_name) => {
        return route.name == route_name;
    };
});
</script>

<template>
    <div class="flex h-20 grow flex-row rounded-full bg-gray-100 mb-4">
        <template v-for="current_type of router_type">
            <RouterLink
                :to="{ name: current_type.value, params: route.params, query: route.query }"
                class="flex grow cursor-pointer flex-row items-center justify-center rounded-full"
                :class="[is_activated_route(current_type.value) ? 'bg-blue-200' : 'hover:bg-gray-300']"
            >
                <div class="flex rounded-full p-1 px-4">
                    <component :is="current_type.icon" v-if="!is_activated_route(current_type.value)"></component>
                    <component :is="current_type.icon_fill" v-else></component>
                    <span class="font-bold" :class="[is_activated_route(current_type.value) ? 'text-blue-900' : 'text-gray-700']"> {{ current_type.name }}</span>
                </div>
            </RouterLink>
        </template>
    </div>
</template>
