<script setup>
import NetworkIcon from "@/assets/NetworkIcon.vue";
import SearchIcon from "@/assets/SearchIcon.vue";
import BackIcon from "@/assets/BackIcon.vue";

import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const router_type = [
    { name: "搜索与浏览", value: "settings-browse", icon: SearchIcon, icon_fill: SearchIcon },
    { name: "网络与代理", value: "settings-network", icon: NetworkIcon, icon_fill: NetworkIcon },
];

const is_activated_route = computed(() => {
    return (route_name) => {
        return route.name == route_name;
    };
});

if (route.name == "settings") {
    router.replace({ name: router_type[0].value });
}
</script>

<template>
    <div class="flex max-h-screen grow flex-col self-stretch">
        <div class="flex cursor-pointer p-4 text-2xl font-bold">
            <span class="text-pink-500">PixivBiu</span>
            <span class="ml-2 font-normal text-orange-500">设置</span>
        </div>
        <!-- todo: 又一个样式怪问题，设置h-full或者flex-1会导致内容的overflow-scroll出问题，先用计算后面再修 -->
        <div class="flex max-h-[calc(100vh-64px)] flex-1 flex-row">
            <div class="rounded-tr-4xl flex flex-col self-stretch bg-blue-50 py-3">
                <template v-for="current_type of router_type">
                    <RouterLink
                        replace
                        :to="{ name: current_type.value, params: route.params, query: route.query }"
                        class="w-51 mx-3 flex h-14 cursor-pointer flex-row items-center space-x-4 rounded-full px-3 text-center"
                        :class="[is_activated_route(current_type.value) ? 'bg-blue-200' : 'hover:bg-gray-300']"
                    >
                        <component :is="current_type.icon" v-if="!is_activated_route(current_type.value)" class="fill-gray-800"></component>
                        <component :is="current_type.icon_fill" v-else class="fill-blue-800"></component>
                        <span :class="[is_activated_route(current_type.value) ? 'text-blue-800' : 'text-gray-700']"> {{ current_type.name }}</span>
                    </RouterLink>
                </template>
            </div>
            <div class="ml-20 flex flex-1 flex-col px-4 pt-4">
                <div class="flex cursor-pointer flex-row items-center space-x-2 pb-4 text-lg" @click="router.go(-1)">
                    <BackIcon></BackIcon>
                    <span>返回</span>
                </div>
                <div class="h-full min-h-0 overflow-y-auto">
                    <div class="flex flex-1 flex-col">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
