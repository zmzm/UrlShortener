var appRouting = function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'components/home/home.html',
            controller: 'HomeCtrl as vm'
        })
        .state('user', {
            url: '/user',
            templateUrl: 'components/user/user.html',
            controller: 'UserPageCtrl as vm',
            access: {restricted: true}
        });

    $urlRouterProvider.otherwise('/');
};