function get_query_safe(route, key, default_value) {
    // 从查询参数中取值，无则返回默认参数的值
    return route.query[key] === undefined ? default_value : route.query[key];
}

function ProcessData(import_data, route) {
    const query_sort_type = get_query_safe(route, "sorttype", "favourite");

    const range_filter_type_map = {
        // 对区间类筛选项进行字符串键映射及定义格式化方法
        favourite: { key: "total_bookmarked", proc: Number },
        views: { key: "total_viewed", proc: Number },
        date: {
            key: "created_time",
            proc: (str) => {
                // 把日期规范为YYYYMMDD字符串，后面直接使用字符串比较
                let date_split = str.split(" ")[0].split("-");
                if (date_split[1].length == 1) {
                    date_split[1] = "0" + date_split[1];
                }
                if (date_split[2].length == 1) {
                    date_split[2] = "0" + date_split[2];
                }
                return date_split.join("");
            },
        },
        imgcount: {
            key: (data) => {
                return data.all.meta_pages.length + 1;
            },
            proc: Number,
        },
    };

    const sort_type_map = {
        // 对排序项进行字符串键映射及定义格式化方法
        favourite: { key: "total_bookmarked", proc: (data) => data["total_bookmarked"] },
        views: { key: "total_viewed", proc: (data) => data["total_viewed"] },
        ratio: { key: "", proc: (data) => data["total_bookmarked"] / data["total_viewed"] },
        date: { key: "created_time", proc: (data) => range_filter_type_map.date.proc(data["created_time"]) },
    };

    let filter_options = {}; // {key:{max:int, min:int}}

    // 拆分查询参数中的数据
    for (let current_key of Object.keys(range_filter_type_map)) {
        if (!route.query.hasOwnProperty(current_key)) {
            filter_options[current_key] = { min: null, max: null };
            continue;
        }
        const range_str = route.query[current_key];
        if (!range_str.includes(":")) {
            // 没有冒号时按照最小值取
            filter_options[current_key] = { min: range_filter_type_map[current_key].proc(range_str), max: null };
            continue;
        }
        const range_split = range_str.split(":");
        filter_options[current_key] = { min: range_filter_type_map[current_key].proc(range_split[0]), max: range_split[1] ? range_filter_type_map[current_key].proc(range_split[1]) : null };
    }

    let map_dict = new Map();

    // 一边按照条件筛选一边构建一个{筛选值: 数据}的dict
    // sort为排序 filter为过滤
    for (const key in import_data) {
        const current_data = import_data[key];
        let breakflags = false;
        for (let filter_t of Object.keys(range_filter_type_map)) {
            let source_range = 0;
            if (typeof range_filter_type_map[filter_t].key === "string") {
                source_range = current_data[range_filter_type_map[filter_t].key];
            }
            if (typeof range_filter_type_map[filter_t].key === "function") {
                source_range = range_filter_type_map[filter_t].key(current_data);
            }

            if (filter_options[filter_t].max !== null && range_filter_type_map[filter_t].proc(source_range) > filter_options[filter_t].max) {
                breakflags = true;
                break;
            }
            if (filter_options[filter_t].min !== null && range_filter_type_map[filter_t].proc(source_range) < filter_options[filter_t].min) {
                breakflags = true;
                break;
            }
        }
        if (breakflags) {
            // 不符合收藏或观看数量筛选条件
            continue;
        }
        let num = sort_type_map[query_sort_type].proc(current_data);
        if (!map_dict.has(num)) {
            map_dict.set(num, []);
        }
        map_dict.get(num).push(key);
    }

    let result_data = []; // 图片信息数组[Image]

    // 排序内容
    for (let count of Array.from(map_dict.keys()).sort((a, b) => b - a)) {
        for (let i of map_dict.get(count)) {
            result_data.push(import_data[i]);
        }
    }

    // for (let i of result_data) {
    //     let dbg_str = `${query_sort_type}: ${i[sort_type_map[query_sort_type].key]}; `;
    //     for (let j of Object.keys(filter_options)) {
    //         if (j.min === null && j.max === null) {
    //             continue;
    //         }
    //         dbg_str += `${j}: ${i[range_filter_type_map[j].key]}; `;
    //     }
    //     console.log(dbg_str);
    // }
    // console.log(result_data);
    console.log(`Got ${result_data.length} results after filter(s)`);

    return result_data;
}

export { ProcessData };
