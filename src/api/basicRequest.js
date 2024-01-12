import {axiosInstance} from '@/api/basicHttp.js/';
import {requestURL} from './requestURL';

export const test = () => axiosInstance(requestURL.TEST, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    data: {}
})