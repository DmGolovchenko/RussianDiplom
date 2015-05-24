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
               addTheme: { method: 'GET', params: { action: 'addTheme' }, isArray: false }
           })
    };
}]);