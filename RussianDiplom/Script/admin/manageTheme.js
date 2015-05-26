app.controller('manageThemeCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.theme = {};
       $scope.theme.Themes = [];
       $scope.theme.Empty = true;

       // Получаем все темы
       $scope.theme.getThemes = function () {           
           webServices.admin.getThemes(
                {},
                function success(value) {
                    if (value.length) {
                        $scope.theme.Empty = false;
                    } else {
                        $scope.theme.Empty = true;
                    }
                    $scope.theme.Themes = value;
                    $scope.theme.clearInput();                   
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');                    
                });
       }      

       //Получим все классы, которые есть
       $scope.theme.getClasses = function () {           
           webServices.admin.getClasses(
               {},
               function success(value) {
                   $scope.theme.Classes = value;                  
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
               });
       }

       $scope.theme.getData = function () {
           $scope.theme.inProcess = true;
           $scope.theme.getThemes();
           $scope.theme.getClasses();           
           $scope.theme.inProcess = false;
       };

       $scope.theme.getData();

       // Добавляем новую тему
       $scope.theme.addTheme = function () {
           if ($scope.theme.newThemeSynonym && $scope.theme.newThemeId) {
               $scope.theme.inProcess = true;
               webServices.admin.addTheme(
                   {
                       synonym : $scope.theme.newThemeSynonym,
                       classId: $scope.theme.newThemeId
                   },
                   function success(value) {
                       alert('Тема успешно добавлена');
                       $scope.theme.getData();
                   },
                   function error(err) {
                       alert('Извините. Произошла ошибка при обновлении данных');
                   });
           } else {
               alert('Сначала заполните поля');
           }
       }

       // Удаляем тему
       $scope.theme.removeTheme = function (index) {
           $scope.theme.inProcess = true;
           webServices.admin.removeTheme(
               {
                   id: $scope.theme.Themes[index].Id
               },
               function success(value) {
                   alert('Тема успешно удалена');
                   $scope.theme.getData();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при удалении данных');
               });
       }

       $scope.theme.clearInput = function() {
           $scope.theme.newThemeSynonym = '';
       }


   }]);