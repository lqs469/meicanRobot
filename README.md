# meicanRobot 美餐计划

## 介绍
一个集钉钉机器人消息推送, 抓取美餐相关数据, web展示的相关代码

按功能分为三个部分：
- 发送推送
- 抓数据
- web展示页

## 环境
- Node version >= 5.0
- npm version >= ?

## 使用说明

1. 安装
```BASH
npm install
```

2. 相关功能
```BASH
  // 启动推送命令:
  npm run dev     // 开发环境
  npm run start   // 生产环境

  // 抓取数据:
  npm run db

  // Web展示页
  npm run web
```

## 钉钉机器人相关
相关的webhook配置在`/config/index.js`中，默认 *JARVIS* 是生产环境的机器人，*LQS469_ROBOT* 是开发环境机器人，你可以改成你想要的。
在开发环境中只会触发后一个webhook，并且默认时间为5秒一次推送，方便调试。在生产环境中，会同时触发两个webhook，间隔时间是配置中的`TIME`，单位ms，默认为一分钟(60000)。

## web展示页相关
执行`npm run web`之后打开 [0.0.0.0:4000](0.0.0.0:4000)
端口配置信息在`/config/index.js`


## 数据库相关信息
默认使用MySQL， 配置相关属性在 `/config/index.js`中。
抓取时间范围是`DATE_COUNTER`，单位为天，默认60天。

- db: meican

- table: rest

|Field      |Type      |Length |Default           |Extra                      |
|:--------- |:---------|:------|:-----------------|:--------------------------|
|id         |INT       |11     |                  |auto_increment             |
|name       |VARCHAR   |100    |                  |                           |
|latitude   |FLOAT     |       |                  |                           |
|longitude  |FLOAT     |       |                  |                           |
|dishLimit  |INT       |11     |                  |                           |
|availeDish |INT       |11     |                  |                           |
|rating     |INT       |11     |                  |                           |
|uniqueId   |VARCHAR   |10     |                  |                           |
|targetTime |TIMESTAMP |       |CURRENT_TIMESTAMP |on update CURRENT_TIMESTAMP|

## Docker相关
- Docker version >= ？

Dockerfile文件在根目录下，直接运行即可，默认运行生产环境，如需调试可以在Dockerfile中修改。

```BASH
docker build -t meican .

docker run meican
```
