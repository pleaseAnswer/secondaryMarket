const express = require('express');
let Router = express.Router();

const {
    token,
    formatData
} = require('../utils');

//引入文件模块
let oppoRouter = require('./pro');
let fenleiRouter = require('./fenlei');
let prosRouter = require('./pros');
let userRouter =require('./userlist')
let orderlistRouter=require('./orderlist')
let sellerRouter=require('./sellerlist')
let regRouter = require('./reg');
let cartRouter = require('./cart');
let loginRouter =require('./login');
let addressRouter =require('./address');
let adminRouter =require('./admin')


// 跨域解决方案CORS
Router.use((req, res, next) => {
    // 支持CORS跨域，只需要设置响应头
    // res.header('Access-Control-Allow-Origin','*');
    let currentOrigin = req.get('Origin');
    let allowOrigin = ['http://localhost:8080', 'http://localhost:8081','http://localhost:8082'];
    if (allowOrigin.includes(currentOrigin)) {
        res.set({
            'Access-Control-Allow-Origin': currentOrigin,
            'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTION',
            'Access-Control-Allow-HEADERS': "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
        })
    }
    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200); //让option请求快速返回
    } else {
        next();
    }
})
//格式化请求体中的参数
Router.use(express.json(), express.urlencoded({
    extended: false
}));


//关联中间件
Router.use('/pro', oppoRouter);
Router.use('/fenlei', fenleiRouter );
Router.use('/pros', prosRouter );
Router.use('/userlist',userRouter)
Router.use('/orderlist',orderlistRouter)
Router.use('/sellerlist',sellerRouter)
Router.use('/reg', regRouter);
Router.use('/cart', cartRouter);
Router.use('/login', loginRouter);
Router.use('/address', addressRouter)
Router.use('/admin', adminRouter)

//检验token
Router.get('/verify', (req, res) => {
    // 获取请求头上的token
    let Authorization = req.get('Authorization');
    if (token.verify(Authorization)) {
        res.send(formatData())
    } else {
        res.send(formatData({
            status: 0
        }))
    }
})

module.exports = Router;