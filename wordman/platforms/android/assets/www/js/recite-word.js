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
function LexiconCtrl($scope) {
    $scope.lexicons = [{
            title: '四级词汇', 
            count: 1231,
            hasReview: true,
            progress: 50
        }, {
            title: '六级词汇',
            count: 123,
            hasReview: true,
            progress: 90
        }, {
            title: '八级词汇',
            count: 123,
            hasReview: false,
            progress: 0
        }];

    $scope.archive = function() {
        
    };
}

