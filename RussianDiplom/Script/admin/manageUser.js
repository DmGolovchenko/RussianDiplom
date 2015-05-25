var app = angular.module('manageUserModule', ['ngResource']);

app.controller('manageUserCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {

       //$scope.Users = [];

       // Получаем всех пользователей
       $scope.getUsers = function () {
           webServices.admin.getUsers(
                {},
                function success(value) {
                    $scope.Users = value;
                    $scope.clearInput();
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                });
       }
       $scope.getUsers();

       //Получим все роли
       $scope.getRoles = function () {
           webServices.admin.getRoles(
               {},
               function success(value) {
                   $scope.Roles = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }
       $scope.getRoles();     

       // Обновляем роль пользователя
       $scope.updateUserRole = function (index) {
           webServices.admin.updateUserRole(
               {
                   id: $scope.Themes[index].Id
               },
               function success(value) {
                   alert('Тема успешно удалена');
                   $scope.getData();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при удалении данных');
               });
       }

       $scope.clearInput = function () {
           $scope.newThemeSynonym = '';
       }


   }]);