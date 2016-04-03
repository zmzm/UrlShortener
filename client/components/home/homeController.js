(function () {
    'use strict';

    angular.module('Controllers')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['UserPageService', '$rootScope', 'toastr'];

    function HomeCtrl(UserPageService, toastr) {
        var vm = this;
        vm.currentPage = 1;
        vm.urls = [];

        loadData();

        function loadData() {
            UserPageService.pagination()
                .then(function (response) {
                    if (response.status == 200) {
                        vm.urls = response.urls;
                        console.log(vm.urls)
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
    }
})();