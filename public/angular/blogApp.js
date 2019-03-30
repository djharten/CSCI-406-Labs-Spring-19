angular.module('blogApp' , []);

var myController = function($scope) {
    $scope.myInput = "Worlddddd";
};

angular
    .module('blogApp')
    .controller('myController', myController);