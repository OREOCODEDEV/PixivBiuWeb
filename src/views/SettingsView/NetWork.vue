<script setup>
import { generateModelGroup, saveSettings } from "@/components/Settings.js";
const settings_model_group = generateModelGroup();
</script>

<template>
    <div class="custom-settings-block">
        <span class="custom-settings-title">代理地址</span>
        <span class="custom-settings-description">设置用于加载图片的反向代理地址</span>
        <div class="custom-settings-inputstring">
            <input type="text" class="focus:outline-none" v-model="settings_model_group.settings_network_image_proxy" />
        </div>
    </div>
</template>
