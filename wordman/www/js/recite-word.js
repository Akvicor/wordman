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
    $scope.reciteWords = [{
            sounds: "英 [prəˌnʌnsiˈeɪʃn] 美 [prəˌnʌnsiˈeʃən] ",
            letter: "pronunciation",
            explain: "发音； 读法； 发音方法； 发音方式",
            speech: "n."
        }, {
            sounds: "英 [prəˌnʌnsiˈeɪʃn] 美 [prəˌnʌnsiˈeʃən] ",
            letter: "pronunciation1",
            explain: "发音； 读法； 发音方法； 发音方式",
            speech: "n."
        }, {
            sounds: "英 [prəˌnʌnsiˈeɪʃn] 美 [prəˌnʌnsiˈeʃən] ",
            letter: "pronunciation2",
            explain: "发音； 读法； 发音方法； 发音方式",
            speech: "n."
        }];
    $scope.inputWord = "1";
    $scope.btnText = "清空";
    $scope.index = 1;

    $scope.sounds = $scope.reciteWords[0].sounds;
    $scope.letter = $scope.reciteWords[0].letter;
    $scope.explain = $scope.reciteWords[0].explain;
    $scope.speech = $scope.reciteWords[0].speech;
    $scope.hasStudy = false;

    $scope.mattch = function() {
        if ($scope.inputWord === $scope.letter) {
            $scope.btnText = '下一个';
        } else {
            $scope.btnText = '清空';
        }
    };

    $scope.next = function() {
        $scope.index++;
        $scope.sounds = $scope.reciteWords[$scope.index - 1].sounds;
        $scope.letter = $scope.reciteWords[$scope.index - 1].letter;
        $scope.explain = $scope.reciteWords[$scope.index - 1].explain;
        $scope.speech = $scope.reciteWords[$scope.index - 1].speech;
        $scope.hasStudy = $scope.reciteWords[$scope.index - 1].hasStudy;
    };

    $scope.studyNext = function() {
        if ($scope.index === $scope.reciteWords.length) {
            alert("恭喜你完成该课程的学习");
            window.location = 'lexicon-list.html';
            return false;
        }
        $scope.index++;
        $scope.sounds = $scope.reciteWords[$scope.index - 1].sounds;
        $scope.letter = $scope.reciteWords[$scope.index - 1].letter;
        $scope.explain = $scope.reciteWords[$scope.index - 1].explain;
        $scope.speech = $scope.reciteWords[$scope.index - 1].speech;
        $scope.reciteWords[$scope.index - 2].hasStudy = true;
        $scope.hasStudy = false;
        $scope.inputWord = "";
    };

    $scope.prev = function() {
        $scope.index--;
        $scope.sounds = $scope.reciteWords[$scope.index - 1].sounds;
        $scope.letter = $scope.reciteWords[$scope.index - 1].letter;
        $scope.explain = $scope.reciteWords[$scope.index - 1].explain;
        $scope.speech = $scope.reciteWords[$scope.index - 1].speech;
        $scope.hasStudy = true;
    };

    $scope.back = function() {
        var result = confirm("坚持住，否则将从头开始");
        if (result) {
            window.location = 'lexicon-list.html';
        }
    };
}

