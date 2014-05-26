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
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.2.1.2, May 26, 2014
 */
function ReciteWordCtrl($scope, $routeParams) {
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
        $scope.hasStudy = $scope.reciteWords[$scope.index].hasStudy;
        $scope.inputWord = "";
        if ($scope.hasStudy) {
            keyboard.hide();
        } else {
            keyboard.show();
        }
    };

    $scope.studyNext = function() {
        if ($scope.btnText === "清空") {
            $scope.inputWord = "";
        } else {
            if ($scope.index === $scope.reciteWords.length - 1) {
                alert('已完该课程的学习');

                clazz.finishLearn(reciteWord.currentClassId, reciteWord.currentPlanId);

                window.location = '#lexicon-list';
                return false;
            }
            $scope.index++;
            $scope.sounds = $scope.reciteWords[$scope.index].sounds;
            $scope.letter = $scope.reciteWords[$scope.index].letter;
            $scope.explain = $scope.reciteWords[$scope.index].explain;
            $scope.reciteWords[$scope.index - 1].hasStudy = true;
            $scope.hasStudy = false;
            $scope.inputWord = "";
        }
        $("#reciteInput").focus();
    };

    $scope.prev = function() {
        $scope.index--;
        $scope.sounds = $scope.reciteWords[$scope.index].sounds;
        $scope.letter = $scope.reciteWords[$scope.index].letter;
        $scope.explain = $scope.reciteWords[$scope.index].explain;
        $scope.hasStudy = true;
        $scope.inputWord = "";
        keyboard.hide();
    };

    $scope.back = function() {
        if (confirm("要重头开始吗?")) {
            window.location = '#lexicon-list';
        }
    };

    reciteWord.init($scope, $routeParams.classId);
}

var reciteWord = {
    currentPlanId: "",
    currentClassId: "",
    init: function($scope, classId) {
        reciteWord.currentClassId = classId;

        clazz.selectState(classId, function(result) {
            if (!result.selected) { // 没有“选定”该词库
                // 首次学习需要用户设置对该词库的学习词数
                tip.show(undefined,
                        '<input class="input" value="' + result.learnNum + '" />', function() {
                            if (/^[0-9]*[1-9][0-9]*$/.test($("#tipContent input").val())) {
                                var count = parseInt($("#tipContent input").val());
                                if (count < 20 || count > 100) {
                                    alert("请输入20~100的整数");
                                    $("#tipContent > .input").focus();
                                    return false;
                                }
                            } else {
                                alert("请输入20~100的整数");
                                $("#tipContent > .input").focus();
                                return false;
                            }

                            clazz.getLearnPlans(classId, count, function(result) {
                                // 选定词库
                                clazz.selectClass(classId);

                                reciteWord.currentPlanId = result.planId;

                                var words = result.words;
                                var reciteWords = [];

                                for (var i = 0, ii = words.length; i < ii; i++) {
                                    reciteWords.push({
                                        letter: words[i].word,
                                        explain: words[i].para,
                                        sounds: words[i].phon
                                    });
                                }

                                $scope.reciteWords = reciteWords;
                                $scope.sounds = $scope.reciteWords[0].sounds;
                                $scope.letter = $scope.reciteWords[0].letter;
                                $scope.explain = $scope.reciteWords[0].explain;
                                $scope.$apply();
                                // 键盘按键展现及回调
                                keyboard.show(function(val) {
                                    $scope.inputWord = val;
                                    $scope.mattch();
                                    $scope.$apply();
                                });
                            });
                            return true;
                        });
            } else { // 已经“选定”该词库
                // 键盘按键展现及回调
                keyboard.show(function(val) {
                    $scope.inputWord = val;
                    $scope.mattch();
                    $scope.$apply();
                });

                clazz.getLearnPlans(classId, parseInt($("#tipContent input").val()), function(result) {
                    reciteWord.currentPlanId = result.planId;

                    var words = result.words;
                    var reciteWords = [];

                    for (var i = 0, ii = words.length; i < ii; i++) {
                        reciteWords.push({
                            sounds: words[i].phon,
                            letter: words[i].word,
                            explain: words[i].para
                        });
                    }

                    $scope.reciteWords = reciteWords;
                    $scope.sounds = $scope.reciteWords[0].sounds;
                    $scope.letter = $scope.reciteWords[0].letter;
                    $scope.explain = $scope.reciteWords[0].explain;
                    $scope.$apply();
                });
            }
        });
    }
};
