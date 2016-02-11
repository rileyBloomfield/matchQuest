var controllersModule = angular.module('controllersModule',['servicesModule']);

controllersModule.controller('mainController', function($scope) {

});

controllersModule.controller('loadController', function($scope, $location, $timeout) {
    $scope.loadValue = 86;
    $timeout(function() {
        $location.path('/game');
    }, 2500);
    
});

controllersModule.controller('gameController', function($scope, $rootScope, canvasService) {
    $rootScope.topButtons = ["leaderboard", "exit"];
    $showCanvas = false;

    $scope.init = function() {
        //Initialize game canvas
        canvasService.setCanvas(document.getElementById('canvas'));
        canvasService.setCanvasDimensions(window.innerWidth || 
            document.documentElement.clientWidth || 
            document.body.clientWidth, window.innerHeight || 
            document.documentElement.clientHeight || 
            document.body.clientHeight);
        //Fade in canvas
        //Init Game Engine
    }

    $scope.windowResize = function(width, height) {
        canvasService.setCanvasDimensions(width, height);
    }

    $scope.init();
});