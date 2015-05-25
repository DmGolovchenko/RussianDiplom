app.controller('manageClassCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {

       $scope.Classes = [];

       // Получаем все классы и кличество людей
       $scope.getData = function() {           
           webServices.admin.getClasses(
                {},
                function success(value) {
                    $scope.clearInput();
                    $scope.Classes = value;
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                });
       }

       $scope.getData();

       // Добавляем новый класс
       $scope.addClass = function () {
           if ($scope.newClassNumber) {
               webServices.admin.addClass(
                   {
                       classNumber: $scope.newClassNumber
                   },
                   function success(value) {
                       alert('Класс успешно добавлен');
                       $scope.getData();                     
                   },
                   function error(err) {
                       alert('Извините. Произошла ошибка при обновлении данных');
                   });
           } else {
               alert('Сначала заполните поле');
           }
       }

       // Добавляем новый класс
       $scope.removeClass = function (index) {          
            webServices.admin.removeClass(
                {
                    id: $scope.Classes[index].Id
                },
                function success(value) {
                    alert('Класс успешно удалён');
                    $scope.getData();
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при удалении данных');
                });
       }

       $scope.clearInput = function () {
           $scope.newClassNumber = '';
       }


   }]);