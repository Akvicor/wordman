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
 * @fileoverview lexicon.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.1.0.3, May 26, 2014
 * @since 1.0.0
 */
function LexiconCtrl($scope) {
    keyboard.hide();

    $scope.lexicons = [];

    $scope.goReview = function(classId, count) {
        if (count === 0) {
            alert("温故知新足以！");
            return false;
        }
        window.location = '#review-word/' + classId;
    };
    $scope.goRecite = function(classId, count) {
        if (count === 0) {
            alert("不要太勤奋，明天再来！");
            return false;
        } else if (count === -1) {
            if (!confirm("确定学习该词库？")) {
                return false;
            }
        }

        window.location = '#recite-word/' + classId;
    };

    $scope.setup = function(clazzId) {
        clazz.importClass(clazzId, function() {
            var lexicons = $scope.lexicons;
            for (var i = 0; i < lexicons.length; i++) {
                if (lexicons[i].id === clazzId) {
                    lexicons[i].state = 2;
                    $scope.$apply();
                    break;
                }
            }
        });
    };

    clazz.getClasses(function(data) {
        var classes = [];

        for (var i = 0; i < data.length; i++) {
            var toLearns = data[i].toLearns;
            if (data[i].selected === 0) {
                // 还未选中该词库进学习
                toLearns = -1;
            }

            var clazz = {
                title: data[i].name,
                id: data[i].id,
                state: data[i].state,
                count: data[i].size,
                progress: data[i].finished / data[i].size * 100,
                times: data[i].times, // 该词库学习过的次数
                toLearns: toLearns, // 今天需要学习的课程数
                toReviews: data[i].toReviews // 今天需要复习的课程数
            };

            classes.push(clazz);
        }

        $scope.lexicons = classes;
        $scope.$apply();
    });
}

