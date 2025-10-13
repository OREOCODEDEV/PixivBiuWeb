<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
console.log(route.params)
const search_text = ref()

onMounted(() => {
    console.log(route)
    // debugger
    search_text.value = route.params.search_content
})
</script>

<template>
    <div
        class="flex items-center flex-auto rounded-xl bg-gray-100 border-white border-4 has-[input:focus-within]:border-4 has-[input:focus-within]:border-blue-200 hover:bg-gray-200">
        <!-- 搜索icon -->
        <svg viewBox="0 0 16 16" class="w-10 px-3 fill-gray-500">
            <path d="M8.25739 9.1716C7.46696 9.69512 6.51908 10 5.5 10C2.73858 10 0.5 7.76142 0.5 5C0.5
                2.23858 2.73858 0 5.5 0C8.26142 0 10.5 2.23858 10.5 5C10.5 6.01908 10.1951 6.96696 9.67161
                7.75739L11.7071 9.79288C12.0976 10.1834 12.0976 10.8166 11.7071 11.2071C11.3166 11.5976 10.6834
                11.5976 10.2929 11.2071L8.25739 9.1716ZM8.5 5C8.5 6.65685 7.15685 8 5.5 8C3.84315 8 2.5 6.65685
                2.5 5C2.5 3.34315 3.84315 2 5.5 2C7.15685 2 8.5 3.34315 8.5 5Z" transform="translate(3 3)"
                fill-rule="evenodd" clip-rule="evenodd"></path>
        </svg>
        <input type="text" class="flex-auto h-10 placeholder:text-sm focus:outline-none" placeholder="搜索作品"
            v-model="search_text"
            @keyup.enter="$router.push({ name: 'search-all', params: { 'search_content': search_text } })">
        <div class="px-3" v-if="search_text" @click="search_text = ''">
            <!-- 清空输入icon -->
            <svg viewBox="0 0 16 16" class="w-4 fill-white bg-gray-500 rounded-full hover:cursor-pointer">
                <path d="M9.41421 8L11.7071 10.2929C12.0976 10.6834 12.0976 11.3166 11.7071
                11.7071C11.3166 12.0976 10.6834 12.0976 10.2929 11.7071L8 9.41421L5.70711
                11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166
                3.90237 10.6834 4.29289 10.2929L6.58579 8L4.29289 5.70711C3.90237 5.31658
                3.90237 4.68342 4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711
                4.29289L8 6.58579L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071
                4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L9.41421 8Z" transform=""></path>
            </svg>
        </div>
    </div>

</template>