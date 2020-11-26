// 引入第三方模块
const express = require('express');
const bodyParser = require('body-parser');

// 利用express创建一个服务器
const app = express();
//根据需求更改limit大小
// app.use(express.json({limit: '5mb'}))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const { PORT } = require('./config.json');


// 引入路由总中间件
const allRouter = require('./routers');

// 搭建静态资源服务器
app.use(express.static('/'))

// 使用路由总中间件
app.use(allRouter);


//监听服务器开启
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})