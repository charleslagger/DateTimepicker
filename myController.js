var app = angular.module("myApp", []);
app.controller('myCtrl', function($scope) {
    $scope.inputText = '';
    $scope.searchTime = function(input) {
        console.log('==>>Hehe');
    };
});