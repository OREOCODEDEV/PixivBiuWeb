<script setup>
const storage = localStorage;
</script>

<template>
    <div class="custom-settings-block">
        <span class="custom-settings-title">代理地址</span>
        <span class="custom-settings-description">设置用于加载图片的反向代理地址</span>
        <div class="custom-settings-inputstring">
            <input type="text" :value="storage.getItem('settings_proxy_server') ? storage.getItem('settings_proxy_server') : 'https://i.pximg.net'" class="focus:outline-none" />
        </div>
    </div>
</template>
