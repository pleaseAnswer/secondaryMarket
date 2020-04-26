# mongodb + robot

## mongodb 安装完配置path

## mongo 服务启动失败 -- 拒绝连接，连接失败

### 在MongoDB安装目录下新建mongo.config配置文件并配置以下内容：

> dbpath=H:\MongoDB\data
> logpath=H:\MongoDB\log\mongo.log

### 跑起配置文件

> H:\MongoDB\bin\mongo.exe --config H:\MongoDB\mongo.config
