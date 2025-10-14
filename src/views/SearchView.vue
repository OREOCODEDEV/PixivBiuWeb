<script setup>
import MaterialTypeBar from "@/components/MaterialTypeBar.vue";
import SearchBar from "@/components/SearchBar.vue";
import MaterialFilterBar from "@/components/MaterialFilterBar.vue";
import DownloadIcon from "@/assets/DownloadIcon.vue";
import FilterIcon from "@/assets/FilterIcon.vue";
import FilterFillIcon from "@/assets/FilterFillIcon.vue";

import { ref } from "vue";

const MaterialFilterBarRef = ref(null);

setTimeout(() => {
    console.log(MaterialFilterBarRef);
}, 2000);
</script>

<template>
    <MaterialTypeBar></MaterialTypeBar>
    <MaterialFilterBar ref="MaterialFilterBarRef"></MaterialFilterBar>
    <div class="flex grow self-stretch">
        <div class="max-w-18/20 mx-auto flex max-h-screen grow flex-col">
            <div class="max-h-22 flex grow space-x-4 py-4">
                <div class="flex cursor-pointer items-center self-stretch rounded-xl px-4 text-3xl font-bold hover:bg-gray-200">
                    <span class="text-pink-500">Pixiv</span>
                    <span class="text-orange-500">Biu</span>
                </div>
                <SearchBar></SearchBar>
                <!-- todo: 修复生命周期问题导致的加载错误 -->
                <div
                    class="self-shirk flex cursor-pointer items-center rounded-xl p-4 hover:bg-gray-200"
                    :class="[MaterialFilterBarRef.show_state ? 'bg-blue-200' : '']"
                    @click="MaterialFilterBarRef.show_state = !MaterialFilterBarRef.show_state"
                    v-if="MaterialFilterBarRef && MaterialFilterBarRef.show_state !== undefined"
                >
                    <FilterIcon v-if="!MaterialFilterBarRef.show_state"></FilterIcon>
                    <FilterFillIcon v-else></FilterFillIcon>
                </div>
                <div class="self-shirk flex cursor-pointer items-center rounded-xl p-4 hover:bg-gray-200">
                    <DownloadIcon></DownloadIcon>
                </div>
            </div>
            <div class="flex grow overflow-y-auto">
                <router-view />
            </div>
        </div>
    </div>
</template>
