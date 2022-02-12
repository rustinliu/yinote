import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = '//note-server.hunger-valley.com';
axios.defaults.withCredentials = true;

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let options = {
            url,
            method: type,
            ValidityState(status) {
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
                else reject(res.data);
            })
            .catch((err) => {
                console.error({ msg: '网络错误' });
                reject({ msg: '网络错误' });
            });
    });
}
