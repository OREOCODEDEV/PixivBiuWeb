<script setup>
import raw_test_data from "../../assets/testcase/result.json"

// 生成测试数据
// http://localhost:5173/search/PixivBiu:Dev/all

function generate_dev_data() {
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

defineExpose({
    generate_dev_data,
})
</script>

<template>
</template>