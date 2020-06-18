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
        },
        {
            name: 'searchGoods',
            path: '/searchGoods',
            meta: {
                title: '搜索列表',
                requireAuth: false
            },
            component: () => import('@/views/searchGoods'),
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
            redirect: '/isSelled',
            component: () => import('@/views/shouye/mine'),
            children: [{
                name: 'isSelled',
                path: '/isSelled',
                meta: {
                    title: '已卖',
                    requireAuth: false
                },
                component: () => import('@/views/mineMenu/isSelled'),
            },{
                name: 'isBuyed',
                path: '/isBuyed',
                meta: {
                    title: '已买',
                    requireAuth: false
                },
                component: () => import('@/views/mineMenu/isBuyed'),
            },{
                name: 'pingLun',
                path: '/pingLun',
                meta: {
                    title: '评论页',
                    requireAuth: false
                },
                component: () => import('@/views/mineMenu/pingLun')
            },{
                name: 'selledNow',
                path: '/selledNow',
                meta: {
                    title: '正在售卖',
                    requireAuth: false
                },
                component: () => import('@/views/mineMenu/selledNow'),
            },{
                name: 'changeNow',
                path: '/changeNow',
                meta: {
                    title: '正在交易',
                    requireAuth: false
                },
                component: () => import('@/views/mineMenu/changeNow'),
            },{
                name: 'editSellMsg',
                path: '/editSellMsg',
                meta: {
                    title: '编辑商品信息',
                    requireAuth: false
                },
                component: () => import('@/views/mineMenu/editSellMsg'),
            }]
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
    },{
        name: 'login',
        path: '/login',
        meta: {
            title: '登录页',
            requireAuth: false
        },
        component: () => import('@/views/login')
    },{
        name: 'forgetmm',
        path: '/forgetmm',
        meta: {
            title: '忘记密码',
            requireAuth: false
        },
        component: () => import('@/views/forgetmm')
    },]
})

export default router;