(function () {
    'use strict';

    angular.module('Services')
        .service('UserPageService', UserPageService);

    UserPageService.$inject = ['$http'];

    function UserPageService($http) {
        return ({
            shortUrl: shortUrl,
            pagination: pagination,
            updateUrl: updateUrl
        });

        function shortUrl(userId, url, about, tags) {
            return $http.post('/url/short', {long_url: url, about: about, user: userId, tags: tags})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.data.status,
                        url: response.data.url
                    };
                }, function handleError(response) {
                    return {
                        status: response.status,
                        message: response.data.err.message
                    };
                });
        }

        function pagination(pageNum, userId) {
            return $http.post('/url/page/' + pageNum, {userId: userId})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.data.status,
                        urls: response.data.urls,
                        totalCount: response.data.totalCount
                    };
                }, function handleError(response) {
                    return {
                        status: response.status,
                        message: response.data.err.message
                    };
                });
        }

        function updateUrl(url) {
            return $http.put('/url/update/' + url._id, {url: url})
                .then(function handleSuccess(response) {
                    return {
                        status: response.status,
                        message: response.data.status,
                        url: response.data.url
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