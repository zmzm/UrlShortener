(function () {
    'use strict';

    angular.module('Controllers')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['UserPageService', 'HomeService', '$rootScope', 'toastr'];

    function HomeCtrl(UserPageService, HomeService, toastr) {
        var vm = this;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.urls = [];

        loadData();

        function loadData(page) {
            UserPageService.pagination(page)
                .then(function (response) {
                    if (response.status == 200) {
                        vm.urls = response.urls;
                        vm.totalItems = response.totalCount;
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        };

        vm.refresh = function () {
            loadData();
        };

        vm.findByTag = function (tag) {
            delete tag.$$hashKey;
            HomeService.getByTag(tag)
                .then(function (response) {
                    if (response.status == 200) {
                        vm.urls = response.urls;
                        vm.totalItems = response.totalCount;
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        };

        vm.pageChanged = function () {
            loadData(vm.currentPage);
        };
    }
})();