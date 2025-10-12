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
    <div class="fixed flex top-0 left-0 right-0 bottom-0 z-20 max-h-screen max-w-screen items-center bg-black/40"
        v-if="image_data !== null" v-show="show_state" @click="hide">
        <!-- max-h-screen self-stretch  -->
        <div class="flex px-40 py-20 grow max-h-screen">
            <div class="flex grow">
                <div class="flex mx-auto bg-white rounded-xl overflow-hidden relative" @click.stop>
                    <div class="absolute flex top-0 right-0">
                        <div class="flex m-3 p-3 rounded-full hover:bg-gray-200 cursor-pointer" @click="hide">
                            <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5">
                                <g>
                                    <path
                                        d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex">
                            <img class="object-contain" v-show="original_image_load_state"
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