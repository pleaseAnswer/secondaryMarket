# Question & Answer

## 小程序

* 小程序为啥不能用window
  * 因为在jscode中运行的，这是一个没有窗口对象的环境

## 公众号

* 公众号开发时，接口没有用/api开头却可以实现代理？
  * 因为设置了电脑的host 实现了代理`C:\Windows\System32\drivers\etc\host`

## vue

* 如何实现监听对象中一个属性的变化？

```js
rule:{
    name:"",
    age:""
}

computed: {
    getName: function() {
        return this.rule.name
    }
},
watch:{
    getName:{
        handler:function(){
            //do something
        }
    }
}

```

## 路由-vue

* 如何实现路由懒加载?

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        name: '',
        path: '',
        meta: {
            title: '',
            requireAuth: '',
        },
        // 使用import动态引入异步组件
        component: () => import('@/index')
    }]
})
```

* 如何实现路由嵌套？

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const User = () => import('@/index');
const Profile = () => import('@/index/profile');
const router = new VueRouter({
    routes: [{
        name: 'user',
        path: '/user',
        component: User,
        children: [{
            // 当user/profile匹配成功时，组件会被渲染在User组件的<router-view></router-view>中
            name: 'profile',
            path: '/profile',
            component: Profile
        },{
            name: '',
            path: '',
            component: ''
        }]
    }]
})
```

* 如何实现路由拦截？
    1. 定义路由时，通过meta属性添加一个自定义字段[requireAuth]
    2. 利用全局路由钩子beforeEach()对路由进行判断
       1. 先判断该路由是否需要权限[to.meta.requireAuth]
       2. 再获取当前token是否存在
       3. 存在则next()，否则将跳转的路由path作为参数，登录成功后跳转至该路由

```js
//定义路由元信息，确定哪个路由需要登陆权限
//router>index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
       name:'cart',
       path:'/cart',
       component:Cart,
       meta:{ requiresAuth :true}
    }]
})

//进入路由后，确认用户是否登录
//[全局路由守卫中做判断]
//如何实现登陆后跳回原页面？
//query & this.$route
//a: 登录则放行 -- [暂时]
//b: 否则跳转至登录界面并传递目标路由地址

//app>routers>index.js -- 确认用户是否登录
router.beforeEach((to,from,next)=>{
    //判断当前路由是否需要路由权限
    if(to.meta.requiresAuth){
        //获取token
        let Authorization = localStorage.getItem('Authorization');
        if(Authorization){
            //登录则放行
            next();
        }else{
            //否则跳转到登录页面
            //同时传递路由地址 -- 为了登录后能够再次返回
            // router.push('/login');
            next({
                path:'/login',
                query:{
                    redirectUrl : to.fullPath
                }
            });
        }
    }else{
        next();
    }
})
```

* 对ajax的理解？编写用ajax发生GET、POST请求
  * ajax即异步的javaScript和XML，它通过在后台与服务器进行少量数据交换，使得网页可以在不重新加载整个网页的情况下，对网页的某部分进行更新。即实现了异步更新。

```js
// 先创建网络请求
let xhr = new XMLHttpRequest();
// 设置请求对象（方法、路径、异步）
xhr.open(method, url, async);
// 发送网络请求
xhr.setRequestHeader(); // post 请求设置请求头编码格式
xhr.send(string); // 一般用get时string为空
// 监听网络请求的状态
xhr.onReadyStateChange = function() {
    if(xhr.readyState == 4) {
        if(xhr.status == 200) {
            // json -> js对象
            let data = JSON.parse(xhr.responseText);
        } else {}
    }
    let timer = setTimeout(() => {
        xhr.abort();
        clearTimeout(timer)
    },timeout)
}
```

## js

* 如何理解事件委托？`var currentTarget = e.target || e.srcElement;`
  * 事件委托就是利用事件冒泡的原理，将事件绑定在父级元素身上。
  * 利用事件委托，可以给尚未存在的标签绑定事件。

```js
goto(e) {
    let currentTarget = e.target || e.srcElement;
    let index = currentTarget.getAttribute("data-index");
    if(index === 'userManage' || index === 'applyManage') {
        this.$router.push({
            path: `/userCenter/${index}`
        })
        if(index === 'userManage') {
            this.userManageFlag = true;
            this.applyManageFlag = false;
            this.userMain = '用户管理';
        } else if(index === 'applyManage') {
            this.applyManageFlag = true;
            this.userManageFlag = false;
            this.userMain = '应用管理';
        }
    }
},
```

```html

```
