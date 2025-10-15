<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import SelectFromMulti from "./SelectFromMulti.vue";

const route = useRoute();
const router = useRouter();

const props = defineProps(["options", "option_key"]);

const first_option_value = Object.values(props.options)[0];

const is_selection_activate = computed(() => {
    return (key) => {
        if (route.query[props.option_key] === undefined && first_option_value == key) {
            // 首个按钮会视作默认行为，在URL query参数中即使没有包含也会高亮
            return true;
        }
        if (route.query[props.option_key] == key) {
            return true;
        }
        return false;
    };
});

function on_click(value) {
    // todo:怪问题，需要深拷贝才能触发SearchFilter的样式更新，先这样后面再看看怎么个事
    // let route_query = this.$route.query
    let route_query = JSON.parse(JSON.stringify(route.query));
    if (first_option_value == value) {
        // 默认行为（首个选项）从query中移除
        value = undefined;
    }
    route_query[props.option_key] = value;
    router.replace({ query: route_query });
}
</script>

<template>
    <SelectFromMulti :options="options" :current_value="route.query[props.option_key] === undefined ? first_option_value : route.query[props.option_key]" @on_click="on_click"></SelectFromMulti>
</template>
