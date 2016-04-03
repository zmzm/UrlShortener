(function () {
    'use strict';

    angular.module('Services')
        .service('UserService', UserService);

    UserService.$inject = ['$rootScope'];

    function UserService($rootScope) {
        var user = {
            id: '',
            password: '',
            isAuthorized: false
        };

        return {
            add: function (username, id) {
                if (!user || !user.isAuthorized) {
                    user.isAuthorized = true;
                    user.id = id;
                    user.username = username;
                    if (!localStorage['user.id']) {
                        localStorage['user.username'] = user.username;
                        localStorage['user.id'] = user.id;
                    }
                    $rootScope.user = user;
                }
            },
            remove: function () {
                if (user.isAuthorized) {
                    user.isAuthorized = false;
                    user.username = '';
                    user.id = '';
                    if (localStorage['user.username']) {
                        localStorage.removeItem('user.username');
                        localStorage.removeItem('user.id');
                    }
                    if ($rootScope.user) {
                        delete $rootScope.user;
                    }
                }
            },
            user: user
        };
    }
})();