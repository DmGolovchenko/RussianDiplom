var app = angular.module('myHomeApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/AdminHome', {
            templateUrl: '/Template/AdminHome.html',
            controller: 'AdminHomeController'
        });        

    $locationProvider.html5Mode(false).hashPrefix('!');
});

//app.controller('AdminHomeController', function($scope) {
//    $scope.message = 'ADMIN_PAGE';
//})