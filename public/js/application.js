var matchQuest = angular.module('matchQuest', ['ngRoute', 'servicesModule', 'controllersModule', 'directivesModule']);

matchQuest.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'views/load.html',
            controller  : 'loadController'
        })
        .when('/game', {
            templateUrl : 'views/game.html',
            controller  : 'gameController'
        })
});