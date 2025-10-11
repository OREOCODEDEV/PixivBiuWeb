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
    <div class="absolute fixed flex top-0 left-0 right-0 bottom-0 z-20 bg-black/40 bg-scroll" v-if="image_data !== null"
        v-show="show_state" @click="hide">
        <div class="flex w-screen h-screen items-center">
            <div class="flex grow px-40 py-20 max-h-screen max-md:p-0">
                <div class="flex bg-white mx-auto rounded-xl relative overflow-hidden" @click.stop>

                    <!-- 关闭按钮
                    <div class="absolute fixed flex top-0 right-0">
                        <div class="flex m-3 self-end h-8 w-8 p-1.5 rounded-full hover:bg-gray-200 cursor-pointer">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="fill-black">
                                <g>
                                    <path
                                        d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div> -->

                    <!-- <div class="flex relative" v-if="!original_image_load_state">
                        <div class="absolute top-0 left-0">
                            <div type="button" class="flex m-3 bg-blue-500 rounded-lg p-3 items-center" disabled>
                                <svg class="mr-3 -ml-1 size-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span class="text-white font-bold">正在加载原图</span>
                            </div>
                        </div>
                        <img class="object-contain" v-show="!original_image_load_state"
                            :src="image_data.image_urls.medium.replace('https://i.pximg.net', 'https://i.pixiv.re')">
                        </img>
                    </div> -->

                    <img class="object-contain" v-show="original_image_load_state"
                        :src="image_data.image_urls.large.replace('https://i.pximg.net', 'https://i.pixiv.re')"
                        ref="img_large">
                    </img>


                    <div class="flex flex-col p-5 gap-2">
                        <span class="font-bold text-2xl">
                            {{ image_data.title }}
                        </span>

                        <span class="font-bold text-sm text-gray-500">
                            上传于 {{ image_data.created_time }}
                        </span>

                        <!-- <div class="flex flex-col gap-1" v-if="image_data.caption!=''">
                            <div class="flex grow h-5 bg-gray-200">

                            </div>
                            <span class="grow text-base px-3">
                                {{ image_data.caption }}
                            </span>
                            <div class="flex grow h-5 bg-gray-200">

                            </div>
                        </div> -->



                        <!-- <div class="flex flex-row items-end">
                            <div class="flex grow">
                                <a target="_blank" :href="image_data.image_urls.large"
                                    class="flex grow rounded-lg p-2 bg-green-500 hover:bg-green-700 cursor-pointer">
                                    <div class="flex mx-auto space-x-3 items-center">
                                        <img src="../../assets/pixiv.png" class="w-6 h-6"></img>
                                        <span class="text-white font-bold text-base">
                                            在 Pixiv 中打开
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </div> -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>