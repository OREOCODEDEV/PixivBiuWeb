<script setup>
import axios from 'axios';
import Image from './Image.vue';
import ImageModal from './ImageModal.vue';
import ImageModalContent from './ImageModalContent.vue';
</script>

<script>
export default {
    data() {
        return {
            response_data: null,
            display_data: null,
            last_request_params: {
                "kt": this.$route.params["search_content"],
                "mode": this.get_query_safe("tagtype", "tag"),
                'totalPage': 3,
                'isCache': 1,
                'groupIndex': 0,
                'isAiWork': this.get_query_safe("ignore_ai", false) ? 1 : 0
            },
            modal_data: null,
        }
    },
    watch: {
        last_request_params() {
            this.refresh_request_data()
        }
    },
    methods: {
        get_query_safe(key, default_value) {
            // 从查询参数中取值，无则返回默认参数的值
            return this.$route.query[key] === undefined ? default_value : this.$route.query[key]
        },
        refresh_request_data() {
            // return
            axios.get("/api/biu/search/works/", {
                params: this.last_request_params
            })
                .then((response) => {
                    this.response_data = response
                    this.refresh_local_data()
                })
        },
        refresh_local_data() {
            this.display_data = this.response_data.data.msg.rst.data
        },
        click_image_content(content, image_data) {
            switch (content) {
                case "image":
                    this.modal_data = image_data
                    this.$refs.image_model.show()
                case "title":
                    this.modal_data = image_data
                    this.$refs.image_model.show()
            }
        }
    },
    mounted() {
        this.refresh_request_data()
    },
}
</script>

<template>
    <div class="flex">
        <div class="grid grid-cols-4 gap-8 2xl:grid-cols-8 xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5">
            <template v-for="current_data of display_data">
                <Image :image_data="current_data" @click_content="click_image_content"></Image>
            </template>
        </div>
    </div>
    <!-- 避免放到Image中导致DOM数量增加 -->
    <ImageModal :image_data="modal_data" ref="image_model">
    </ImageModal>
</template>