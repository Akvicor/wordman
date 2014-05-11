

function TodoCtrl($scope) {
    $scope.lexicons = [{
            title: 'learn angular', 
            count: 1231,
            hasReview: true,
            progress: 50
        }, {
            title: 'build an angular app',
            count: 123,
            hasReview: true,
            progress: 90
        }, {
            title: 'build an angular app',
            count: 123,
            hasReview: false,
            progress: 0
        }];

    $scope.archive = function() {
        
    };
}

