import axios from 'axios';

// 初始化超时时间
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_GLOB_API_URL,
    timeout: 30000
});

// 请求拦截，补充 accessToken
axiosInstance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * 处理响应的错误信息
 * @param error
 * @returns {Promise<any>}
 */
const handleResponseError = (error) => {
    return Promise.reject(error);
};

/**
 * 处理响应
 * @param response
 * @returns {Promise<never>}
 */
const handleResponseSuccess = (response) => {
    const res = response.data;
    return Promise.resolve(res.data);
};

// 响应拦截, 处理错误码和跳转拦截
axiosInstance.interceptors.response.use(
    handleResponseSuccess,
    handleResponseError
);

const request = (url, options) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            url,
            ...options
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => reject(err));
    });
};

export {axiosInstance, request};
