var app = angular.module('HomeModule', ['ngResource', 'ngMaterial']);

app.controller('homeCtrl', ['$scope', 'WebServices',
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