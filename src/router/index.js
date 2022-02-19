import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            alias: '/notebooks',
            name: 'NotebookList',
            component: () => import('@/components/NotebookList'),
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/components/Login'),
        },

        {
            path: '/note',
            name: 'NoteDetail',
            component: () => import('@/components/NoteDetail'),
        },
        {
            path: '/trash',
            name: 'Trash',
            component: () => import('@/components/TashDetail'),
        },
    ],
});
