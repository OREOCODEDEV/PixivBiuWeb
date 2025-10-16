<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
const router = useRouter();
const route = useRoute();

onMounted(() => {
    console.log(route.name);
    if (route.name == "home") {
        // 主页还没做，直接先看看仁菜吧！*欸嘿
        router.replace({ name: "search", params: { search_content: "仁菜" } });
    }
});
</script>

<template>
    <RouterView />
</template>
