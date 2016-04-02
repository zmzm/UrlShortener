(function () {
    'use strict';

    angular.module('Services')
        .service('UserService', UserService);

    UserService.$inject = ['$rootScope'];

    function UserService($rootScope) {
        var user = {
            username: '',
            password: '',
            isAuthorized: false
        };

        return {
            add: function (username, password) {
                if (!user || !user.isAuthorized) {
                    user.isAuthorized = true;
                    user.username = username;
                    user.password = password;
                    if (!localStorage['user.username']) {
                        localStorage['user.username'] = user.username;
                        localStorage['user.password'] = user.password;
                    }
                    $rootScope.user = user;
                }
            },
            remove: function () {
                if (user.isAuthorized) {
                    user.isAuthorized = false;
                    user.username = '';
                    user.password = '';
                    if (localStorage['user.username']) {
                        localStorage.removeItem('user.username');
                        localStorage.removeItem('user.password');
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