<script setup>
import { ref } from "vue";

const props = defineProps(["image_data", "modal_ref"]);
</script>

<template>
    <div class="flex min-w-20 flex-col">
        <div class="relative flex overflow-hidden rounded-xl">
            <div class="flex grow self-stretch">
                <img class="aspect-square grow rounded-xl object-cover object-top" :src="props.image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')" />
            </div>
            <!-- 单独设置一个对图片底部黑色渐变的遮罩层 -->
            <div class="z-5 absolute bottom-0 left-0 right-0 top-0">
                <div class="flex h-full w-full flex-row items-end">
                    <div class="mask-alpha mask-t-from-50% mask-t-from-black mask-b-to-black flex h-7 grow bg-gray-800"></div>
                </div>
            </div>
            <!-- 图片底部的收藏和观看数据 -->
            <div class="absolute bottom-0 left-0 right-0 top-0 z-10 cursor-pointer hover:bg-white/25" @click="props.modal_ref.show(props.image_data)">
                <div class="flex h-full w-full flex-col align-bottom font-bold text-white">
                    <div class="flex grow flex-row justify-end self-stretch">
                        <span class="m-2 flex h-min rounded-md bg-gray-500/75 p-1" v-if="props.image_data.all.meta_pages.length != 0"> {{ props.image_data.all.meta_pages.length }} </span>
                    </div>
                    <div class="flex">
                        <span class="px-2 py-1">{{ props.image_data.total_bookmarked }}</span>
                        <span class="px-2 py-1">{{ props.image_data.total_viewed }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex min-w-20 flex-col">
            <span class="cursor-pointer truncate pt-2 font-bold" @click="props.modal_ref.show(props.image_data)">
                {{ props.image_data.title }}
            </span>
            <span class="cursor-pointer truncate pt-1 text-xs text-gray-500" @click="props.modal_ref.show(props.image_data)">
                {{ props.image_data.author.name }}
            </span>
        </div>
    </div>
</template>
