<script>
export default {
    props: ["image_data"],
    emits: ['click_content'],
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex rounded-xl">
            <img
                class="rounded-xl aspect-square hover:opacity-75 cursor-pointer object-cover object-top"
                :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')"
                @click="$emit('click_content', 'image', image_data)">
            </img>
        </div>
        <div class="flex flex-col">
            <span class="text-nowrap truncate pt-2" @click="$emit('click_content', 'title', image_data)">
                {{ image_data.title }}
            </span>
            <span class="font-semibold text-gray-500 text-nowrap truncate pt-1"
                @click="$emit('click_content', 'author', image_data)">
                作者：{{ image_data.author.name }}
            </span>
        </div>
    </div>
</template>