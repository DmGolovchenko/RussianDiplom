app.controller('manageTestCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.test = {};
       $scope.test.Questions = [];
       $scope.test.Empty = true;

       // Получим все вопросы
       $scope.test.getQuestions = function () {
           $scope.test.inProcess = true;
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
                    $scope.test.inProcess = false;
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
           $scope.test.theme = $scope.test.class = $scope.test.type = $scope.test.questionText = '';
           $scope.test.generate4EmptyTestAnswers();
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

       $scope.test.removeQuestion = function (id) {
           $scope.test.inProcess = true;
           webServices.admin.removeQuestion(
               {
                   id: id
               },
               function success(value) {
                   $scope.test.getData();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при обновлении данных');
                   $scope.test.inProcess = false;
               });
       }

       $scope.test.createTestQuestion = function () {
           $scope.test.inProcess = true;
           webServices.admin.createTestQuestion(
               {
                   ThemeId: $scope.test.theme,
                   ClassId: $scope.test.class,
                   TypeName: $scope.test.type,
                   Question: $scope.test.questionText,
                   Answers : $scope.test.testAnswers
               },
               function success(value) {
                   $scope.test.getData();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при обновлении данных');
                   $scope.test.inProcess = false;
               });
       }


   }]);