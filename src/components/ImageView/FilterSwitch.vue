<script setup>
import Switch from '../General/Switch.vue';
</script>

<script>
export default {
    props: ["query_key"],
    data() {
        return {
            state: false
        }
    },
    components: [],
    methods: {
    },
    watch: {
        state(new_state, old_state) {
            // todo:怪问题，需要深拷贝才能触发SearchFilter的样式更新，先这样后面再看看怎么个事
            // let route_query = this.$route.query
            let route_query = JSON.parse(JSON.stringify(this.$route.query))
            route_query[this.query_key] = this.state ? true : undefined
            this.$router.replace({ query: route_query })
        }
    },
    mounted() {
        this.state = this.$route.query[this.query_key] == true
    }
}
</script>

<template>
    <Switch v-model="state"></Switch>
</template>