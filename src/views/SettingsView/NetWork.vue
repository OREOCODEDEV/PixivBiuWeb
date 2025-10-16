<script setup>
const storage = localStorage;
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
    <div class="max-w-130 w-130 flex shrink flex-col py-4">
        <span class="title">代理地址</span>
        <span class="description">设置用于加载图片的反向代理地址</span>
        <div class="flex items-stretch rounded-xl bg-blue-50 p-6">
            <input type="text" :value="storage.getItem('settings_proxy_server') ? storage.getItem('settings_proxy_server') : 'https://i.pximg.net'" class="h-full appearance-none focus:outline-none" />
        </div>
    </div>
</template>
