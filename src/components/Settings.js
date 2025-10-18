import { ref, computed, reactive } from "vue";

console.log("Settings module init.");
console.log(localStorage.getItem("settings"));
const application_settings = ref(localStorage.getItem("settings") === null ? {} : JSON.parse(localStorage.getItem("settings")));
// setInterval(() => {
//     console.log(application_settings.value);
// }, 2000);

const settings_group = {
    // 所有设置key及默认值
    settings_browse_size: "medium",
    settings_browse_resolution: "medium",
    settings_view_resolution: "load",
    settings_typebar_sticky: "sticky",
};

const getSettings = (key) => {
    if (application_settings.value[key] === undefined) {
        application_settings.value[key] = settings_group[key];
    }
    return computed({
        get: () => application_settings.value[key],
        set: (val) => (application_settings.value[key] = val),
    });
    // if (application_settings.value[key] === undefined) {
    //     application_settings.value[key] = ref(default_value);
    // }
    // console.log("get-settings", key, default_value, application_settings.value[key]);
    // return application_settings.value[key];
};

const generateModelGroup = (options = settings_group) => {
    let result = ref({});
    for (let key in options) {
        result.value[key] = getSettings(key, options[key]);
    }
    return result;
};

export { getSettings, generateModelGroup };
