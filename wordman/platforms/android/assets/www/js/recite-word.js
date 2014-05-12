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
    $scope.inputWord = "";
    $scope.btnText = "1";
    $scope.word = "Vanessa";

    $scope.mattch = function() {
         if ($scope.inputWord === $scope.word) {
             $scope.btnText = '下一个';
         } else {
              $scope.btnText = '清空';
         }
    };
    
    $scope.back = function() {
         var result = confirm("坚持住，否则将从头开始");
         if (result) {
             window.location = 'lexicon-list.html';
         }
    };
}

