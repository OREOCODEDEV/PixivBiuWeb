<script setup>
import SelectFromMulti from "./SelectFromMulti.vue";
const props = defineProps(["options"]);
const model = defineModel();
function update(value) {
    model.value = value;
}
</script>

<template>
    <SelectFromMulti :options="props.options" :current_value="model" @on_click="update"></SelectFromMulti>
</template>
