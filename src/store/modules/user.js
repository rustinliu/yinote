import Auth from '@/apis/auth';
import Router from '@/router';
const state = {
    user: null,
};
const getters = {
    username: (state) => (state.user ? state.user.username : '未登陆'),
    slug: (state) => (state.user ? state.user.username.charAt(0).toUpperCase() : '未'),
};
const mutations = {
    setUser(state, payload) {
        state.user = payload.user;
    },
};
const actions = {
    login({ commit }, { username, password }) {
        return Auth.login({ username, password }).then((res) => {
            commit('setUser', { user: res.data });
        });
    },
    logout({ commit }, payload = { path: '/login' }) {
        return Auth.logout().then((res) => {
            commit('setUser', { user: null });
            console.log(payload);
            Router.push(payload);
        });
    },
    register({ commit }, { username, password }) {
        return Auth.register({ username, password }).then((res) => {
            commit('setUser', { user: res.data });
        });
    },
    checkLogin({ commit, state }, payload) {
        if (state.user) {
            return Promise.resolve(state.user);
        }
        return Auth.getInfo().then((res) => {
            if (res.isLogin) {
                commit('setUser', { user: res.data });
            } else {
                Router.push(payload);
            }
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
