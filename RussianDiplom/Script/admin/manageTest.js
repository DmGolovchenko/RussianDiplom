app.controller('manageTestCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.test = {};
       $scope.test.Questions = [];
       $scope.test.Empty = true;

       // Получим все вопросы
       $scope.test.getQuestions = function () {
           webServices.admin.getQuestions(
                {},
                function success(value) {
                    if (value.length) {
                        $scope.test.Empty = false;
                    } else {
                        $scope.test.Empty = true;
                    }
                    $scope.test.Questions = value;
                    $scope.test.clearInput();
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                });
       }         

       //Получим все классы
       $scope.test.getClasses = function () {
           webServices.admin.getClasses(
               {},
               function success(value) {
                   $scope.test.Classes = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }       

       //Получим все темы
       $scope.test.getThemes = function () {
           webServices.admin.getThemes(
               {},
               function success(value) {
                   $scope.test.Themes = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }       

       //Получим все типы
       $scope.test.getTypes = function () {
           webServices.admin.getQuestionTypes(
               {},
               function success(value) {
                   $scope.test.Types = value;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }

       $scope.test.getData = function () {
           $scope.test.inProcess = true;
           $scope.test.getQuestions();
           $scope.test.getClasses();
           $scope.test.getThemes();
           $scope.test.getTypes();
           $scope.test.inProcess = false;
       }
       $scope.test.getData();


       $scope.test.clearInput = function () {
           $scope.test.newThemeSynonym = '';
       }

       $scope.test.generate4EmptyTestAnswers = function () {
           $scope.test.testAnswers = [];
           for (var i = 0; i < 2; i++) {
               var emptyTestAnswer = { Text: '', IsRight: false };               
               $scope.test.testAnswers.push(emptyTestAnswer);
           }           
       }
       $scope.test.generate4EmptyTestAnswers();

       $scope.test.addEmptyTestAnswers = function () {
           var emptyTestAnswer = { Text: '', IsRight: false };
           $scope.test.testAnswers.push(emptyTestAnswer);
       }

       $scope.test.createTestQuestion = function() {
           webServices.admin.createTestQuestion(
               {
                   themeId: $scope.test.theme,
                   question: $scope.test.questionText,
                   answers : $scope.test.testAnswers
               },
               function success(value) {
                   $scope.test.getQuestions();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при обновлении данных');
               });
       }


   }]);