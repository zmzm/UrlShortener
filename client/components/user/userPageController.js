(function () {
    'use strict';

    angular.module('Controllers')
        .controller('UserPageCtrl', UserPageCtrl);

    UserPageCtrl.$inject = ['UserPageService', '$rootScope'];

    function UserPageCtrl(UserPageService, $rootScope) {
        var vm = this;

        vm.short = function () {
            console.log(vm.aboutUrl);
            UserPageService.shortUrl($rootScope.user.id, vm.url, vm.aboutUrl)
        }
    }
})();