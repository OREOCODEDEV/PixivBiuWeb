<script setup>
import axios from 'axios';
import Image from './Image.vue';
import ImageModal from './ImageModal.vue';
import raw_test_data from "../../assets/testcase/result.json"
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
            if (this.last_request_params["kt"] == "PixivBiu:Dev") {
                this.response_data = this.generate_dev_data()
                this.refresh_local_data()
                return
            }

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
                    // this.$refs.image_model.show()
                case "title":
                    this.modal_data = image_data
                    // this.$refs.image_model.show()
            }
        },
        // 生成测试数据
        // http://localhost:5173/search/PixivBiu:Dev/all
        generate_dev_data() {
            console.log("Generate - DevData...")
            let result = raw_test_data
            let generate_image_data_raw = raw_test_data.msg.rst.data[0]
            result.msg.rst.data = []

            let test_resolution_group = ["360P", "720P", "1080P", "2K", "4K"]
            let test_direction = ["H", "V"]

            function mender(target_data, resolution, direction) {
                target_data = JSON.parse(JSON.stringify(target_data))

                let direction_chr = { "V": "竖向", "H": "横向" }[direction]

                target_data.all.caption = `测试(简介)-${resolution}-${direction_chr}`
                let image_link_group = {
                    large: `http://localhost:5173/src/assets/testcase/${resolution}${direction}.png`,
                    medium: `http://localhost:5173/src/assets/testcase/${resolution}${direction}.png`,
                    original: `http://localhost:5173/src/assets/testcase/${resolution}${direction}.png`,
                    square_medium: `http://localhost:5173/src/assets/testcase/${resolution}${direction}.png`
                }
                target_data.all.image_urls = image_link_group
                target_data.all.meta_pages = { image_urls: [image_link_group] }
                target_data.all.tags = [{ name: `PixivBiu:Dev`, translated_name: null }]
                target_data.all.tags.push({ name: `分辨率-${resolution}`, translated_name: null })
                target_data.all.tags.push({ name: `方向-${direction_chr}`, translated_name: null })
                target_data.all.title = `${resolution}-${direction_chr}`

                target_data.caption = `测试(简介)-${resolution}-${direction_chr}`
                target_data.image_urls = image_link_group
                target_data.tags = ["PixivBiu:Dev", `分辨率-${resolution}`, `方向-${direction_chr}`]
                target_data.title = `${resolution}-${direction_chr}`

                return target_data
            }

            for (let current_resolution of test_resolution_group) {
                for (let current_direction of test_direction) {
                    result.msg.rst.data.push(mender(generate_image_data_raw, current_resolution, current_direction))
                }
            }

            result.msg.rst.total = result.msg.rst.data.length
            console.log(result)
            return { data: result }
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