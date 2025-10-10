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
    <div class="absolute fixed top-0 left-0 right-0">
        <div class="flex h-15 items-center bg-white border-b-2 border-gray-200">
            <div class="flex max-w-128 flex-1 mx-auto">
                <SearchBar />
            </div>
        </div>
    </div>
</template>