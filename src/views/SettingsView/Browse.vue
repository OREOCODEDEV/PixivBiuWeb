<script setup>
import { ref, computed } from "vue";
import SelectFromMultiVModel from "@/components/General/SelectFromMultiVModel.vue";
import { generateModelGroup, saveSettings } from "@/components/Settings.js";
const settings_model_group = generateModelGroup();
</script>

<template>
    <div class="custom-settings-block">
        <span class="custom-settings-title">每行图片数量</span>
        <span class="custom-settings-description">在搜索预览时每行显示的图片数量</span>
        <SelectFromMultiVModel :options="{ '6': '6', '8': '8', '10': '10' }" v-model="settings_model_group.settings_browse_row_count" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">预览内容自适应</span>
        <span class="custom-settings-description">当窗口宽度不足时，自动调节每行图片数量及图片间距</span>
        <SelectFromMultiVModel :options="{ 不允许: '0', 允许: '1' }" v-model="settings_model_group.settings_browse_allow_adjust_row_count" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">预览分辨率</span>
        <span class="custom-settings-description">在搜索预览时展示的图片分辨率。设置为"小"时可能会导致内容展示不全，建议设置"中"或更高</span>
        <SelectFromMultiVModel :options="{ 小: 'small', 中: 'medium', 大: 'large' }" v-model="settings_model_group.settings_browse_resolution" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">查看分辨率</span>
        <span class="custom-settings-description">在查看大图时是否尝试加载更高分辨率版本，如设置不加载则与预览分辨率保持一致</span>
        <SelectFromMultiVModel :options="{ 不加载: '0', 加载: '1' }" v-model="settings_model_group.settings_view_resolution" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">固定分类栏</span>
        <span class="custom-settings-description">滚动查看图片时，分类栏是否固定在顶部而不跟随图片内容滑出屏幕</span>
        <SelectFromMultiVModel :options="{ 不固定: '0', 固定: '1' }" v-model="settings_model_group.settings_typebar_sticky" />
    </div>
</template>
