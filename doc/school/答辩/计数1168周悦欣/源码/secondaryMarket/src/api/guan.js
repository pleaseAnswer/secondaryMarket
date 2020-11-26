import axios from 'axios';

// 创建axios实例
const my = axios.create({
    baseURL: 'http://localhost:8090'
});

function get(path, params, config = {}) {
    return my.get(path, {
        ...config,
        params
    })
}

export default {
    get,
}