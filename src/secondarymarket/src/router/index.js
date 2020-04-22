import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        name: 'index',
        path: '/index',
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
        path: '/goodsList/:id',
        meta: {
            title: '商品列表',
            requireAuth: false
        },
        component: () => import('@/views/goodsList'),
    },{
        name: 'goodDetail',
        path: '/goodDetail/:id',
        meta: {
            title: '商品详情',
            requireAuth: false
        },
        component: () => import('@/views/goodDetail'),
    },]
})

export default router;