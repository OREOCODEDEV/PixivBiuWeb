<script setup>
import FilterButton from './FilterButton.vue';
</script>

<script>
export default {
    // query_options:数据Object
    // query_key:在URL中的查询参数名称
    props: ["query_options", "query_key"],
    data() {
        return {
        }
    },
    components: [],
    methods: {
    },
    mounted() {
    }
}
</script>

<template>
    <!-- 首个按钮会视作默认行为，在URL query参数中即使没有包含也会高亮 -->
    <template v-for="value, name of query_options">
        <FilterButton :filter_key="query_key"
            :filter_value="query_options[Object.keys(query_options)[0]] == value ? undefined : value">
            {{ name }}
        </FilterButton>
    </template>
</template>