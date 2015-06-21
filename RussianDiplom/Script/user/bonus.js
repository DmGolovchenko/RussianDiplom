var app = angular.module('BonusModule', ['ngResource', 'ngMaterial']);

app.controller('bonusCtrl', ['$scope', 'WebServices','$filter',
   function ($scope, webServices, $filter) {
       var maxlevel = 12;
       $scope.levelCost = [
           { levelNumber: 1, Cost: 1000 },
           { levelNumber: 2, Cost: 2000 },
           { levelNumber: 3, Cost: 3000 },
           { levelNumber: 4, Cost: 4000 },
           { levelNumber: 5, Cost: 5000 },
           { levelNumber: 6, Cost: 6000 },
           { levelNumber: 7, Cost: 7000 },
           { levelNumber: 8, Cost: 8000 },
           { levelNumber: 9, Cost: 9000 },
           { levelNumber: 10, Cost: 10000 },
           { levelNumber: 11, Cost: 11000 },
           { levelNumber: 12, Cost: 12000 },
       ];

       $scope.btnUpLevel = function () {           
           if ($scope.userInfo.Level != maxlevel) {
               var level;
               var userLevel = $scope.userInfo.Level + 1;
               for (var i = 0; i < $scope.levelCost.length; i++) {
                   if ($scope.levelCost[i].levelNumber === userLevel) {
                       level = $scope.levelCost[i];
                       break;
                   }
               }               
               if ($scope.userInfo.Money >= level.Cost) {
                   $scope.userInfo.Level++;
                   $scope.userInfo.Money -= level.Cost;
               } else {
                   alert('Нужно немного позаниматься');
               }
           } else {
               alert('Вы достигли максимального уровня');
           }
       }

       // Получим информацию о пользователе
       $scope.getUserInfo = function () {         
           webServices.users.getUserInfo(
                {},
                function success(value) {
                    $scope.userInfo = value;
                    $scope.userInfo.Level = 0;
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');                    
                });
       }
       $scope.getUserInfo();
   }]);