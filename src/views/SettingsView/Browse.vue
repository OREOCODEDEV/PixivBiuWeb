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
        <span class="title">预览大小</span>
        <span class="description">设置在搜索预览时展示的图片尺寸大小，设置为小可同时预览更多图片</span>
        <SelectFromMulti :options="{ 小: 'small', 中: 'medium', 大: 'large' }" current_value="medium" />
    </div>
    <div class="max-w-130 w-130 flex flex-col py-4">
        <span class="title">预览分辨率</span>
        <span class="description">设置在搜索预览时展示的图片分辨率，如果无对应版本则按照不大于选项的最高分辨率版本显示</span>
        <SelectFromMulti :options="{ 小: 'small', 中: 'medium', 大: 'large', 原图: 'origin' }" current_value="medium" />
    </div>
    <div class="max-w-130 w-130 flex flex-col py-4">
        <span class="title">大图分辨率</span>
        <span class="description">设置在查看大图时是否尝试加载更高分辨率版本，如设置不加载则与预览分辨率保持一致以最大程度减少缓冲</span>
        <SelectFromMulti :options="{ 不加载: 'keep', 加载: 'load' }" current_value="load" />
    </div>
    <div class="max-w-130 w-130 flex flex-col py-4">
        <span class="title">保留筛选项</span>
        <span class="description">搜索新内容时，是否仍然保留筛选项并对新结果直接进行筛选</span>
        <SelectFromMulti :options="{ 不保留: 'drop', 保留: 'keep' }" current_value="drop" />
    </div>
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
