var app = angular.module('MyAdminHomeModule', ['ngResource', 'ngMaterial']);

app.controller('MyAdminHomeCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.loginClick = function () {
           var user = angular.element('#user').val();
           var pass = angular.element('#password').val();

           if (user != null && pass != null) {
               webServices.users.loginUser(
                   {
                       Username: user,
                       Password: pass
                   },
                   function success(value) {
                       location.path("~/Template/AdminHome.html");
                   },
                   function error(err) {
                       alert('No');
                   }
                );
           }
       }
   }]);