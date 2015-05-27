Wordman
=============

沃德曼（Wordman）是一个移动端的背单词应用，[下载](http://pan.baidu.com/s/1sjtw5Rn)。

## 特性 ##

简约模式能够达到意想不到的成效，Less is More！

* 计划：不多不少，持之以恒
* 科学：艾宾浩斯记忆，渐进式增强

沃德曼 + 坚毅的你 = 词典人，HOHO~

## 功能 ##

* 内置多个常用词库
* 开始选定一个词库学习时设置每天学习的词数，后续就按照该词数进行该词库的学习/复习
* 学习每一个单词时拼写一遍，正确的话到下一个词
* 艾宾浩斯记忆：第 1 天、第 2 天、第 4 天、第 7 天和第 15 天提醒，拼写后到下一个词，过完这课后重复错词，直到没有错词才进入下一课复习
* 生词本：记不住的词随时回顾

## 截图 ##

### 主界面 ###

![image](https://cloud.githubusercontent.com/assets/873584/7827675/af7a666e-045c-11e5-85f1-9153749f941c.png)

### 学习 ###

![image](https://cloud.githubusercontent.com/assets/873584/7827700/f8b054e2-045c-11e5-81cd-ec670c9b0b36.png)

### 复习 ###

![image](https://cloud.githubusercontent.com/assets/873584/7827686/cb4d5324-045c-11e5-87b8-e7404b8728cc.png)

### 生词本 ###

![image](https://cloud.githubusercontent.com/assets/873584/7827705/20ae285c-045d-11e5-9d03-0f8c9e0943b0.png)

## 实现 ##

### 架构 ###

#### 概述 ###

![Architecture](https://cloud.githubusercontent.com/assets/873584/7827317/66527f20-0458-11e5-8808-3f4368300386.png)

* 1.0.0：实现客户端应用 Wordman 以及服务端词库工具 Word，Wordman 自带词库包
* 2.0.0：实现服务端服务程序 Words，更新 Wordman 实现和 Words 的交互，可在线下载词库

##### 客户端 ####

客户端使用 Cordova 进行开发，通过 AngularJS 实现 SPA（[Single-page Application](http://en.wikipedia.org/wiki/Single-page_application)）。

核心框架/库：
* PhoneGap/Cordova 3.4.0
* jQuery 1.10.2
* Async.js 0.8.0
* AngularJS 1.2.16

#### 服务端 ####

* Express
* Jade
* MongoDB

### 数据 ###

#### 单词表 ####

word_${classId}

![image](https://cloud.githubusercontent.com/assets/873584/7827322/74ef66d8-0458-11e5-9566-4d361a2f8317.png)

* phon：音标
* pron：语音路径
* para：释义
* build：构词法
* example：JSON 格式例句

应用端的单词表是通过下载词库包导入的，一个词库对应一张单词表，表名：词库 word_12，例如 word_12。

#### 词库表 ####

class

![image](https://cloud.githubusercontent.com/assets/873584/7827326/80a6127e-0458-11e5-9c37-0b3a7902090a.png)

* size：单词总数
* state：0: 未下载；1：已下载未安装；2：已安装
* times：第几次学习该词库
* selected：当前是否选定，0：未选定；1：选定
* learned：完成学习（尚未完成所有复习轮）的单词数
* finished：完成所有复习轮的单词数


#### 学习计划表 ####

learn_plan

![image](https://cloud.githubusercontent.com/assets/873584/7827330/926d8b7c-0458-11e5-9f96-e8231c5857da.png)

在用户添加一个词库后会生成对这个词库的学习计划，默认每天 20 个词。
* wordIds：今天需要学习的单词 id
* date：计划学习开始日期
* done：实际学习结束日期

#### 复习计划表 ####

review_plan

![image](https://cloud.githubusercontent.com/assets/873584/7827337/9fe83e6e-0458-11e5-8420-84d95a193201.png)

在用户添加一个词库后会生成对这个词库的学习计划，默认每天 20 个词。
* roundId：因为同一课需要复习 5 次（艾宾浩斯），这 5 次的复习计划属于同一轮，轮 id 一样
* wordIds：今天需要复习的单词 id
* date：计划复习开始日期
* done：实际复习结束日期


#### 词库包 ####

一个词库包是一个 SQL zip 文件，下载到应用端后导入到应用端本地库。目前已有的词库包：

![image](https://cloud.githubusercontent.com/assets/873584/7827338/aa85c8f0-0458-11e5-8cb4-7c335955754b.png)

### 初始化 ###

用户安装 Wordman 后首次启动时进行初始化：

1. 生成 UUID，用于标识该 Wordman 应用（2.0.0 后用于上报 Words）
2. 将词库 SQL.zip 逐个导入 Web SQL 数据库

### 计划生成 ###

1. 当用户选定了一个要学习的词库后，使用默认的 20 个单词为一课/天生成学习计划（对于同一词库，一天只能学习一课，默认是 20 个单词）
选定：第一次选择词库时询问用户是否开始学习该词库，用户确定的话认为选定了该词库。
2. 用户每天学习一个词库时使用一开始选定词库时设置的词数进行一课的学习，后续复习也是用这个词数
3. 如果学习/复习进度有延误，比如计划是昨天应该学习/复习这课的，但实际上是今天才学习/复习，那么今天至少要学习两课（昨天延误的和今天的）
4. 第一次学习某课结束后将用当天时间生成该课的复习计划（+1、2、4、7、15 天）

第 3、4 两点表达的是一个策略：当天的时间如果大于等于计划的就开展学习或复习。这样设计主要是要“逼迫”用户把学习/复习任务按照制定的计划进行。

## 开发 ##

1. 安装 Cordova：`npm -g install cordova@3.4.0-0.1.0`
2. 安装目标平台（例如 Android），在 wordman 目录下执行：`cordova platform add android --verbose`
3. 安装 SQLite 插件，在 wordman 目录下执行：`cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin`

构建时不要使用 NetBeans IDE 的构建，而要使用 `cordova build`

### 注意 ###

* JSZip/JSZipUtils 不支持中文，所以词库 zip 包名使用数字，里面的 SQL 脚本统一命名为 class.sql
* ~~Wordman 1.0.0 使用 Web SQL 作为数据库，存在兼容性以及数据量问题，后续需要考虑使用 SQLite 插件~~ 1.1.3 版本已经使用 SQLite 插件实现



----

![logo](https://github.com/b3log/b3log-wordman/blob/master/wordman/ps/drawable/icon.png)
