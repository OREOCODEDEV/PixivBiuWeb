<script setup>
import { ref, computed } from "vue";
import SelectFromMultiVModel from "@/components/General/SelectFromMultiVModel.vue";
import { generateModelGroup } from "@/components/Settings.js";
const settings_model_group = generateModelGroup();
</script>

<template>
    <div class="custom-settings-block">
        <span class="custom-settings-title">预览大小</span>
        <span class="custom-settings-description">在搜索预览时展示的图片尺寸大小，设置为小可同时预览更多图片</span>
        <SelectFromMultiVModel :options="{ 小: 'small', 中: 'medium', 大: 'large' }" v-model="settings_model_group.settings_browse_size" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">预览分辨率</span>
        <span class="custom-settings-description">在搜索预览时展示的图片分辨率，如果无对应版本则按照不大于选项的最高分辨率版本显示</span>
        <SelectFromMultiVModel :options="{ 小: 'small', 中: 'medium', 大: 'large', 原图: 'origin' }" v-model="settings_model_group.settings_browse_resolution" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">查看分辨率</span>
        <span class="custom-settings-description">在查看大图时是否尝试加载更高分辨率版本，如设置不加载则与预览分辨率保持一致以最大程度减少缓冲</span>
        <SelectFromMultiVModel :options="{ 不加载: 'keep', 加载: 'load' }" v-model="settings_model_group.settings_view_resolution" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">固定分类栏</span>
        <span class="custom-settings-description">滚动查看图片时，分类栏是否固定在顶部而不跟随图片内容滑出屏幕</span>
        <SelectFromMultiVModel :options="{ 不固定: 'scroll', 固定: 'sticky' }" v-model="settings_model_group.settings_typebar_sticky" />
    </div>
</template>
