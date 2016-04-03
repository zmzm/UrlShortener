(function () {
    'use strict';

    angular.module('Services')
        .service('UserPageService', UserPageService);

    UserPageService.$inject = ['$http'];

    function UserPageService($http) {
        return ({
            shortUrl: shortUrl
        });

        function shortUrl(userId, url, about) {
            return $http.post('/url/short', {long_url: url, about: about, user: userId})
                .then(function handleSuccess(response) {
                    console.log(response);
                }, function handleError(response) {
                    console.log(response);
                });
        }
    }
})();