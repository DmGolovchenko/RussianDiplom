var app = angular.module('TestingModule', ['ngResource', 'ngMaterial']);

app.controller('testingCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       var maxlevel = 12;
       $scope.bonus = {};
       $scope.bonus.level = 0;

       $scope.btnUpLevel = function () {
           if ($scope.bonus.level != maxlevel) {
               $scope.bonus.level++;
           } else {
               alert('Вы достигли максимального уровня');
           }
       }
   }]);