var app = angular.module('MyAdminHomeModule', ['ngResource', 'ngMaterial', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/Template/Admin/AdminTabs.html',
            controller: 'MyAdminHomeCtrl'
        });      

    $locationProvider.html5Mode(false).hashPrefix('!');
});

app.controller('MyAdminHomeCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.template= {
           'user': '/Template/Admin/ManageUser.html',
           'theme': '/Template/Admin/ManageTheme.html',
           'class': '/Template/Admin/ManageClass.html',
           'test': '/Template/Admin/ManageTest.html'
       }       
   }]);