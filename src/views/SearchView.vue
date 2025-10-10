<script setup>
import FilterType from '@/components/ImageView/FilterType.vue';
import FilterGroup from '@/components/ImageView/FilterGroup.vue';
</script>

<template>
    <FilterType class="pt-8" />

    <div class="bg-gray-100 h-0.5 mt-1"></div>

    <div class="flex w-18/20 mx-auto flex-col text-sm mt-4">
        <FilterGroup></FilterGroup>
    </div>

</template>
