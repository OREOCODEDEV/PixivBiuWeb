<script setup>
import FilterSwitch from '@/components/ImageView/FilterSwitch.vue';
import FilterButtonGroup from '@/components/ImageView/FilterButtonGroup.vue';
</script>

<script>
export default {
    data() {
        return {
        }
    },
    components: [],
    methods: {
    },
    computed: {
        query_time_options() {
            // 时间筛选选项生成
            let now_days = new Date();

            let week_before_days = new Date(now_days)
            week_before_days.setDate(now_days.getDate() - 7);

            let month_before_days = new Date(now_days)
            month_before_days.setMonth(now_days.getMonth() - 1);

            let half_year_before_days = new Date(now_days)
            half_year_before_days.setMonth(now_days.getMonth() - 6);

            return {
                "所有时间": "all",
                "最近半年": half_year_before_days.toLocaleDateString(),
                "最近一月": month_before_days.toLocaleDateString(),
                "最近一周": week_before_days.toLocaleDateString(),
            }
        }
    }
}
</script>


<template>
    <div class="flex space-x-4">
        <FilterButtonGroup :query_options="{ '按收藏': 'favourite', '按浏览': 'otag', '标题/描述': 'des' }" query_key="sorttype">
        </FilterButtonGroup>
    </div>

    <div class="flex mt-4 space-x-4">
        <FilterButtonGroup :query_options="{ '部分标签': 'tag', '全部标签': 'otag', '标题/描述': 'des' }" query_key="tagtype">
        </FilterButtonGroup>
    </div>

    <div class="flex mt-4 space-x-4">
        <FilterButtonGroup
            :query_options="{ '所有收藏数': 'all', '5000 以上': '5000:', '2500 以上': '2500:', '1000 以上': '1000:', '250 以上': '250:' }"
            query_key="favourite">
        </FilterButtonGroup>
    </div>

    <div class="flex mt-4 space-x-4">
        <FilterButtonGroup
            :query_options="{ '所有浏览量': 'all', '5 万以上': '50000:', '2.5 万以上': '25000:', '1 万以上': '10000:', '2500 以上': '2500:' }"
            query_key="views">
        </FilterButtonGroup>
    </div>

    <div class="flex mt-4 space-x-4">
        <FilterButtonGroup :query_options="query_time_options" query_key="posttime">
        </FilterButtonGroup>
    </div>

    <div class="flex align-middle items-center mt-4">
        <span>包含 AI 生成作品</span>
        <FilterSwitch query_key="ignore_ai" class="mx-3" />
    </div>
</template>