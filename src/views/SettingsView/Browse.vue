<script setup>
const storage = localStorage;
import SelectFromMulti from "@/components/General/SelectFromMulti.vue";
</script>

<style>
@reference "../../assets/tailwind.css";

.title {
    @apply text-xl;
    @apply pb-4;
}

.description {
    @apply pb-4;
    @apply text-gray-800;
    @apply break-all;
    @apply w-auto;
}
</style>

<template>
    <div class="max-w-130 w-130 flex flex-col py-4">
        <span class="title">搜索页数</span>
        <span class="description">设置搜索时从源站抓取的页面数量，设置越大则获取的图片数量越多，数据排名越客观，但容易引起风控及系统卡顿。建议设置合适数值。</span>
        <div class="flex items-stretch rounded-xl bg-blue-50 p-6">
            <input type="text" :value="storage.getItem('settings_proxy_server') ? storage.getItem('settings_proxy_server') : '5'" class="h-full appearance-none focus:outline-none" />
        </div>
    </div>
    <div class="max-w-130 w-130 flex flex-col py-4">
        <span class="title">R18筛选模式</span>
        <span class="description">设置筛选R18标签时是否重新请求图片集以获取更多图片</span>
        <SelectFromMulti :options="{ 不请求: 'frontend', 请求: 'backend' }" current_value="frontend" />
    </div>
    <!-- <div class="max-w-130 w-130 flex flex-col py-4">
        <span class="title">R18筛选模式</span>
        <span class="description">设置筛选R18标签时是否重新请求图片集以获取更多图片</span>
        <SelectFromMulti :options="{ 不请求: 'frontend', 请求: 'backend' }" current_value="frontend" />
    </div> -->
</template>
