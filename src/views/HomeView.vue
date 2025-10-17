<script setup>
import { useRouter } from "vue-router";

import MaterialTypeBar from "@/components/MaterialTypeBar.vue";

const router = useRouter();
</script>

<template>
    <MaterialTypeBar></MaterialTypeBar>
    <div class="flex flex-1 items-center justify-center">
        <span>首页还没做！</span>
        <div class="cursor-pointer rounded-xl bg-blue-500 p-3 font-bold text-white" @click="router.push({ name: 'search-all', params: { search_content: '仁菜' } })">点我看看仁菜！</div>
    </div>
</template>
