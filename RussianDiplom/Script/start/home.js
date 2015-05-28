var app = angular.module('MyStartHomeModule', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: "/Template/ErrorPage.html"
    })
    .otherwise({ redirectTo: '/Template/ErrorPage.html' });

    $locationProvider.html5Mode(false).hashPrefix('!');
});