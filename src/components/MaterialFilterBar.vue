<script setup>
import FilterIcon from "@/assets/FilterIcon.vue";
import SelectFromMulti from "./General/SelectFromMulti.vue";
import CloseIcon from "@/assets/CloseIcon.vue";
import RefreshIcon from "@/assets/RefreshIcon.vue";

import { ref } from "vue";

const show_state = ref(false);

// 时间筛选选项生成
const now_days = new Date();

const week_before_days = new Date(now_days);
week_before_days.setDate(now_days.getDate() - 7);

const month_before_days = new Date(now_days);
month_before_days.setMonth(now_days.getMonth() - 1);

const half_year_before_days = new Date(now_days);
half_year_before_days.setMonth(now_days.getMonth() - 6);

const options_data = [
    {
        name: "排序方式",
        option: { 按收藏: "favourite", 按浏览: "views", 从早至晚: "date", 从晚至早: "rdate" },
        key: "sorttype",
    },
    {
        name: "搜索方式",
        option: { 部分标签: "tag", 全部标签: "otag", "标题/描述": "des" },
        key: "tagtype",
    },
    {
        name: "收藏数",
        option: { 所有: "all", "5K+": "5000:", "2.5K+": "2500:", "1K+": "1000:", "0.25K+": "250:" },
        key: "favourite",
    },
    {
        name: "浏览量",
        option: { 所有: "all", "5W+": "50000:", "2.5W+": "25000:", "1W+": "10000:", "0.25W+": "2500:" },
        key: "views",
    },
    {
        name: "发表时间",
        option: {
            所有: "all",
            半年内: half_year_before_days.toLocaleDateString() + ":",
            一月内: month_before_days.toLocaleDateString() + ":",
            一周内: week_before_days.toLocaleDateString() + ":",
        },
        key: "posttime",
    },
];

defineExpose({
    show: () => {
        show_state.value = true;
    },
    hide: () => {
        show_state.value = false;
    },
    show_state: show_state,
});
</script>

<template>
    <div class="flex flex-col space-y-6 text-nowrap bg-gray-50 p-6 text-base font-bold text-gray-600" v-if="show_state">
        <div class="flex flex-row items-center justify-end space-x-4">
            <div class="flex flex-row">
                <RefreshIcon></RefreshIcon>
                <span class="ml-2">清除筛选</span>
            </div>
            <div class="aspect-square cursor-pointer items-center rounded-full p-1.5 hover:bg-gray-300">
                <CloseIcon></CloseIcon>
            </div>
        </div>
        <div class="flex flex-row items-center">
            <FilterIcon></FilterIcon>
            <span class="ml-2">结果筛选</span>
        </div>
        <template v-for="item of options_data">
            <div class="flex flex-col space-y-3">
                <span>
                    {{ item.name }}
                </span>
                <SelectFromMulti :options="item.option" :option_key="item.key"></SelectFromMulti>
            </div>
        </template>
    </div>
</template>
