var app = angular.module('manageThemeModule', ['ngResource']);

app.controller('manageThemeCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {

       $scope.Themes = [];

       // Получаем все темы
       $scope.getData = function () {
           webServices.admin.getThemes(
                {},
                function success(value) {
                    $scope.Themes = value;
                    $scope.clearInput();
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                });
       }
       $scope.getData();

       //Получим все классы, которые есть
       $scope.getClasses = function() {
           webServices.admin.getClasses(
               {},
               function success(value) {
                   $scope.Classes = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }
       $scope.getClasses();

       // Добавляем новый класс
       $scope.addTheme = function () {
           if ($scope.newThemeSynonym && $scope.classes) {
               webServices.admin.addTheme(
                   {
                       synonym : $scope.newThemeSynonym,
                       classId : $scope.classes.Id
                   },
                   function success(value) {
                       alert('Тема успешно добавлена');
                       $scope.getData();
                   },
                   function error(err) {
                       alert('Извините. Произошла ошибка при обновлении данных');
                   });
           } else {
               alert('Сначала заполните поля');
           }
       }

       // Удаляем тему
       $scope.removeTheme = function (index) {
           webServices.admin.removeTheme(
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

       $scope.clearInput = function() {
           $scope.newThemeSynonym = '';
       }


   }]);