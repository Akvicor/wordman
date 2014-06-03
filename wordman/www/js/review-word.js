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
 * @version 1.1.0.1, May 18, 2014
 */
function ReviewWordCtrl($scope, $routeParams) {
    $scope.reviewWords = [];
    $scope.inputWord = "";
    $scope.btnText = "清空";
    $scope.index = 0;
    $scope.hasStudy = false;

    $scope.mattch = function(event) {
        if (event.keyCode === 13) {
            this.studyNext();
            return false;
        }
        if ($scope.inputWord === $scope.letter) {
            $scope.btnText = '确定';
        } else {
            $scope.btnText = '清空';
        }
    };

    $scope.next = function() {
        $scope.index++;
        $scope.sounds = $scope.reviewWords[$scope.index].sounds;
        $scope.letter = $scope.reviewWords[$scope.index].letter;
        $scope.explain = $scope.reviewWords[$scope.index].explain;
        $scope.speech = $scope.reviewWords[$scope.index].speech;
        $scope.hasStudy = $scope.reviewWords[$scope.index].hasStudy;
    };

    $scope.studyNext = function() {
        if ($scope.btnText === "清空") {
            $scope.inputWord = "";
        } else {
            if ($scope.index === $scope.reviewWords.length - 1) {
                alert('已完成当前课程的复习');

                clazz.finishReview(reviewWord.currentClassId, reviewWord.currentPlanId);

                window.location = '#lexicon-list';
                return false;
            }
            $scope.index++;
            $scope.sounds = $scope.reviewWords[$scope.index].sounds;
            $scope.letter = $scope.reviewWords[$scope.index].letter;
            $scope.explain = $scope.reviewWords[$scope.index].explain;
            $scope.speech = $scope.reviewWords[$scope.index].speech;
            $scope.reviewWords[$scope.index - 1].hasStudy = true;
            $scope.hasStudy = false;
            $scope.inputWord = "";
        }
    };

    $scope.prev = function() {
        $scope.index--;
        $scope.sounds = $scope.reviewWords[$scope.index].sounds;
        $scope.letter = $scope.reviewWords[$scope.index].letter;
        $scope.explain = $scope.reviewWords[$scope.index].explain;
        $scope.speech = $scope.reviewWords[$scope.index].speech;
        $scope.hasStudy = true;
    };

    $scope.back = function() {
        var result = confirm("确定要返回吗?");
        if (result) {
            window.location = '#lexicon-list';
        }
    };

    reviewWord.init($scope, $routeParams.classId);
}

var reviewWord = {
    currentPlanId: "",
    currentClassId: "",
    init: function($scope, classId) {
        reviewWord.currentClassId = classId;
       
        clazz.getReviewPlans(classId, function(result) {
            reviewWord.currentPlanId = result.planId;

            var words = result.words;
            var reviewWords = [];

            for (var i = 0, ii = words.length; i < ii; i++) {
                var para = words[i].para.split(". ");
                reviewWords.push({
                    sounds: words[i].phon,
                    letter: words[i].word,
                    explain: para[1],
                    speech: para[0] + "."
                });
            }

            $scope.reviewWords = reviewWords;
            $scope.sounds = $scope.reviewWords[0].sounds;
            $scope.letter = $scope.reviewWords[0].letter;
            $scope.explain = $scope.reviewWords[0].explain;
            $scope.speech = $scope.reviewWords[0].speech;
            $scope.$apply();
        });
    }
};
