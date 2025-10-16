<script setup>
import { nextTick, defineComponent, ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

import Image from "./Image.vue";
import ImageModal from "./ImageModal.vue";
import DevData from "./DevData.vue";

import { ProcessData } from "./DataProcess";

const route = useRoute();

const response_data = ref(null);
let response_dict_data = {};
const display_data = ref(null);
const image_modal = ref(null);

function get_query_safe(key, default_value) {
    // 从查询参数中取值，无则返回默认参数的值
    return route.query[key] === undefined ? default_value : route.query[key];
}

const request_params = computed(() => {
    return {
        kt: route.params["search_content"],
        mode: get_query_safe("tagtype", "tag"),
        totalPage: 3,
        isCache: 1,
        groupIndex: 0,
        isAiWork: get_query_safe("ignore_ai", false) ? 0 : 1,
    };
});

let last_request_params = {};

function is_request_params_changes(new_params) {
    for (let i of Object.keys(new_params)) {
        if (new_params[i] != last_request_params[i]) {
            last_request_params = new_params;
            return true;
        }
    }
    return false;
}

function refresh_local_data() {
    display_data.value = ProcessData(response_dict_data, route);
}

function refresh_request_data() {
    if (!is_request_params_changes(request_params.value)) {
        // 请求参数未发生变动时不再重复请求，直接对本地数据进行重复处理即可
        refresh_local_data();
        return;
    }

    if (request_params.value["kt"] == "PixivBiu:Dev") {
        response_data.value = DevData.generate_dev_data();
        refresh_local_data();
        return;
    }

    axios
        .get("/api/biu/search/works/", {
            params: request_params.value,
        })
        .then((response) => {
            response_data.value = response.data;
            response_dict_data = {};
            for (let i of response_data.value.msg.rst.data) {
                response_dict_data[i.id] = i;
            }
            // console.log(response_dict_data)
            refresh_local_data();
        });
}

watch(request_params, () => {
    // console.log("URL Params updated:", request_params);
    refresh_request_data();
});

onMounted(() => {
    refresh_request_data();
});
</script>

<template>
    <div class="relative flex grow flex-col">
        <div class="flex h-60 space-x-6 divide-white" v-if="display_data && display_data.length != 0">
            <div class="flex w-1/3 flex-1 flex-col space-y-1 rounded-xl bg-gray-100 p-10">
                <span class="text-4xl font-extrabold"># {{ response_data.msg.args.fun.kt }}</span>
                <span class="text-gray-500">正在搜索</span>
                <span class="">共 {{ Object.keys(response_dict_data).length }} 张，筛选后展示 {{ display_data.length }} 张</span>
                <span v-if="Object.keys(route.query).length" class="text-blue-500 font-bold">当前有 {{ Object.keys(route.query).length }} 项生效的筛选</span>
            </div>
            <img class="w-2/3 rounded-xl object-cover" :src="display_data[0].image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')" />
        </div>
        <div class="sticky top-0 z-20 my-4 flex h-20 bg-gray-500"></div>

        <div class="grid grid-cols-4 gap-1 md:grid-cols-5 lg:grid-cols-6 lg:gap-4 xl:grid-cols-7 xl:gap-6 2xl:grid-cols-8 2xl:gap-8" v-if="display_data && display_data.length != 0">
            <template v-for="current_data of display_data">
                <Image :image_data="current_data" :modal_ref="image_modal"></Image>
            </template>
        </div>
        <span class="flex-1 text-center align-middle text-xl font-bold text-gray-500" v-else>无可展示内容</span>
    </div>
    <!-- 避免放到Image中导致DOM数量增加 -->
    <ImageModal ref="image_modal"></ImageModal>
</template>
