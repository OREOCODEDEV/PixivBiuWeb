function get_query_safe(route, key, default_value) {
    // 从查询参数中取值，无则返回默认参数的值
    return route.query[key] === undefined ? default_value : route.query[key];
}

function ProcessData(import_data, route) {
    let count = 0;

    const sort_type_map = {
        favourite: "total_bookmarked",
        views: "total_viewed",
        date: "created_time",
        rdate: "created_time",
    };

    let filter_options = {};

    for (let current_key of ["favourite", "views"]) {
        if (!route.query.hasOwnProperty(current_key)) {
            filter_options[current_key] = { min: null, max: null };
            continue;
        }
        const range_str = route.query[current_key];
        if (!range_str.includes(":")) {
            filter_options[current_key] = { min: Number(range_str), max: null };
            continue;
        }
        const range_split = range_str.split(":");
        filter_options[current_key] = { min: Number(range_split[0]), max: range_split[1] ? Number(range_split[1]) : null };
    }

    let map_dict = new Map();

    // 一边按照条件筛选一边构建一个{筛选项: 数据}的dict
    for (const key in import_data) {
        const current_data = import_data[key];
        let breakflags = false;
        for (let filter_t of ["favourite", "views"]) {
            if (filter_options[filter_t].max !== null && current_data[sort_type_map[filter_t]] > filter_options[filter_t].max) {
                breakflags = true;
                break;
            }
            if (filter_options[filter_t].min !== null && current_data[sort_type_map[filter_t]] < filter_options[filter_t].min) {
                breakflags = true;
                break;
            }
        }
        if (breakflags) {
            // 不符合收藏或观看数量筛选条件
            continue;
        }
        const query_filter_type = get_query_safe(route, "sorttype", "favourite");
        const num = current_data[sort_type_map[query_filter_type]];
        if (!map_dict.has(num)) {
            map_dict.set(num, []);
        }
        // if (map_dict.get(num).length) {
        //     debugger;
        // }
        count += 1;
        map_dict.get(num).push(key);
    }

    let result_data = []; // 图片信息数组[Image]

    // 排序内容
    for (let count of Array.from(map_dict.keys()).sort((a, b) => b - a)) {
        for (let i of map_dict.get(count)) {
            result_data.push(import_data[i]);
        }
    }

    // console.log(result_data);

    return result_data;
}

export { ProcessData };
