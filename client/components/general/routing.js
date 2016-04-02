var appRouting = function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'components/home/home.html',
            controller: ''
        })
        .state('user', {
            url: '/user',
            templateUrl: 'components/user/user.html',
            controller: '',
            access: {restricted: true}
        });

    $urlRouterProvider.otherwise('/');
};