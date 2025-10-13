<script setup>

import { nextTick, defineComponent, ref, watch } from 'vue';
import LoadingIcon from '@/assets/LoadingIcon.vue';
import CrossIcon from '@/assets/CrossIcon.vue';

// const props = defineProps(["image_data"])

const show_state = ref(true)
const original_image_load_state = ref(false)
const img_large = ref(null)
const image_data = ref(null)

function img_load() {
    original_image_load_state.value = true
}

function show(data) {
    image_data.value = data
    show_state.value = true
    original_image_load_state.value = false
}

function hide() {
    if (!show_state.value) {
        return
    }
    show_state.value = false
}

defineExpose({
    show: show,
    hide: hide
})
</script>

<template>
    <div class="fixed flex top-0 left-0 right-0 bottom-0 z-20 max-h-screen max-w-screen items-center bg-black/40"
        v-if="image_data !== null" v-show="show_state" @click="hide">
        <!-- max-h-screen self-stretch  -->
        <div class="flex px-40 py-20 grow max-h-screen">
            <div class="flex grow">
                <div class="flex mx-auto bg-white rounded-xl overflow-hidden relative flex-row" @click.stop>
                    <!-- 下为弹窗内容 -->

                    <!-- 关闭按钮 -->
                    <div class="absolute flex top-0 right-0">
                        <div class="flex m-3 p-3 rounded-full hover:bg-gray-200 cursor-pointer" @click="hide">
                            <CrossIcon />
                        </div>
                    </div>

                    <div class="flex">
                        <div class="flex">
                            <img class="object-contain" v-show="!original_image_load_state"
                                :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')">
                            </img>
                            <img class="object-contain" v-show="original_image_load_state" @load="img_load"
                                :src="image_data.image_urls.large.replace('https://i.pximg.net', 'https://i.pixiv.re')"
                                ref="img_large">
                            </img>
                        </div>
                        <div class="flex flex-col px-5 py-15 gap-2 max-w-60 break-all">
                            <span class="font-bold text-2xl">
                                {{ image_data.title }}
                            </span>

                            <span class="font-bold text-sm text-gray-500">
                                {{ image_data.created_time }}
                            </span>

                            <div class="flex flex-nowrap items-center space-x-3" v-if="!original_image_load_state">
                                <LoadingIcon></LoadingIcon>
                                <span class="text-gray-500">正在加载大尺寸版本</span>
                            </div>
                            <div v-else class="h-5"></div>

                            <span class="text-wrap">
                                {{ image_data.caption }}
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>