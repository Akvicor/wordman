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
 * @version 1.0.0.1, Dec 16, 2014
 * @since 1.0.0
 */
function DictCtrl($scope) {
    $scope.back = function () {
        window.location = '#lexicon-list';
    };

    $scope.remove = function (wordId, classId) {
        clazz.removeNewWord(wordId, classId);
    };

    clazz.getNewWords(function (data) {
        $scope.dicts = data;
        $scope.$apply();
    });
}

