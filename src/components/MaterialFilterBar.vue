<script setup>
import FilterIcon from "@/assets/FilterIcon.vue";
import SelectFromMulti from "./General/SelectFromMulti.vue";
import CloseIcon from "@/assets/CloseIcon.vue";
import RefreshIcon from "@/assets/RefreshIcon.vue";

import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const show_state = ref(false);
const route = useRoute();
const router = useRouter();

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
        option: { 收藏: "favourite", 浏览: "views", 最新: "date", 收藏比: "ratio" },
        key: "sorttype",
    },
    {
        name: "搜索方式",
        option: { 部分标签: "tag", 全部标签: "otag", "标题/描述": "des" },
        key: "tagtype",
    },
    {
        name: "收藏数",
        option: { 所有: "all", "3K+": "3000:", "1.5K+": "1500:", "1K+": "1000:", "500+": "500:" },
        key: "favourite",
    },
    {
        name: "浏览量",
        option: { 所有: "all", "2W+": "20000:", "1W+": "10000:", "5K+": "5000:", "1K+": "1000:" },
        key: "views",
    },
    {
        name: "发表时间",
        option: {
            所有: "all",
            半年内: half_year_before_days.toLocaleDateString().replaceAll("/", "-") + ":",
            一月内: month_before_days.toLocaleDateString().replaceAll("/", "-") + ":",
            一周内: week_before_days.toLocaleDateString().replaceAll("/", "-") + ":",
        },
        key: "date",
    },
    {
        name: "图片数量",
        option: { 混合: "mix", 仅单图: ":1", 仅多图: "2:" },
        key: "imgcount",
    },
];

const has_query = computed(() => {
    return Object.keys(route.query).length != 0;
});

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
            <div class="flex flex-row rounded-full p-2" :class="[has_query ? 'cursor-pointer fill-blue-500 text-blue-500 hover:bg-blue-100' : 'fill-gray-300 text-gray-300']" @click="router.replace({ query: {} })">
                <RefreshIcon></RefreshIcon>
                <span class="ml-1 pr-1">清除筛选</span>
            </div>
            <div class="aspect-square cursor-pointer items-center rounded-full p-1.5 hover:bg-gray-300" @click="show_state = false">
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
