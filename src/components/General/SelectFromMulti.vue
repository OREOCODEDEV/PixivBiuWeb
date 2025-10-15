<script setup>
const props = defineProps(["options", "current_value"]);
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
        <div class="flex grow items-center rounded-full bg-gray-300 p-1.5 hover:bg-transparent">
            <!-- 所有按键的最小外层 -->
            <div class="flex grow">
                <template v-for="(value, name) of props.options">
                    <span class="mx-auto grow cursor-pointer justify-center rounded-full p-2 text-center" :class="value == props.current_value ? 'active' : 'hover:bg-gray-200'" @click="$emit('on_click', value)">{{ name }}</span>
                </template>
            </div>
        </div>
    </div>
</template>
