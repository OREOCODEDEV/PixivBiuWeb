import { ref, computed, reactive } from "vue";

const application_settings = ref(localStorage.getItem("settings") === null ? {} : JSON.parse(localStorage.getItem("settings")));
// setInterval(() => {
//     console.log(application_settings.value);
// }, 2000);

const settings_group = {
    // 所有设置key及默认值
    settings_browse_row_count: "8",
    settings_browse_allow_adjust_row_count: "1",
    settings_browse_resolution: "medium",
    settings_view_resolution: "1",
    settings_typebar_sticky: "1",
    settings_network_image_proxy: "https://i.pixiv.re",
};

const getSettings = (key) => {
    if (application_settings.value[key] === undefined) {
        application_settings.value[key] = settings_group[key];
    }
    return computed({
        get: () => application_settings.value[key],
        set: (val) => (application_settings.value[key] = val),
    });
};

const generateModelGroup = (options = settings_group) => {
    let result = ref({});
    for (let key in options) {
        result.value[key] = getSettings(key, options[key]);
    }
    return result;
};

const saveSettings = () => {
    // 只保存与默认配置不一致的内容
    let save_options = {};
    for (let key of Object.keys(application_settings.value)) {
        if (application_settings.value[key] == settings_group[key]) {
            continue;
        }
        save_options[key] = application_settings.value[key];
    }
    localStorage.setItem("settings", JSON.stringify(save_options));
};

export { getSettings, generateModelGroup, saveSettings };
