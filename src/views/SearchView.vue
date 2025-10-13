<script setup>
import FilterType from '@/components/ImageView/FilterType.vue';
</script>

<template>
    <div class="flex flex-col pt-4 space-y-4">
        <FilterType />
        <router-view />
    </div>
</template>
