<script setup>
import axios from 'axios';
</script>

<script>
export default {
    data() {
        return {
            response_data: null
        }
    },
    methods: {
        refresh() {
            console.log("aaaa")
            return
            axios.get()
                .then((response) => {
                    response_data = response
                })
        }
    },
    mounted() {
        this.refresh()
    },
    beforeRouteLeave(to, from) {
        // 在导航离开渲染该组件的对应路由时调用
        // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
        this.refresh()
    },
}
</script>

<template>
    {{ response_data }}
</template>