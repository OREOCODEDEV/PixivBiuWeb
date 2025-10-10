<script>
export default {
    props: ["filter_key", "filter_value"],
    data() {
        return {
        }
    },
    components: [],
    methods: {
        on_click() {
            // todo:怪问题，需要深拷贝才能触发SearchFilter的样式更新，先这样后面再看看怎么个事
            // let route_query = this.$route.query
            let route_query = JSON.parse(JSON.stringify(this.$route.query))
            route_query[this.filter_key] = this.filter_value
            this.$router.replace({ query: route_query })
        }
    }
}
</script>

<style>
@reference "../../assets/tailwind.css";

.button-active {
    @apply text-blue-500;
    @apply bg-blue-100;
}
</style>

<template>
    <button class="rounded-lg h-8 w-25 text-sm cursor-pointer"
        :class="[$route.query[filter_key] == filter_value ? 'button-active' : '']" @click="on_click">
        <slot></slot>
    </button>
</template>