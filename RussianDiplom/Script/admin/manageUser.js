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
                        if (item.Role) {
                            if (item.Role.Name == 'Administrator') {
                                item.isAdmin = true;
                                item.isSimpleUser = false;
                            } else {
                                item.isSimpleUser = true;
                                item.isAdmin = false;
                            }
                        }                        
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
       $scope.user.updateUserRole = function () {
           $scope.user.inProcess = true;
           webServices.admin.updateUserRole(
               {
                   userId: $scope.user.editableUserId,
                   roleId: $scope.user.editRole
               },
               function success(value) {
                   alert('Роль успешно изменена');
                   $scope.user.getUsers();
               },
               function error(err) {
                   alert('Извините. Произошла ошибка при изменении данных');
               });
       }

       // Редактируем роль пользователя
       $scope.user.editUserRole = function (id) {
           $scope.user.cancleEditUserRole();
           $scope.user.editableUserId = id;
           for (var i = 0; i < $scope.user.AdminUsers.length; i++) {
               if ($scope.user.AdminUsers[i].Id == id) {
                   $scope.user.AdminUsers[i].isEdit = true;                   
               }        
           }                           
       }

       // Отменяем редактирование роли пользователя
       $scope.user.cancleEditUserRole = function () {
           if ($scope.user.editableUserId) {
               for (var i = 0; i < $scope.user.AdminUsers.length; i++) {
                   if ($scope.user.AdminUsers[i].Id == $scope.user.editableUserId) {
                       $scope.user.AdminUsers[i].isEdit = false;
                       $scope.user.editableUserId = null;
                       break;
                   }
               }              
           }           
       }

       $scope.user.clearInput = function () {
           $scope.user.newThemeSynonym = '';
       }


   }]);