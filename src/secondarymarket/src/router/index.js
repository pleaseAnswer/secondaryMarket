import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index',
        meta: {
            title: '首页',
            requireAuth: false
        },
    },{
        name: 'index',
        path: '/index',
        meta: {
            title: '首页',
            requireAuth: false
        },
        component: () => import('@/views/index'),
    },{
        name: 'classify',
        path: '/classify',
        meta: {
            title: '分类页',
            requireAuth: false
        },
        component: () => import('@/views/classify'),
    },{
        name: 'unused',
        path: '/unused',
        meta: {
            title: '卖闲置',
            requireAuth: false
        },
        component: () => import('@/views/unused'),
    },{
        name: 'cart',
        path: '/cart',
        meta: {
            title: '购物车',
            requireAuth: false
        },
        component: () => import('@/views/cart'),
    },{
        name: 'mine',
        path: '/mine',
        meta: {
            title: '我的',
            requireAuth: false
        },
        component: () => import('@/views/mine'),
    }]
})

export default router;