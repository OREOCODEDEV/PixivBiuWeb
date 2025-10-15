<script setup>
import { nextTick, defineComponent, ref, watch } from "vue";
import LoadingIcon from "@/assets/LoadingIcon.vue";
import CrossIcon from "@/assets/CrossIcon.vue";

// const props = defineProps(["image_data"])

const show_state = ref(true);
const original_image_load_state = ref(false);
const img_large = ref(null);
const image_data = ref(null);

function img_load() {
    original_image_load_state.value = true;
}

function show(data) {
    image_data.value = data;
    show_state.value = true;
    original_image_load_state.value = false;
}

function hide() {
    if (!show_state.value) {
        return;
    }
    show_state.value = false;
}

defineExpose({
    show: show,
    hide: hide,
});
</script>

<template>
    <div class="max-w-screen fixed bottom-0 left-0 right-0 top-0 z-20 flex max-h-screen items-center bg-black/40" v-if="image_data !== null" v-show="show_state" @click="hide">
        <!-- max-h-screen self-stretch  -->
        <div class="flex max-h-screen grow px-40 py-20">
            <div class="flex grow">
                <div class="relative mx-auto flex flex-row overflow-hidden rounded-xl bg-white" @click.stop>
                    <!-- 下为弹窗内容 -->

                    <!-- 关闭按钮 -->
                    <div class="absolute right-0 top-0 flex">
                        <div class="m-3 flex cursor-pointer rounded-full p-3 hover:bg-gray-200" @click="hide">
                            <CrossIcon />
                        </div>
                    </div>

                    <div class="flex">
                        <div class="flex">
                            <img class="object-contain" v-show="!original_image_load_state" :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')" />

                            <img class="object-contain" v-show="original_image_load_state" @load="img_load" :src="image_data.image_urls.large.replace('https://i.pximg.net', 'https://i.pixiv.re')" ref="img_large" />
                        </div>
                        <div class="py-15 flex min-w-40 max-w-80 flex-col gap-2 break-all px-5">
                            <span class="select-all text-2xl font-bold">
                                {{ image_data.title }}
                            </span>

                            <span class="select-all text-sm font-bold text-gray-500">
                                {{ image_data.created_time }}
                            </span>

                            <div class="flex flex-nowrap items-center space-x-3" v-if="!original_image_load_state">
                                <LoadingIcon></LoadingIcon>
                                <span class="text-gray-500">正在加载大尺寸版本</span>
                            </div>
                            <div v-else class="h-5"></div>

                            <span class="select-all text-wrap">
                                {{ image_data.caption }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
