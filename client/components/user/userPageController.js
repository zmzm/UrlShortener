(function () {
    'use strict';

    angular.module('Controllers')
        .controller('UserPageCtrl', UserPageCtrl);

    UserPageCtrl.$inject = ['UserPageService', '$rootScope', 'toastr'];

    function UserPageCtrl(UserPageService, $rootScope, toastr) {
        var vm = this;
        vm.currentPage = 1;
        vm.urls = [];

        loadData();

        function loadData() {
            UserPageService.pagination($rootScope.user.id)
                .then(function (response) {
                    if (response.status == 200) {
                        vm.urls = response.urls;
                        vm.totalItems = response.totalCount;
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        }

        vm.pageChanged = function () {
            console.log(vm.currentPage);
        };

        vm.short = function () {
            UserPageService.shortUrl($rootScope.user.id, vm.url, vm.aboutUrl)
                .then(function (response) {
                    if (response.status == 200) {
                        toastr.success(response.message);
                        loadData();
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        }
    }
})();