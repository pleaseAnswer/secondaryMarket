## 工程化

* npm run build
* build.js文件

```js
// 显示转圈
const ora = require('ora')
// node -- 不能直接读取或者删除一个文件 由rimraf执行
const rm = require('rimraf')
const path = require('path')
// 显示字体颜色
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()
// 删除dist目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // webpack -- 本质上就是一个方法 webpack()
  // dll 优化
//   webpack(webpackDll,
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
```

* 通过package.json执行 运行的是项目内的webpack
* 命令行输入 运行的是安装在全局的webpack

### 相关包

* commaner

```js
// 用于定义指令
const commaner = require('commaner')
// 定义版本号
commaner.version('1.0.0', '-v --version')
commaner.option('-a -atets', '-a --a')
commaner.command('init <name>').action(()=>{})
```

* ora
* chalk

```js
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.rgb(221,33,99).bgRgb(22,33,44)('hello ora')).start()
spinner.color = 'yellow'
console.log(chalk.red.bgBlue('hello world'))
console.log(chalk.rgb(221,33,99).bgRgb(22,33,44)('hello world'))
setTimeout(()=>spinner.stop(),2000)
```

### 构建自己的cli

#### vue-cli 项目脚手架

* 下载项目初始化模板-工程化
* 定义项目规则
* 定义项目操作命令

#### 一个cli工具的工作流程

* 输入初始化命令
* 执行交互的js
* 与用户交互
* 根据用户指令下载模板
* 模板下载成功

### 完整的工程化

```json
{
    "name": "my-clitool",
    "version": "1.0.0",
    "description": " ",
    "main": "index.js:",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
    },
    "bin":{
        // 定义命令
        "my-cli2": "./index.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "chalk": "^3.0.0",
        "commander": "^4.1.1",
        "inquirer": "^7.0.4",
        "ora": "^4.0.3"
    },
}
```

* index.js
  * npm link

```js
// 告诉电脑自动查找node
#!/usr/bin/env/ node
const commander = require('commander')
// 提问
const inquirer = require('inquirer')
commander.version('1.0.0','-v --version')
commander.command('init <name>').action(function(name){
    inquirer.prompt([
        {
            type: 'input',
            name: 'author',
            message: '你叫什么名字'
        },
        // {
        //     type: 'radio'
        // },
    ]).then(answer=>{
        console.log(answer)
        // 拿取模板1
        require()
    })
})
commander.parse(process.argv)
```

* 模板 -- 1放在和脚手架一起 bin>index.js
* 模板 -- 2 放在git上

```js
// node 不能读取在整个文件夹 -- 数据驱动思维
// 前端思维 dom ui 做一个效果 先移动那个div，再移动哪个div
// 递归
// [
//     ['dir','./src'],
//     ['files','./app.js'],
//     ['dir','./src/route']
// ]
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
function a(name) {
    var demoPath = './project'
    var targetPath = './' + name
    var spinner = ora(chalk.rgb(221,33,99).bgRgb(22,33,44)('下载中'))
    // 根据数组 下载模板
    function down(arr) {
        function finish() {
            spinner.stop()
            console.log(chalk.green('下载完成'))
        }
        while(arr.length > 0) {
            var item = arr.shift()
            if(item[0] == 'file') {
                var data = fs.readFileSync(item[1])
                fs.whiteFileSync(targetPath + '/' + item[1].replace('./project','.'), data)
            } else {
                var path = targetPath + '/' + item[1].replace('./project','.')
                fs.mkdirSync(path)
            }
        }
        finish()

    }
    // 将文件夹 -> 数据数组
    function makearr() {
        var arr = []
        function read(path) {
            var files = fs.readdirSync(path)
            files.forEach((item,index) => {
                var nowpath = path + '/' + item
                var stat = fs.statSync(noepath)
                if(stat.isDirectory()) {
                    arr.push(['dir',nowpath])
                    read(nowpath) // 递归
                } else {
                    arr.push(['fle', nowpath])
                }
            })
        }
        read(demoPath)
        return arr
    }
    fs.mkdir('./'+name, function() {
        down(makearr())
    })
}
module.exports = a
```

* download-git-repo

### 工程化包含的内容

* 命令行工具 vue-cli
* 规范（代码规范，项目约定）
* 测试（单元测试，e2e）
* 构建 webpack
* 集成与部署（CI/CD,部署，docker）
* 代码管理 git

