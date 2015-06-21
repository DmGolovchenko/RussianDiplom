var app = angular.module('TestingModule', ['ngResource', 'ngMaterial']);

app.controller('testingCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       // Получим информацию о пользователе
       $scope.getUserInfo = function () {
           webServices.users.getUserInfo(
                {},
                function success(value) {
                    $scope.userInfo = value;
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                });
       }
       $scope.getUserInfo();
   }]);