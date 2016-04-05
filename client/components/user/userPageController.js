(function () {
    'use strict';

    angular.module('Controllers')
        .controller('UserPageCtrl', UserPageCtrl);

    UserPageCtrl.$inject = ['UserPageService', '$rootScope', 'toastr'];

    function UserPageCtrl(UserPageService, $rootScope, toastr) {
        var vm = this;
        vm.currentPage = 1;
        vm.itemsPerPage = 10;
        vm.urls = [];

        vm.tags = [
            {text: 'just'},
            {text: 'some'},
            {text: 'cool'},
            {text: 'tags'}
        ];

        loadData();

        function loadData(page) {
            UserPageService.pagination(page, $rootScope.user.id)
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
            loadData(vm.currentPage);
        };
        vm.refresh = function () {
            loadData();
        };

        vm.urlInfo = function (url) {
            vm.url = url;
        };

        vm.urlUpdate = function () {
            UserPageService.updateUrl(vm.url)
                .then(function (response) {
                    if (response.status == 200) {
                        toastr.success(response.message);
                        $('#formModal').modal('hide');
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        };

        vm.short = function () {
            UserPageService.shortUrl($rootScope.user.id, vm.urlName, vm.aboutUrl, vm.tags)
                .then(function (response) {
                    if (response.status == 200) {
                        toastr.success(response.message);
                        loadData();
                    }
                    else {
                        toastr.error(response.message);
                    }
                });
        };
    }
})();