## 思考步骤

> 程序 = 模块 + 模块间的沟通

*1* 功能的主题如何实现

* 工厂模式 $() 大量、频繁创造
* 单例模式 vue-router vuex 保证全局只有一个实例化对象
* 建造者模式 复杂、需要精细化构造的对象

* 创建一个动态表单 验证
* 创建一个缓存器，缓存某些接口的api

*2* 脱离代码，抽象思想，实现这个功能需要哪几步
*3* 回到代码，思考实现这几步，需要什么模块
*4* 组织模块沟通
*5* 实现模块
*6* 质量调优

### 观察者模式

* 目的：当模块之间不方便直接沟通
* 使用方式：通过一个中介模块，来转发消息

```js
var observe = {
    message: {
        // 储存注册监听
    },
    // 订阅-发布
    regist: function(type, fn) {
        this.message[type] = fn;
    },
    fire: function() {
        this.message[type]();
    }
}
```

```js
// 一个越转越快的转盘
// 函数式
// 获取最终奖品，开始转动，每转动一圈减慢速度再转一圈，最后一圈停在对应的奖品
// 结果模块 动画效果模块 转动控制模块 html结构生成模块

var observe = {
    message: {

    },
    regist: function(type, fn) {
        this.message[type] = fn;
    },
    fire: function() {
        this.message[type]();
    }
}

// 单一职责原则
var domArr = [];
// html结构生成模块
function htmlInit(target) {
    for(var i = 0; i<=9; i++) {
        var _div=document.createElement('div');
        _div.setAttribute('class','item');
        _div.innerHTML = i;
        target.appendChild(_div);
        domArr.push(_div);
    }
}
// 结果模块
function getFinal() {
    var _num = Math.random() * 10 + 40;
    return Math.floor(_num, 0);
}
// 动画效果模块
function mover(moveConfig) {
    var _nowIn = 0;
    var _removeNum = 9;
    var _timer = setInterval(() => {
        if(_nowIn != 0) {
            _removeNum = _nowIn - 1;
        }
        domArr[_removeNum].setAttribute('class', 'item');
        domArr[_nowIn].setAttribute('class', 'item item-on');
        _nowIn++;
        if(_nowIn == moveConfig.moveTime) {
            clearInterval(timer);
            if(moveConfig.moveTime == 10) {
                observe.fire('finish');
            }
        }
    }, moveConfig.speed);
}
function moveControll() {
    var _final = getFinal();
    var _circle = Math.floor(final/10, 0);
    var _runCircle = 0;
    var _stopNum = final%10;
    var _speed = 200;
    mover({
        moveTime: 10,
        speed: _speed
    })
    observe.regist('finish', function() {
        var _time = 0;
        _speed -= 50;
        _runCircle++;
        if(_runCircle <= _circle) {
            _time = 10;
        } else {
            _time = _stopNum;
        }
        mover({
            moveTime: _time,
            speed: _speed
        })
    })
}
function begin() {
    htmlInit(document.getElementById('app'));
    moveControll();
}
window.begin = begin;
```

### 职责链模式

* 目的：让功能的完成以消息按链条传递来处理
* 使用方式：线性处理，同步模块

```js
// 可扩展性
// 事件绑定模块 -> 前端验证模块 -> 后端验证模块

input.onblur = function() {
    var _value = input.value;
    var _arr = [front, middle, back];
    // 依次执行_arr里面的每一个方法，然后把上一个方法的结果给到下一个
    async function test() {
        var _result = _value;
        while(_arr.length > 0) {
            _result = await _arr.shift()(_result);
        }
    }
    test().then(res => {

    })
}
function front() {

}
function back() {

}
function middle() {

}
```

### 质量调优

#### 健壮性

#### 简洁性

* if-else -> 策略模式，状态模式
* 重复的代码很多 -> 享元模式

## js的执行机制

> 异步

* 微任务：Promise process.nextTick
* 宏任务：整体代码script setTimeout setInterval
    > async 语法操作符[不算同步，不算异步]
    > async -> await promise

```js
setTimeout(() => {
    console.log(1);
})
new Promise((res,rej) => {
    console.log(2)
    res()
}).then(() => {
    console.log(3)
})
console.log(4)
// 2431
async function a() {
    console.log(1)
}
a()
// 24131

```

