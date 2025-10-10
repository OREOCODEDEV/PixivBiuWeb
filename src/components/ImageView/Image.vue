<script>
export default {
    props: ["image_data"],
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex rounded-xl">
            <img style="object-fit: cover; object-position: 50% 00%;" class="rounded-xl aspect-square hover:opacity-75 cursor-pointer"
                :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')">
            </img>
        </div>
        <div class="flex flex-col">
            <span class="text-nowrap truncate pt-2">
                {{ image_data.title }}
            </span>
            <span class="font-semibold text-gray-500 text-nowrap truncate pt-1">
                作者：{{ image_data.author.name }}
            </span>
        </div>
    </div>
</template>