import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Index from '../pages/Index.vue';
import List from '../pages/List.vue';
import Nation from '../pages/Nation.vue';
import Cart from '../pages/Cart.vue';
import Mine from '../pages/Mine.vue';
import Reg from '../pages/Reg.vue';
import Login from '../pages/Login.vue';
import Detail from '../pages/Detail.vue';
import Load from '../pages/Load.vue'
import Service from '../pages/Service.vue'
import Sousuo from '../pages/Sousuo.vue'
import Classifylist from '../pages/Classifylist.vue';
import Order from '../pages/Order.vue'
import Address from '../pages/Address.vue'
import Addlist from '../pages/Addlist.vue'



const router = new VueRouter({
    mode:"history",
    routes: [{
            name: 'index',
            path: '/index',
            component: Index
        }, {
            name: 'list',
            path: '/list',
            component: List
        }, {
            name: 'detail',
            path: '/detail:id',
            component: Detail
        },
        {
            name: 'address',
            path: '/address',
            component: Address
        },
        {
            name: 'addlist',
            path: '/addlist',
            component: Addlist
        },
        {
            name: 'order',
            path: '/order',
            component: Order
        },
        {
            name: 'nation',
            path: '/nation',
            component: Nation
        },
        {
            name: 'sousuo',
            path: '/sousuo',
            component: Sousuo
        },
        {
            name: 'classifylist',
            path: '/classifylist',
            component: Classifylist
        }, {
            name: 'cart',
            path: '/cart',
            component: Cart,
            meta: {
                requiresAuth: true
            }

        }, {
            name: 'mine',
            path: '/mine',
            component: Mine,

        }, {
            name: 'reg',
            path: '/reg',
            component: Reg
        }, {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'load',
            path: '/load',
            component: Load
        },
        {
            name: 'service',
            path: '/service',
            component: Service
        },
        {
            path: '/',
            redirect: '/index'
        }
    ]
})
//全局路由守卫
//to:目标路由
//from:当前路由
//一定要调用next()方法才可进入目标路由
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        //获取token
        // let $store = router.app.$store
        let Authorization = Vue.prototype.$store.state.common.user.Authorization;
        console.log("Authorization",Authorization);
        
        if (Authorization) {
            //登录则放行
            next();
            //发送校验请求
            // router.app.$axios.get('/verify', {
            //     headers: {
            //         Authorization
            //     }
            // }).then(({
            //     data
            // }) => {
            //     if (data.status === 0) {
            //         $store.commit('logout'); //token过期，触发
            //         next({
            //             path: '/login',
            //             query: {
            //                 redirectUrl: to.fullPath
            //             }
            //         })
            //     }
            // })
        } else {
            //否则跳到登录页面
            next({
                path: '/login',
                query: {
                    redirectUrl: to.fullPath
                }
            })
        }
    } else {
        next();
    }
})



export default router;