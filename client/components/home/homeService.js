(function () {
    'use strict';

    angular.module('Services')
        .service('HomeService', HomeService);

    HomeService.$inject = ['$http'];

    function HomeService($http) {

        return ({
            getByTag: getByTag
        });

        function getByTag(tag) {
            return $http.post('/url/tag', {tag: tag})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.data.status,
                        urls: response.data.urls
                    };
                }, function handleError(response) {
                    return {
                        status: response.status,
                        message: response.data.err.message
                    };
                });
        }
    }
})();