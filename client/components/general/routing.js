var appRouting = function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'components/home/home.html',
            controller: ''
        });

    $urlRouterProvider.otherwise('/');
};