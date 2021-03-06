﻿var app = angular.module('ProgressModule', ['ngResource', 'ngMaterial']);

app.controller('progressCtrl', ['$scope', 'WebServices',
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