## webpack配置

```js
    var webpack = require('webpack');
    moudle.exports = {
        //配置入口文件，入口文件可以以对象的形式配置，也可以以数组的形式配置,后缀名可以省略
        /*
        * 对象形式配置入口
        * */
        //entry:{
        //    index:'./index'       //'./index.js'
        //},
        /*
        * 数组形式配置入口
        * */
        entry: [
            './index'       //'index.js'
        ],
        //输出文件出口
        output: {
            /*
            输出路径，在这我们要手动创建一个文件夹，名字可以自己命名，
            输出的文件路径是相对于本文件的路径
            * */
            path: './dist',  //输出路径
            //输出文件名，文件可以自己定义，[name]的意思是与入口文件的文件对应，可以不用[name]
            filename: '[name].bundle.js'
            publicPath: process.env.NODE_ENV === 'production'
                        ? config.build.assetsPublicPath
                        : config.dev.assetsPublicPath // 公共资源路径
            // process.env 可获取当前系统环境信息的对象，常规可以用来进一步获取环境变量、用户名等信息
        },
        /*
        * 标题：加载器（loaders）
        * 作用：需要下载不同别的加载器，如css，js，png等等
        * [babel-loader babel babel-core css-loader style-loader url-loader file-loader less-loader less]
        * */
        loaders: [
            {test: /\.js?$/, loaders: ['babel-loader']}, //babel加载器可以把jsx的语法转换为js的语法，也可以把es6的语法标准转换es5的语法标准
            {test: /\.css?$/, loaders: ['style-loader', 'css-loader']}, // 解析css, 并把css添加到html的style标签里
            {test: /\.less?$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
            {test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']}, // 解析图片
            /*
            * 你可以在这配置别的加载器，写法是一样的
            * */
        ],
        /*
        *
        * */
        resolve: {
            /*
            * 别名配置，配置之后，可以在别的js文件中直接使用require('d3')，将导入的文件作为一个模块导入到你需要的项目中，不用配置别也可会当作模块导入项目中，只是你要重复写路径而已。
            * */
            alias: {
                'd3': 'd3/d3.min.js'
            }
        },
        /*
        * 插件使用  
        **/　 
        plugins: [
           // 在打包后生成html文件，它以src下的index.html为模板
           new HtmlWebpackPlugin({template: 'src/index.html'}),
       ],

       // webpack相关配置
       // [Object | Function] -> 基于webpack-merge
       // Object -> 合并至最终配置中   Function -> 会接收被解析的配置作为参数
       configureWebpack: {

       },

       // 用于改变原devserver配置项的默认行为
       devServer: {
            // [String | Object]
            // 若前端应用和后端API没有运行在同一主机，需在开发环境下将API请求代理到API服务器
            proxy: {
                '/api': {
                    target: 'http://192.168.7.251:1282',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    },
                    secure: false,
                    ws: true
                }
            }
       }
    }
```
