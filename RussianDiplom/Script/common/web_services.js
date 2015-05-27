app.factory('WebServices', ['$resource', function ($resource) {
    var apiUrl = '/api/';
    return {         
        users: $resource(apiUrl + 'user/:action', {},
            {
                loginUser: { method: 'GET', params: { action: 'loginUser' }, isArray: false },
                register: { method: 'GET', params: { action: 'register' }, isArray: false }
            }),
        admin: $resource(apiUrl + 'admin/:action', {},
           {
               getClasses: { method: 'GET', params: { action: 'getClasses' }, isArray: true },
               addClass: { method: 'GET', params: { action: 'addClass' }, isArray:false},
               removeClass: { method: 'GET', params: { action: 'removeClass' }, isArray: false },

               getThemes: { method: 'GET', params: { action: 'getThemes' }, isArray: true },
               removeTheme: { method: 'GET', params: { action: 'removeTheme' }, isArray: false },
               addTheme: { method: 'GET', params: { action: 'addTheme' }, isArray: false },

               getUsers: { method: 'GET', params: { action: 'getUsers' }, isArray: true },
               updateUserRole: { method: 'GET', params: { action: 'updateUserRole' }, isArray: false },
               getRoles: { method: 'GET', params: { action: 'getRoles' }, isArray: true },

               getQuestionTypes: { method: 'GET', params: { action: 'getQuestionTypes' }, isArray: true },
               getQuestions: { method: 'GET', params: { action: 'getQuestions' }, isArray: true },
               createTestQuestion: { method: 'POST', params: { action: 'createTestQuestion' } },
               removeQuestion: { method: 'GET', params: { action: 'removeQuestion' }, isArray: false }
           })
    };
}]);