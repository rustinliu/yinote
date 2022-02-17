import requset from '@/helpers/request';

const URL = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_INFO: '/auth',
};
export default {
    register({ username, password }) {
        return requset(URL.REGISTER, 'POST', { username, password });
    },
    login({ username, password }) {
        return requset(URL.LOGIN, 'POST', { username, password });
    },
    logout() {
        return requset(URL.LOGOUT);
    },
    getInfo() {
        return requset(URL.GET_INFO);
    },
};
