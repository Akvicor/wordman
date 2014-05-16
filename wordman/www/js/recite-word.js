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
 * @fileoverview recite word.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 0.0.0.1, May 11, 2014
 */
function ReciteWordCtrl($scope) {
    $scope.reciteWords = [];
    $scope.inputWord = "";
    $scope.btnText = "清空";
    $scope.index = 0;
    $scope.hasStudy = false;

    $scope.mattch = function() {
        if ($scope.inputWord === $scope.letter) {
            $scope.btnText = '确定';
        } else {
            $scope.btnText = '清空';
        }
    };

    $scope.next = function() {
        $scope.index++;
        $scope.sounds = $scope.reciteWords[$scope.index].sounds;
        $scope.letter = $scope.reciteWords[$scope.index].letter;
        $scope.explain = $scope.reciteWords[$scope.index].explain;
        $scope.speech = $scope.reciteWords[$scope.index].speech;
        $scope.hasStudy = $scope.reciteWords[$scope.index].hasStudy;
    };

    $scope.studyNext = function() {
        if ($scope.btnText === "清空") {
            $scope.inputWord = "";
        } else {
            if ($scope.index === $scope.reciteWords.length - 1) {
                alert("恭喜你完成该课程的学习");
                // TODO: 标记该课程学完并生成学习计划
                window.location = 'lexicon-list.html';
                return false;
            }
            $scope.index++;
            $scope.sounds = $scope.reciteWords[$scope.index].sounds;
            $scope.letter = $scope.reciteWords[$scope.index].letter;
            $scope.explain = $scope.reciteWords[$scope.index].explain;
            $scope.speech = $scope.reciteWords[$scope.index].speech;
            $scope.reciteWords[$scope.index - 1].hasStudy = true;
            $scope.hasStudy = false;
            $scope.inputWord = "";
        }
    };

    $scope.prev = function() {
        $scope.index--;
        $scope.sounds = $scope.reciteWords[$scope.index].sounds;
        $scope.letter = $scope.reciteWords[$scope.index].letter;
        $scope.explain = $scope.reciteWords[$scope.index].explain;
        $scope.speech = $scope.reciteWords[$scope.index].speech;
        $scope.hasStudy = true;
    };

    $scope.back = function() {
        var result = confirm("坚持住，否则将从头开始");
        if (result) {
            window.location = 'lexicon-list.html';
        }
    };

    reciteWord.init($scope);
}

var reciteWord = {
    init: function($scope) {
        var idArray = window.location.search.split("=");
        var classId = idArray[1];

        clazz.selectState(classId, function(result) {
            if (!result.selected) {
                // 询问用户是否开始学习该词库，如果确定学习则“选定”该词库，否则返回列表
                if (!confirm("确定学习该词库？")) {
                    window.location = "lexicon-list.html";
                    return false;
                }

                clazz.selectClass(classId);
            }

            // 询问用户今天学习词数
            tip.show('请输入今天要学习的单词数',
                    '<input value="' + result.learnNum + '" />', function() {
                        var reciteWords = [];
                        clazz.genPlans(classId, parseInt($("#tipContent input").val()), function(words) {
                            for (var i = 0, ii = words.length; i < ii; i++) {
                                var para = words[i].para.split(". ");
                                reciteWords.push({
                                    sounds: words[i].phon,
                                    letter: words[i].word,
                                    explain: para[1],
                                    speech: para[0] + "."
                                });
                            }
                            $scope.reciteWords = reciteWords;
                            $scope.sounds = $scope.reciteWords[0].sounds;
                            $scope.letter = $scope.reciteWords[0].letter;
                            $scope.explain = $scope.reciteWords[0].explain;
                            $scope.speech = $scope.reciteWords[0].speech;
                            $scope.$apply();
                        });
                    });
        });
    }
};
