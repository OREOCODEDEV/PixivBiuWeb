<script setup>
import FilterGroup from '@/components/ImageView/FilterGroup.vue';
import ImageGroup from '@/components/ImageView/ImageGroup.vue';
</script>

<template>
    <div class="flex w-18/20 mx-auto flex-col text-sm">
        <FilterGroup></FilterGroup>
    </div>

    <div class="flex w-18/20 mx-auto flex-col text-sm">
        <ImageGroup></ImageGroup>
    </div>
</template>