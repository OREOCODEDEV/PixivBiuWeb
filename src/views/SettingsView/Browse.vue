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
        <span class="title">固定分类栏</span>
        <span class="description">设置滚动查看图片时，分类栏是否固定在顶部而不跟随图片内容滑出屏幕</span>
        <SelectFromMulti :options="{ 不加载: 'keep', 加载: 'load' }" current_value="load" />
    </div>
</template>