* 异步队列 -> []
* 宏队列：执行每个宏任务时会先清空微任务队列
* 微队列：微队列为空时执行宏队列

```js
setTimeout(() => {
    console.log('set1');
    new Promise((res,rej) => {
        console.log('pr1');
        res();
    }).then(() => {
        console.log('then1');
    })
})
setTimeout(() => {
    console.log('set2');
})
new Promise((res,rej) => {
    console.log('pr2');
    res();
}).then(() => {
    console.log('then2');
})
new Promise((res,rej) => {
    console.log('pr3');
    res();
    setTimeout(() => {
        console.log('set3');
    })
}).then(() => {
    console.log('then3');
})
console.log(1);
// pr2 pr3 1 then2 then3 set1 pr1 then1 set2 set3

// pr2 pr3 1 -> then2 then3 -> set1 pr1 then1 -> set2 set3
// 微任务['then2', 'then3'] ==> 空 ['then1']
// 宏任务['set1', 'set2', 'set3'] => ['set2', 'set3']
```

## V8引擎内存问题

> 内存 -js - 变量 var let cosnt

* 64位 -> 1.4G     32位 -> 0.7G
* why 1.4G 0.7G
*1* 表象原因 1.4g够用了 js-脚本语言，一次性执行 java C-服务语言，持久性的服务
*2* 深层次原因 js每回收一次垃圾，会把整个代码的执行暂停 200mb 30ms

* 新生代-生存并不久的变量
* 老生代-常驻变量
* 新生代 -> 老生代
*1* 新生代内存空间使用超过25%
*2* 经过了一次回收，但还没有被回收掉

```js
var f1 = (function() {
    var a = 123;
    return function() {
        return a
    }
})
// 只有f1被回收时才会回收a
```

* 新生代回收算法 老生代回收算法
* 复制 - 删除   [from to]
  * [a,b,c] 复制活的变量
* 标记 - 清除 - 整理
  * [1,2,3,4] 标记死亡变量 - 清除 [1,,3,] - 整理 [1,3,,,]
    * 磁盘碎片整理
    * 数据结构
    * 数组 -> 只能储存相同大小的同样变量，他在内存上必须是连续的空间

## 如何优化内存

### 内存如何回收

* node -> [源码]c++ -> node可以使用一部分的c的空间
* node -> 可以配置内存 webpack打包

```js
    function getme() {
        var mem = process.memoryUsage();
        var format = function(bytes) {
            return (bytes / 1024 / 1024).toFixed(2) + 'MB';
        }
        console.log('heapTotal:' + formate(mem.heapTotal) +
            'heapUsed:' + formate(men.heapUsed)
        )
    }
    var arr = [];
    var size = 30 * 1024 * 1024;
    // for(var i = 0; i < 15; i++) {
    //     arr.push(new Array(size));
    //     getme();
    // }

    // function b() {
    //     var arr1 = new Array(size);
    //     var arr2 = new Array(size);
    //     var arr3 = new Array(size);
    //     var arr4 = new Array(size);
    //     var arr5 = new Array(size);
    //     var arr6 = new Array(size);
    // }
    // b();
    // setInterval(() => {
    //     arr.push(new Array(size))
    // },1000)

    function b() {
        var arr1 = new Array(size);
        var arr2 = new Array(size);
        var arr3 = new Array(size);
        var arr4 = new Array(size);
        var arr5 = new Array(size);
        var arr6 = new Array(size);
        return [arr1,arr2,arr3,arr4,arr5,arr6]
    }
    var globalArr1 = b();
    setInterval(() => {
        arr.push(new Array(size))
    },1000)
```

### 内存溢出

* 滥用全局变量
  
```js
// 关注全局变量，并且适当手动回收他
const a = {a:123,b:123};
a = undefined || null;
```

* 缓存不限制

```js
    var arr = [];
    var size = 30 * 1024 * 1024;
    setInterval(() => {
        // 限制长度
        if(arr.length > 4) {
            arr.shift();
        }
        arr.push(new Array(size))
    },1000)
    // 缓存是优化的一个重要操作
```

* 操作大文件
  * node -> createStream 切片上传

### 性能监控

* Lighthouse -- 谷歌推出的一个网站测评工具
  * npm i lighthouse -g
  * lighthouse ip --output=html -path ./\
  * 会给性能优化建议

* 回报代码
  * window.performance

### 高端技术

* ssr serverless vite
