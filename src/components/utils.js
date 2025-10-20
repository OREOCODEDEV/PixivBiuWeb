function get_maximum_preview_quality(target_quality, available_quality) {
    // 从avabile_quality中找出不大于target_quality的最清晰版本
    const quality_list = ["small", "medium", "large", "original"];
    const seek = quality_list.indexOf(target_quality);
    if (seek == -1) {
        console.error("Unknown target quality type");
        return undefined;
    }
    for (let i in quality_list) {
        if (seek - i < 0) {
            console.error("Unable to locate quality in available quality");
            break;
        }
        const current_quality = quality_list[seek - i];
        if (available_quality.indexOf(current_quality)) {
            return current_quality;
        }
    }
    console.error("Unable to locate quality in available quality");
    return undefined;
}

export { get_maximum_preview_quality };
