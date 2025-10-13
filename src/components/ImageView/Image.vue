<script>
export default {
    props: ["image_data", "modal_ref"],
}
</script>

<template>
    <div class="flex flex-col">
        <div class="flex rounded-xl">
            <img class="rounded-xl grow aspect-square hover:opacity-75 cursor-pointer object-cover object-top"
                :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')"
                @click="modal_ref.show(image_data)">
            </img>
        </div>
        <div class="flex flex-col">
            <span class="text-nowrap truncate pt-2 cursor-pointer font-bold" @click="modal_ref.show(image_data)">
                {{ image_data.title }}
            </span>
            <span class="text-gray-500 text-xs text-nowrap truncate pt-1 cursor-pointer"
                @click="modal_ref.show(image_data)">
                {{ image_data.author.name }}
            </span>
        </div>
    </div>
</template>