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
    <!-- 为NavBar使用毛玻璃 -->
    <!-- <div class="fixed top-0 left-0 right-0 z-5 h-15" style="backdrop-filter: blur(6px);">
    </div> -->
    <div class="fixed top-0 left-0 right-0 z-10">
        <div class="flex h-15 items-center bg-white border-b-2 border-gray-200">
            <div class="flex max-w-128 flex-1 mx-auto">
                <SearchBar />
            </div>
        </div>
    </div>
    <div class="flex flex-row">
        <div class="flex grow h-15">

        </div>
    </div>
</template>