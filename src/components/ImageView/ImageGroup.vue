<script setup>
import { nextTick, defineComponent, ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

import Image from "./Image.vue";
import ImageModal from "./ImageModal.vue";
import { generate_dev_data } from "./DevData.js";
import MaterialImageTypeBar from "../MaterialImageTypeBar.vue";

import { getSettings } from "@/components/Settings.js";
// import { get_maximum_preview_quality } from "@/components/utils.js";

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
    response_dict_data = {};
    for (let i of response_data.value.msg.rst.data) {
        response_dict_data[i.id] = i;
    }
    display_data.value = ProcessData(response_dict_data, route);
}

const is_data_valid = computed(() => {
    return display_data.value && display_data.value.length != 0;
});

function refresh_request_data() {
    if (!is_request_params_changes(request_params.value)) {
        // 请求参数未发生变动时不再重复请求，直接对本地数据进行重复处理即可
        refresh_local_data();
        return;
    }

    if (request_params.value["kt"] == "PixivBiu:Dev") {
        response_data.value = generate_dev_data();
        refresh_local_data();
        return;
    }

    axios
        .get("/api/biu/search/works/", {
            params: request_params.value,
        })
        .then((response) => {
            response_data.value = response.data;
            refresh_local_data();
        });
}

const grid_size_cls = computed(() => {
    // todo: 怪问题，启用自适应之后只有设置了一行8个才能正常触发自适应，设置一行6或10都会有问题
    // 设置项：预览大小&允许自适应
    if (getSettings("settings_browse_allow_adjust_row_count").value == "1") {
        const size_types = ["sm", "md", "lg", "xl", "2xl"].reverse();
        let result = ["grid-cols-2", "gap-3"];
        for (let index in size_types) {
            result.push(`${size_types[index]}:gap-${8 - index}`);
            result.push(`${size_types[index]}:grid-cols-${Number(getSettings("settings_browse_row_count").value - index)}`);
        }
        return result;
    }
    return `grid-cols-${getSettings("settings_browse_row_count").value} gap-8`;
});

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
        <div class="mb-4 flex h-60 space-x-6 divide-white" v-if="is_data_valid">
            <div class="flex w-1/3 flex-1 flex-col space-y-1 rounded-xl bg-gray-100 p-10">
                <span class="text-4xl font-extrabold"># {{ response_data.msg.args.fun.kt }}</span>
                <span class="text-gray-500">正在搜索</span>
                <span class="">共 {{ Object.keys(response_dict_data).length }} 张，筛选后展示 {{ display_data.length }} 张</span>
                <span v-if="Object.keys(route.query).length" class="font-bold text-blue-500">当前有 {{ Object.keys(route.query).length }} 项生效的筛选</span>
            </div>
            <img class="w-2/3 rounded-xl object-cover" :src="display_data[0].image_urls[getSettings('settings_browse_resolution').value]" />
        </div>
        <div class="flex bg-white" v-if="is_data_valid" :class="getSettings('settings_typebar_sticky').value == 'sticky' ? 'sticky top-0 z-20' : ''">
            <!-- <div class="mb-4 flex h-20 grow rounded-full bg-gray-100">
                <div class="flex grow rounded-full justify-center">

                </div>
            </div> -->
            <MaterialImageTypeBar></MaterialImageTypeBar>
        </div>

        <template v-if="is_data_valid">
            <div class="grid" :class="grid_size_cls">
                <template v-for="current_data of display_data">
                    <Image :image_data="current_data" :modal_ref="image_modal"></Image>
                </template>
            </div>
        </template>
        <span class="flex-1 text-center align-middle text-xl font-bold text-gray-500" v-else>无可展示内容</span>
        <div class="h-30 w-full"></div>
    </div>
    <!-- 避免放到Image中导致DOM数量增加 -->
    <ImageModal ref="image_modal"></ImageModal>
</template>
