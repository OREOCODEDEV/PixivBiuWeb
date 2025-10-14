<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import SearchIcon from "@/assets/SearchIcon.vue";
import CloseIcon from "@/assets/CloseIcon.vue";

const route = useRoute();
const search_text = ref();

onMounted(() => {
    search_text.value = route.params.search_content;
});
</script>

<template>
    <div class="flex flex-auto items-center rounded-full bg-gray-100 hover:bg-gray-200">
        <!-- 搜索icon -->
        <SearchIcon class="mx-4"></SearchIcon>
        <input type="text" class="h-10 flex-auto font-bold placeholder:text-sm focus:outline-none" placeholder="搜索作品" v-model="search_text" @keyup.enter="$router.push({ name: 'search-all', params: { search_content: search_text } })" />
        <div class="mx-3 aspect-square cursor-pointer items-center rounded-full p-1.5 hover:bg-gray-300" v-if="search_text" @click="search_text = ''">
            <CloseIcon></CloseIcon>
        </div>
    </div>
</template>
