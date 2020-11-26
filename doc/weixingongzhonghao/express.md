
## 一、搭建一个express服务

1. 全局安装express生成器
`npm i -g express-generator + express`

2. 使用express初始化项目结构
`express --no-view myserver`

3. 进入项目,安装依赖
`npm i`

4. 启动express服务
`npm run start`

## 二、express代码结构及作用

1. www文件
`localhost:3000`

2. public 静态资源存放目录

## 三、mongodb相关操作

1. 下载并安装mongodb数据库环境

2. 通过 mongod 命令启动数据库

3. 下载并安装robo3t可视化工具

4. 通过robo3t工具连接已经启动的mongodb数据库

5. 使用mongoose模块，实现express服务于mongodb数据库的连接操作

## 四、mongoose模块的连接与使用

1. 安装mongoose模块

2. 使用mongoose.connect()方法链接数据库

3. 使用mongoose.Schema 与 mongoose.model结合，创建数据库模型对象

4. 通过实例化数据模型对象并save()的方法，将新数据存储至数据库

## 五、新浪云部署服务

