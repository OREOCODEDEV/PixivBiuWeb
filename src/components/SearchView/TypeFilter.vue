<script>
export default {
    data() {
        return {
            image_type_filter_values: [
                { name: "全部", value: "search-all" },
                { name: "插画", value: "search-illustrations" },
                { name: "漫画", value: "search-manga" },
                { name: "动图", value: "search-dynamic" },
                { name: "用户", value: "search-users" },
            ],
        }
    }
}
</script>

<style>
@reference "../../assets/tailwind.css";

.router-link-exact-active {
    @apply text-blue-500;
}
</style>

<template>
    <div class="flex w-18/20 mx-auto">
        <div class="flex w-full space-x-16">
            <template v-for="item in image_type_filter_values">
                <div class="">
                    <RouterLink :to="{ name: item.value, params: $route.params, query: $route.query }" class="">
                        {{ item.name }}
                    </RouterLink>
                    <div class="bg-blue-500 h-1 mt-2 rounded-full" v-if="$route.name == item.value">
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
