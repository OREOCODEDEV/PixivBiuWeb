<script setup>
import { nextTick, defineComponent, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'

import axios from 'axios';

import Image from './Image.vue';
import ImageModal from './ImageModal.vue';
import DevData from './DevData.vue';

const route = useRoute()

const response_data = ref(null)
const display_data = ref(null)
const image_modal = ref(null)

function get_query_safe(key, default_value) {
    // 从查询参数中取值，无则返回默认参数的值
    return route.query[key] === undefined ? default_value : route.query[key]
}

const request_params = ref({
    "kt": route.params["search_content"],
    "mode": get_query_safe("tagtype", "tag"),
    'totalPage': 3,
    'isCache': 1,
    'groupIndex': 0,
    'isAiWork': get_query_safe("ignore_ai", false) ? 1 : 0
})

function refresh_local_data() {
    display_data.value = response_data.value.data.msg.rst.data
}

function refresh_request_data() {
    if (request_params.value["kt"] == "PixivBiu:Dev") {
        response_data.value = DevData.generate_dev_data()
        refresh_local_data()
        return
    }

    axios.get("/api/biu/search/works/", {
        params: request_params.value
    })
        .then((response) => {
            response_data.value = response
            refresh_local_data()
        })
}

watch(() => request_params, async (old_data, new_data) => {
    refresh_request_data()
})

onMounted(() => {
    refresh_request_data()
})
</script>

<template>
    <div class="flex">
        <div class="grid grid-cols-4 gap-8 2xl:grid-cols-8 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5">
            <template v-for="current_data of display_data">
                <Image :image_data="current_data" :modal_ref="image_modal"></Image>
            </template>
        </div>
    </div>
    <!-- 避免放到Image中导致DOM数量增加 -->
    <ImageModal ref="image_modal"></ImageModal>
</template>