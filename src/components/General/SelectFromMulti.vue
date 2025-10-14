<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

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

<style>
@reference "../../assets/tailwind.css";

.active {
    @apply text-white;
    @apply bg-blue-500;
    @apply rounded-full;
}
</style>

<template>
    <div class="flex text-sm">
        <!-- 多选控件最外层（底下灰色） -->
        <div class="flex grow items-center rounded-full bg-gray-300 p-1.5">
            <!-- 所有按键的最小外层 -->
            <div class="flex grow">
                <template v-for="(value, name) of props.options">
                    <span class="mx-auto cursor-pointer p-2" :class="is_selection_activate(value) ? 'active' : ''" @click="on_click(value)">{{ name }}</span>
                </template>
            </div>
        </div>
    </div>
</template>
