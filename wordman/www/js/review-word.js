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
 * @fileoverview review word.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.2.1.2, Dec 17, 2014
 */
function ReviewWordCtrl($scope, $routeParams) {
    $scope.reviewWords = [];
    $scope.errorWords = [];
    $scope.inputWord = "";
    $scope.index = 0;

    $scope.addDict = function (wordId, classId, target) {
        clazz.addNewWord(wordId, classId);
        $(target).remove();
    };

    $scope.reviewNext = function () {
        if ($scope.reviewWords[$scope.index] &&
                $scope.inputWord !== $scope.reviewWords[$scope.index].letter) {
            $scope.errorWords.push($scope.reviewWords[$scope.index]);
        }

        $scope.index++;

        if ($scope.index === $scope.reviewWords.length) {
            var errorLength = $scope.errorWords.length;
            if (errorLength !== 0) {
                keyboard.hide();

                // 展现错误单词
                tip.show('错误：' + (errorLength) + '个', undefined, function () {
                    $scope.reviewWords = $scope.errorWords;
                    $scope.explain = $scope.reviewWords[0].explain;
                    $scope.index = 0;
                    $scope.inputWord = "";
                    $scope.errorWords = [];
                    $scope.$apply();
                    keyboard.show();
                    return true;
                });
            } else {
                alert('已完成该课程的复习');

                clazz.finishReview(reviewWord.currentClassId, reviewWord.currentPlanId);

                window.location = '#lexicon-list';
            }
            return false;
        }

        $scope.explain = $scope.reviewWords[$scope.index].explain;
        $scope.inputWord = "";
    };

    $scope.back = function () {
        if (confirm("要重头开始吗?")) {
            window.location = '#lexicon-list';
        }
    };

    reviewWord.init($scope, $routeParams.classId);
}

var reviewWord = {
    currentPlanId: "",
    currentClassId: "",
    init: function ($scope, classId) {
        keyboard.show(function (val) {
            $scope.inputWord = val;
            $scope.$apply();
        });

        reviewWord.currentClassId = classId;

        clazz.getReviewPlans(classId, function (result) {
            reviewWord.currentPlanId = result.planId;

            var words = result.words;
            var reviewWords = [];

            for (var i = 0, ii = words.length; i < ii; i++) {
                reviewWords.push({
                    letter: words[i].word,
                    explain: words[i].para,
                    sounds: words[i].phon,
                    classId: words[i].classId,
                    id: words[i].id
                });
            }

            $scope.reviewWords = reviewWords;
            $scope.explain = $scope.reviewWords[0].explain;
            $scope.$apply();
        });
    }
};
