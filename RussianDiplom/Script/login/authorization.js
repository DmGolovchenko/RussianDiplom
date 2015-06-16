var app = angular.module('authorizationModule', ['ngResource', 'ngMaterial']);

app.controller('authorizationCtrl', ['$scope', 'WebServices', '$location','$window',
   function ($scope, webServices, $location, $window) {
       $scope.user = {};
       $scope.register = {};


       $scope.authorize = function() {
           webServices.users.loginUser(
                {
                    username: $scope.user.login,
                    password: $scope.user.password
                },
                function success(val) {
                    if (val[0] == '0') {
                        // Администратор
                        $window.location.href = '/Template/Admin/AdminHome.html';
                    }
                    if (val[0] == '1') {
                        // Обычный пользователь
                        $window.location.href = '/Template/User/UserHome.html';
                    }                    
                },
                function error(err) {
                    alert('No');
                }
            );
       }

       $scope.registeration = function () {          
            webServices.users.register(
                {
                    username: $scope.user.register.nickname,
                    password: $scope.user.register.password
                },
                function success(value) {
                    $window.location.href = '/Template/User/UserHome.html';
                },
                function error(err) {
                    alert('No');
                }
            );
       }       
}]);
