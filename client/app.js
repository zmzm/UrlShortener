(function () {
    'use strict';

    var app = angular.module('ClientApp', [
        'ngMaterial',
        'ui.router',
        'Controllers',
        'Services'
    ]);

    angular.module('Controllers', []);
    angular.module('Services', []);

    app.config(appRouting);
})();