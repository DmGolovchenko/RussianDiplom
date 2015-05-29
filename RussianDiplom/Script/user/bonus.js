var app = angular.module('BonusModule', ['ngResource', 'ngMaterial']);

app.controller('bonusCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.bonus = {};
       $scope.bonus.level = 12;            
   }]);