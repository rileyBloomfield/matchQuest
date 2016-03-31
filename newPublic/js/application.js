var partyShark = angular.module('partyShark', ['ngRoute', 'servicesModule', 'controllersModule', 'directivesModule']);

partyShark.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/home.html',
            controller  : 'mainController'
        })

        .when('/map', {
            templateUrl : 'views/home.html',
            controller  : 'mapController'
        })

        .when('/std/:id', {
            templateUrl : 'views/home.html',
            controller  : 'stdController'
        })

        .when('/cmbt/:id', {
            templateUrl : 'views/home.html',
            controller  : 'cmbtController'
        })

        .when('/boss/:id', {
            templateUrl : 'views/home.html',
            controller  : 'bossController'
        })
});
