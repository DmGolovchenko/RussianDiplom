app.factory('WebServices', ['$resource', function ($resource) {
    var apiUrl = '/api/';
    return {         
        users: $resource(apiUrl + 'user/:action', {},
            {
                loginUser: { method: 'GET', params: { action: 'loginUser' }, isArray: false },
                register: { method: 'GET', params: { action: 'register' }, isArray: false }
            })        
    };
}]);