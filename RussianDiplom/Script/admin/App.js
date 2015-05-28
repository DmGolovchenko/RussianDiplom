var App = angular.module('drag-and-drop', ['ngDragDrop']);

App.controller('oneCtrl', function ($scope, $timeout) {
    $scope.images = [{ 'thumb': '1.png' }, { 'thumb': '2.png' }, { 'thumb': '3.png' }, { 'thumb': '4.png' }]
    $scope.list1 = [];
    angular.forEach($scope.images, function (val, key) {
        $scope.list1.push({});
    });
    $scope.list2 = [
      { 'title': 'KnockoutJS', 'drag': true },
      { 'title': 'EmberJS', 'drag': true },
      { 'title': 'BackboneJS', 'drag': true },
      { 'title': 'AngularJS', 'drag': true }
    ];   
});