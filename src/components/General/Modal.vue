<script setup>
import { ref, computed } from "vue";
import CrossIcon from "@/assets/CrossIcon.vue";

const show_state = ref(true);

function show() {
    show_state.value = true;
}

function hide() {
    show_state.value = false;
}

defineExpose({
    show: show,
    hide: hide,
});
</script>

<template>
    <div class="max-w-screen fixed bottom-0 left-0 right-0 top-0 z-20 flex max-h-screen items-center bg-black/40" v-show="show_state" @click="hide">
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

                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
