import axios from 'axios';

import baseURLConfig from './config-baseURL';

import { Message } from 'element-ui';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseURLConfig.baseURL;
axios.defaults.withCredentials = true;

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let options = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400;
            },
        };
        if (type.toLowerCase() === 'get') {
            options.params = data;
        } else {
            options.data = data;
        }
        axios(options)
            .then((res) => {
                if (res.status === 200) resolve(res.data);
                else {
                    Message.error(res.data.msg);
                    reject(res.data);
                }
            })
            .catch((err) => {
                console.error({ msg: '网络错误' });
                Message.error({ msg: '网络错误' });
                reject({ msg: '网络错误' });
            });
    });
}
