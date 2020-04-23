import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        name: 'index',
        path: '/',
        redirect: '/shouye',
        meta: {
            title: '首页',
            requreAuth: false
        },
        component: () => import('@/views/index'),
        children: [{
            name: 'shouye',
            path: '/shouye',
            meta: {
                title: '首页',
                requireAuth: false
            },
            component: () => import('@/views/shouye/index'),
        },{
            name: 'classify',
            path: '/classify',
            meta: {
                title: '分类页',
                requireAuth: false
            },
            component: () => import('@/views/shouye/classify'),
        },{
            name: 'unused',
            path: '/unused',
            meta: {
                title: '卖闲置',
                requireAuth: false
            },
            component: () => import('@/views/shouye/unused'),
        },{
            name: 'cart',
            path: '/cart',
            meta: {
                title: '购物车',
                requireAuth: false
            },
            component: () => import('@/views/shouye/cart'),
        },{
            name: 'mine',
            path: '/mine',
            meta: {
                title: '我的',
                requireAuth: false
            },
            component: () => import('@/views/shouye/mine'),
        }]
    },{
        name: 'goodsList',
        path: '/goodsList',
        meta: {
            title: '商品列表',
            requireAuth: false
        },
        component: () => import('@/views/goodsList'),
    },{
        name: 'goodDetail',
        path: '/goodDetail',
        meta: {
            title: '商品详情',
            requireAuth: false
        },
        component: () => import('@/views/goodDetail'),
    },{
        name: 'sellers',
        path: '/sellers',
        meta: {
            title: '卖家信息',
            requireAuth: false
        },
        component: () => import('@/views/sellers'),
    },{
        name: 'conection',
        path: '/conection',
        meta: {
            title: '聊天',
            requireAuth: false
        },
        component: () => import('@/views/conection'),
    },]
})

export default router;