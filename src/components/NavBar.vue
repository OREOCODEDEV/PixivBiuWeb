<script setup>
import SearchBar from './SearchBar.vue'
</script>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<template>
    <div class="flex flex-nowrap h-15 w-screen border-1 border-white border-b-gray-200 items-center">
        <div class="flex w-128 mx-auto">
            <SearchBar />
        </div>
    </div>
</template>