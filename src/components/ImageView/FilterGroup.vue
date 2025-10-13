<script setup>
import FilterSwitch from '@/components/ImageView/FilterSwitch.vue';
import FilterButtonGroup from '@/components/ImageView/FilterButtonGroup.vue';
</script>

<script>

// 时间筛选选项生成
const now_days = new Date();

const week_before_days = new Date(now_days)
week_before_days.setDate(now_days.getDate() - 7);

const month_before_days = new Date(now_days)
month_before_days.setMonth(now_days.getMonth() - 1);

const half_year_before_days = new Date(now_days)
half_year_before_days.setMonth(now_days.getMonth() - 6);

const options_data = [
    {
        option: { '按收藏': 'favourite', '按浏览': 'views', '从早至晚': 'date', '从晚至早': 'rdate' },
        key: "sorttype"
    },
    {
        option: { '部分标签': 'tag', '全部标签': 'otag', '标题/描述': 'des' },
        key: "tagtype"
    },
    {
        option: { '所有收藏数': 'all', '5000 以上': '5000:', '2500 以上': '2500:', '1000 以上': '1000:', '250 以上': '250:' },
        key: "favourite"
    },
    {
        option: { '所有浏览量': 'all', '5 万以上': '50000:', '2.5 万以上': '25000:', '1 万以上': '10000:', '2500 以上': '2500:' },
        key: "views"
    },
    {
        option: {
            "所有时间": "all",
            "最近半年": half_year_before_days.toLocaleDateString(),
            "最近一月": month_before_days.toLocaleDateString(),
            "最近一周": week_before_days.toLocaleDateString(),
        },
        key: "posttime"
    },
]
</script>


<template>
    <div class="space-y-4">
        <template v-for="current_option of options_data">
            <div class="flex space-x-4">
                <FilterButtonGroup :query_options="current_option.option" :query_key="current_option.key">
                </FilterButtonGroup>
            </div>
        </template>

        <div class="flex align-middle items-center">
            <span>包含 AI 生成作品</span>
            <FilterSwitch query_key="ignore_ai" class="mx-3" />
        </div>
    </div>
</template>