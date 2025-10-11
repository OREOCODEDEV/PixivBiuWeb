<script>
import { nextTick } from 'vue';

export default {
    props: ["image_data"],
    data() {
        return {
            show_state: true,
            original_image_load_state: false,
        }
    },
    watch: {
        async image_data() {
            this.show_state = true
            this.original_image_load_state = false
            await nextTick()
            this.$refs.img_large.onload = () => {
                // setTimeout(() => { this.original_image_load_state = true }, 1000)
                this.original_image_load_state = true
            }
        }
    },
    methods: {
        show() {
            if (this.show_state) {
                return
            }
            this.show_state = true
        },
        hide() {
            if (!this.show_state) {
                return
            }
            this.show_state = false
        }
    },
    mounted() {
    },
}
</script>

<template>
    <div class="absolute fixed flex top-0 left-0 right-0 bottom-0 z-20 max-h-screen max-w-screen items-center bg-black/40 bg-scroll"
        v-if="image_data !== null" v-show="show_state" @click="hide">
        <!-- max-h-screen self-stretch  -->
        <div class="flex px-40 py-20 grow max-h-screen">
            <div class="flex grow">
                <div class="flex mx-auto bg-white rounded-xl overflow-hidden" @click.stop>
                    <div class="flex">
                        <div class="flex">
                            <img class="flex h-auto object-contain" v-show="original_image_load_state"
                                :src="image_data.image_urls.large.replace('https://i.pximg.net', 'https://i.pixiv.re')"
                                ref="img_large">
                            </img>
                        </div>
                        <div class="flex flex-col p-5 gap-2">
                            <span class="font-bold text-2xl">
                                {{ image_data.title }}
                            </span>

                            <span class="font-bold text-sm text-gray-500">
                                上传于 {{ image_data.created_time }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>