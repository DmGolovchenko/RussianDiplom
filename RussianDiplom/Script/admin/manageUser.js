app.controller('manageUserCtrl', ['$scope', 'WebServices',
   function ($scope, webServices) {
       $scope.user = {};
       $scope.user.AdminUsers = [];
       $scope.user.Empty = true;

       // Получаем всех пользователей
       $scope.user.getUsers = function () {
           $scope.user.inProcess = true;
           webServices.admin.getUsers(
                {},
                function success(value) {
                    if (value.length) {
                        $scope.user.Empty = false;
                    } else {
                        $scope.user.Empty = true;
                    }                   
                    $scope.user.AdminUsers = value;
                    angular.forEach($scope.user.AdminUsers, function (item) {
                        item.isEdit = false;
                    });
                    $scope.user.clearInput();
                    $scope.user.inProcess = false;
                },
                function error(err) {
                    alert('Извините. Произошла ошибка при загрузке данных');
                    $scope.user.inProcess = false;
                });
       }
       $scope.user.getUsers();

       //Получим все роли
       $scope.user.getRoles = function () {
           $scope.user.inProcess = true;
           webServices.admin.getRoles(
               {},
               function success(value) {
                   $scope.user.Roles = value;
                   $scope.user.inProcess = false;
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при загрузке данных');
                   $scope.user.inProcess = false;
               });
       }
       $scope.user.getRoles();     

       // Обновляем роль пользователя
       $scope.user.updateUserRole = function (index) {
           webServices.admin.updateUserRole(
               {
                   id: $scope.user.Themes[index].Id
               },
               function success(value) {
                   alert('Роль успешно изменена');
                   $scope.user.getData();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при удалении данных');
               });
       }

       // Редактируем роль пользователя
       $scope.user.editUserRole = function (id) {
           $scope.user.cancleEditUserRole();
           $scope.editableUserId = id;
           for (var i = 0; i < $scope.user.AdminUsers.length; i++) {
               if ($scope.user.AdminUsers[i].Id == id) {
                   $scope.user.AdminUsers[i].isEdit = true;
               } else {
                   $scope.user.AdminUsers[i].isEdit = false;
               }
           }           
           $scope.user.edit.Roles = 'Administrator';          
       }

       // Отменяем редактирование роли пользователя
       $scope.user.cancleEditUserRole = function () {
           if ($scope.editableUserId) {
               for (var i = 0; i < $scope.user.AdminUsers.length; i++) {
                   if ($scope.user.AdminUsers[i].Id == $scope.editableUserId) {
                       $scope.user.AdminUsers[i].isEdit = false;
                       $scope.editableUserId = null;
                       break;
                   }
               }              
           }           
       }

       $scope.user.clearInput = function () {
           $scope.user.newThemeSynonym = '';
       }


   }]);