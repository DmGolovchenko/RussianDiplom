app.controller('manageClassCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.class = {};
       $scope.class.Classes = [];
       $scope.class.Empty = true;

       // Получаем все классы и кличество людей
       $scope.class.getData = function () {
           $scope.class.inProcess = true;
           webServices.admin.getClasses(
                {},
                function success(value) {
                    if (value.length) {
                        $scope.class.Empty = false;
                    } else {
                        $scope.class.Empty = true;
                    }
                    $scope.class.clearInput();
                    $scope.class.Classes = value;
                    $scope.class.inProcess = false;
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                    $scope.class.inProcess = false;
                });
       }

       $scope.class.getData();

       // Добавляем новый класс
       $scope.class.addClass = function () {           
           if ($scope.class.newClassNumber) {
               $scope.class.inProcess = true;
               webServices.admin.addClass(
                   {
                       classNumber: $scope.class.newClassNumber
                   },
                   function success(value) {
                       alert('Класс успешно добавлен');
                       $scope.class.getData();
                   },
                   function error(err) {
                       alert('Извините. Произошла ошибка при обновлении данных');
                       $scope.class.inProcess = false;
                   });
           } else {
               alert('Сначала заполните поле');
           }
       }

       // Добавляем новый класс
       $scope.class.removeClass = function (index) {
           $scope.class.inProcess = true;
            webServices.admin.removeClass(
                {
                    id: $scope.class.Classes[index].Id
                },
                function success(value) {
                    alert('Класс успешно удалён');
                    $scope.class.getData();
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при удалении данных');
                    $scope.class.inProcess = false;
                });
       }

       $scope.class.clearInput = function () {
           $scope.class.newClassNumber = '';
       }


   }]);