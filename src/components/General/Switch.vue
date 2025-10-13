<script>
export default {
    props: ['modelValue'],
    data() {
        return {
        }
    },
    emits: ['update:modelValue'],
    methods: {
        on_click_switch() {
            // console.log(this.modelValue)
            this.$emit('update:modelValue', !this.modelValue);
        }
    }
}
</script>

<template>
    <div class="flex w-9 h-5 rounded-full items-center cursor-pointer"
        :class="[modelValue ? 'bg-blue-500 flex-row-reverse hover:bg-blue-400' : 'bg-gray-300 hover:bg-gray-400']" @click="on_click_switch">
        <div class="w-3 h-3 bg-white rounded-full mx-1">
        </div>
    </div>
</template>
