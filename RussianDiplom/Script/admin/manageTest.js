app.controller('manageTestCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {

       // Получим все вопросы
       $scope.getQuestions = function () {
           webServices.admin.getQuestions(
                {},
                function success(value) {
                    $scope.Questions = value;
                    $scope.clearInput();
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                });
       }
       $scope.getQuestions();

       //Получим все классы
       $scope.getClasses = function () {
           webServices.admin.getClasses(
               {},
               function success(value) {
                   $scope.Classes = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }
       $scope.getClasses();

       //Получим все темы
       $scope.getThemes = function () {
           webServices.admin.getThemes(
               {},
               function success(value) {
                   $scope.Themes = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }
       $scope.getThemes();

       //Получим все типы
       $scope.getTypes = function () {
           webServices.admin.getQuestionTypes(
               {},
               function success(value) {
                   $scope.Types = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }
       $scope.getTypes();      

       $scope.clearInput = function () {
           $scope.newThemeSynonym = '';
       }


   }]);