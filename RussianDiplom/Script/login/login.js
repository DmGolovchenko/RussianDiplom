var app = angular.module('MyLoginModule', ['ngResource','ngRoute']);

app.controller('MainController', ['$scope', 'WebServices', '$location',
   function ($scope, webServices, location) {
       $scope.loginClick = function () {
           var user = angular.element('#user').val();
           var pass = angular.element('#password').val();

           if (user != null && pass != null){
               webServices.users.loginUser(
                   {
                       Username : user,
                       Password : pass
                   },
                   function success(value) {
                       location.path("/AdminHome");                       
                   },
                   function error(err){
                       alert('No');
                   }
                );
           }
       }
   }]);

// Blurred background
var CanvasImage = function (e, t) {
  this.image = t,
  this.element = e,
  this.element.width = this.image.width,
  this.element.height = this.image.height;
  var n = navigator.userAgent.toLowerCase().indexOf("chrome") > -1,
      r = navigator.appVersion.indexOf("Mac") > -1;
  n && r && (this.element.width = Math.min(this.element.width, 1680), this.element.height = Math.min(this.element.height, 1050)),
  this.context = this.element.getContext("2d"),
  this.context.drawImage(this.image, 0, 0)
};
CanvasImage.prototype = {
  blur: function (e) {
    this.context.globalAlpha = .5;
    for (var t = -e; t <= e; t += 2)
    for (var n = -e; n <= e; n += 2)
    this.context.drawImage(this.element, n, t),
    n >= 0 && t >= 0 && this.context.drawImage(this.element, -(n - 1), -(t - 1));
    this.context.globalAlpha = 1
  }
},

$(function () {
  var image, canvasImage, canvas;
  $(".blur").each(function () {
    canvas = this,
    image = new Image,
    image.onload = function () {
      canvasImage = new CanvasImage(canvas, this),
      canvasImage.blur(4)
    },
    image.src = $(this).attr("src");
  });
});
