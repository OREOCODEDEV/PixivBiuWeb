<script setup>
import { ref } from "vue";

const props = defineProps(["image_data", "modal_ref"]);
</script>

<template>
    <div class="flex flex-col">
        <div class="relative flex rounded-xl">
            <!-- mask-alpha mask-b-from-0% mask-b-from-black mask-t-to-25% mask-t-to-transparent -->
            <div class="flex grow self-stretch">
                <img class="aspect-square grow rounded-xl object-cover object-top" :src="props.image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')" />
            </div>
            <div class="absolute bottom-0 left-0 right-0 top-0 cursor-pointer hover:bg-white/25" @click="props.modal_ref.show(props.image_data)">
                <div class="flex h-full w-full flex-row items-end font-bold text-white">
                    <div class="flex grow">
                        <span class="px-2 py-1">test</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <span class="cursor-pointer truncate text-nowrap pt-2 font-bold" @click="props.modal_ref.show(props.image_data)">
                {{ props.image_data.title }}
            </span>
            <span class="cursor-pointer truncate text-nowrap pt-1 text-xs text-gray-500" @click="props.modal_ref.show(props.image_data)">
                {{ props.image_data.author.name }}
            </span>
        </div>
    </div>
</template>
