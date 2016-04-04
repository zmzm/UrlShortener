(function () {
    'use strict';

    angular.module('Services')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http'];

    function AuthService($http) {
        var login = false;

        return ({
            logIn: logIn,
            logOut: logOut,
            register: register,
            isLoggedIn: isLoggedIn
        });

        function logIn(name, password) {
            return $http.post('/user/login', {username: name, password: password})
                .then(function handleSuccess(response) {
                    login = true;
                    return {
                        status: response.status,
                        message: response.data.status,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    login = false;
                    return {
                        status: response.status,
                        message: response.data.err.message
                    };
                });
        }

        function logOut() {
            return $http.get('/user/logout')
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.data.status
                    };
                }, function handleError(response) {
                    return response.statusText;
                });
        }

        function register(name, password) {
            return $http.post('user/register', {
                username: name,
                password: password
            })
                .then(function handleSuccess(response) {
                    login = true;
                    return {
                        status: response.status,
                        message: response.data.status,
                        user: response.data.user
                    };
                }, function handleError(response) {
                    login = false;
                    return {
                        status: response.status,
                        message: response.data.err.message
                    };
                });
        }

        function isLoggedIn() {
            return login;
        }
    }
})();