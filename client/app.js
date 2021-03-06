(function () {
    'use strict';

    var app = angular.module('Client', [
        'ui.router',
        'ui.bootstrap',
        'ngTagsInput',
        'toastr',
        'Controllers',
        'Services'
    ]);

    angular.module('Controllers', []);
    angular.module('Services', []);

    app.config(appRouting);
    app.run(['$rootScope', '$state', 'AuthService', 'UserService', function ($rootScope, $state, AuthService, UserService) {
        if (localStorage['user.id']) {
            UserService.add(
                localStorage['user.username'],
                localStorage['user.id']
            );
        }
    }]);
})();