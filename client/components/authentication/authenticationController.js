(function () {
    'use strict';

    angular.module('Controllers')
        .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.$inject = ['AuthService', 'UserService', '$state', '$rootScope', 'toastr'];

    function AuthCtrl(AuthService, UserService, $state, $rootScope, toastr) {
        var vm = this;

        vm.login = function () {
            AuthService.logIn(vm.name, vm.password)
                .then(function (response) {
                    if (response.status == 200) {
                        UserService.add(response.user.name, response.user.password);
                        toastr.success(response.message);
                        $('#loginModal').css('display', 'none');
                        $state.go('user');
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        };
        vm.register = function () {
            AuthService.register(vm.regName, vm.regPass)
                .then(function (response) {
                    if (response.status == 200) {
                        UserService.add(response.user.name, response.user.password);
                        toastr.success(response.message);
                        $('#registerModal').css('display', 'none');
                        $state.go('user');
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        };

        vm.logout = function () {
            AuthService.logOut()
                .then(function (response){
                    if (response.status == 200) {
                        UserService.remove();
                        toastr.success(response.message);
                    }
                    else {
                        toastr.error(response);
                    }
                });
        }
    }
})();