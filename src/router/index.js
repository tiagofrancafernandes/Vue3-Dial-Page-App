import { createRouter, createWebHashHistory } from 'vue-router';
import DialView from '@/views/DialView.vue';

const routes = [
    {
        path: '/',
        name: 'dial',
        component: DialView,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
