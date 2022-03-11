import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            alias: '/notebooks',
            name: 'NotebookList',
            component: () => import('@/components/NotebookList'),
            meta: { requiresAuth: true },
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
            meta: { requiresAuth: true },
        },
        {
            path: '/trash',
            name: 'Trash',
            component: () => import('@/components/TashDetail'),
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) store.dispatch('checkLogin', '/login');
    next();
});
export default router;
