<script setup>
import { nextTick, defineComponent, ref, watch, computed } from "vue";
import LoadingIcon from "@/assets/LoadingIcon.vue";
import CrossIcon from "@/assets/CrossIcon.vue";
import Modal from "../General/Modal.vue";

// const props = defineProps(["image_data"])

const original_image_load_state = ref(false);
const img_large = ref(null);
const image_data = ref(null);
const img_pop_modal = ref(null);

const multi_image_count = computed(() => {
    // if (image_data.value.all.meta_pages.length) {
    //     debugger;
    // }
    return image_data.value.all.meta_pages.length;
});

const image_view_id = ref(0);
const image_load_count = ref(0);

function img_load() {
    original_image_load_state.value = true;
    image_load_count.value += 1;
}

async function show(data) {
    image_data.value = data;
    original_image_load_state.value = false;
    image_view_id.value = 0;
    image_load_count.value = 0;
    await nextTick(); // 等Modal的v-if才能获取ref
    img_pop_modal.value.show();
}

function hide() {
    img_pop_modal.value.hide();
}

function on_scroll_wheel(event) {
    // debugger;
    if (multi_image_count.value == 0) {
        return;
    }
    if (event.deltaY > 0) {
        image_view_id.value += 1;
    } else {
        image_view_id.value -= 1;
    }
    if (image_view_id.value == multi_image_count.value) {
        image_view_id.value = 0;
    }
    if (image_view_id.value == -1) {
        image_view_id.value = multi_image_count.value - 1;
    }
}

defineExpose({
    show: show,
    hide: hide,
});
</script>

<template>
    <Modal ref="img_pop_modal" v-if="image_data">
        <div class="flex" @wheel="on_scroll_wheel">
            <div class="flex">
                <img class="object-contain" v-show="!original_image_load_state && image_view_id == 0" :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')" />
                <img class="object-contain" v-show="original_image_load_state && image_view_id == 0" @load="img_load" :src="image_data.image_urls.large.replace('https://i.pximg.net', 'https://i.pixiv.re')" ref="img_large" />
                <template v-if="multi_image_count">
                    <template v-for="val in multi_image_count - 1">
                        <img class="object-contain" v-show="val == image_view_id" @load="image_load_count += 1" :src="image_data.all.meta_pages[val].image_urls.large.replace('https://i.pximg.net', 'https://i.pixiv.re')" ref="img_large" />
                    </template>
                </template>
            </div>
            <div class="py-15 flex min-w-40 max-w-80 flex-col gap-2 break-all px-5">
                <span class="select-all text-2xl font-bold">
                    {{ image_data.title }}
                </span>

                <span class="select-all text-sm font-bold text-gray-500">
                    {{ image_data.created_time }}
                </span>

                <div class="flex flex-nowrap items-center space-x-3" v-if="!original_image_load_state || image_load_count < multi_image_count">
                    <LoadingIcon></LoadingIcon>
                    <span class="text-gray-500">
                        正在加载大尺寸版本
                        <span v-if="multi_image_count"> ({{ image_load_count }} / {{ multi_image_count }}) </span>
                    </span>
                </div>
                <div v-else class="h-5"></div>

                <span class="text-wrap text-gray-500" v-if="multi_image_count"> 正在查看第 {{ image_view_id + 1 }} / {{ multi_image_count }} 张 </span>

                <span class="select-all text-wrap">
                    {{ image_data.caption }}
                </span>
            </div>
        </div>
    </Modal>
</template>
