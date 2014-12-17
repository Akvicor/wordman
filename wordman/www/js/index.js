/*
 * Copyright (c) 2014, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview index.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.2.2.4, Dec 17, 2014
 * @since 1.0.0
 */
var app = {
    /**
     * 是否在真机上运行.
     * 
     * @type Boolean
     */
    deviced: false,
    initialize: function () {
        this.bindEvents();

        // 第一次打开应用屏幕
        $('#setup').height($(window).height());

        // XXX: 打包时删了下面两行
//        clazz.initClasses();
//        keyboard.init();
    },
    bindEvents: function () {
        document.addEventListener("backbutton", this.onBackKeyDown, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        // 初始化，第一次打开应用时将导入词库
        clazz.initClasses();

        app.deviced = true;

        keyboard.init();
    },
    onBackKeyDown: function () {
        if (confirm('确定要退出吗?')) {
            navigator.app.exitApp();
        }
    }
};
// 初始化 ng 应用
var wordmanNG = angular.module('Wordman', ['ngRoute']);

// 配置多视图路由
wordmanNG.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/lexicon-list', {
                    templateUrl: 'lexicon-list.html',
                    controller: 'LexiconCtrl'
                }).
                when('/dict-list', {
                    templateUrl: 'dict-list.html',
                    controller: 'DictCtrl'
                }).
                when('/recite-word/:classId', {
                    templateUrl: 'recite-word.html',
                    controller: 'ReciteWordCtrl'
                }).
                when('/review-word/:classId', {
                    templateUrl: 'review-word.html',
                    controller: 'ReviewWordCtrl'
                }).
                otherwise({
                    redirectTo: '/index.html'
                });
    }
]);
