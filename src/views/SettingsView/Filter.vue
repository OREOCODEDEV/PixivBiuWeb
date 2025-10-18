<script setup>
const storage = localStorage;
import SelectFromMulti from "@/components/General/SelectFromMulti.vue";
</script>

<template>
    <div class="custom-settings-block">
        <span class="custom-settings-title">保留筛选项</span>
        <span class="custom-settings-description">搜索新内容时，是否仍然保留筛选项并直接对新结果进行筛选</span>
        <SelectFromMulti :options="{ 不保留: 'drop', 保留: 'keep' }" current_value="drop" />
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">搜索页数</span>
        <span class="custom-settings-description">搜索时从源站抓取的页面数量，设置越大则获取的图片数量越多，数据排名越客观，但容易引起风控及系统卡顿。建议设置合适数值。</span>
        <div class="custom-settings-inputstring">
            <input type="text" :value="storage.getItem('settings_proxy_server') ? storage.getItem('settings_proxy_server') : '5'" class="focus:outline-none" />
        </div>
    </div>
    <div class="custom-settings-block">
        <span class="custom-settings-title">R18筛选模式</span>
        <span class="custom-settings-description">筛选R18标签时是否重新请求图片集以获取更多图片</span>
        <SelectFromMulti :options="{ 不请求: 'frontend', 请求: 'backend' }" current_value="frontend" />
    </div>
</template>
