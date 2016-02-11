var directivesModule = angular.module('directivesModule',['servicesModule']);

//Globally broadcast window resize event
directivesModule.directive('resize', function($window) {
  return {
    link: function(scope) {
      angular.element($window).on('resize', function(e) {
        scope.$broadcast('resize::resize',{ width: $window.innerWidth, height: $window.innerHeight} );
      });
    }
  }
});

//Local capture of window resize event
directivesModule.directive('winResize', function() {
    return {
        scope: { windowResize: '&callbackFn' },
        link: function(scope, element, attrs) {
            scope.$on('resize::resize', function(event, args) {
                scope.windowResize({width: args.width, height: args.height});
            })
        }
    }
});

//Initialize game canvas
directivesModule.directive("easelInit", function(canvasService) {
    return {
        link: function(scope) {
            var brightness = 0; //used as a measure of day left

            //Initialize stage
            var stage = new createjs.Stage("canvas");
            stage.enableMouseOver();

            //Initialize tick
            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", stage);

            var doge = new Image();
            doge.src = "http://read.pudn.com/downloads25/sourcecode/game/80278/RPG%20Programming/chapter3.2/sample__.jpg"
            var bitmap = new createjs.Bitmap(doge);
            stage.addChild(bitmap);

            var buttonData = {
              images: ["http://www.backwardcompatible.net/images/3buttons.png"],
              frames: {width:100, height:45},
              animations: {normal:[0], hover:[1], clicked:[2]}
            };

            var spriteSheet = new createjs.SpriteSheet(buttonData);

            var button1 = new createjs.Sprite(spriteSheet);
            var helper = new createjs.ButtonHelper(button1, "normal", "hover", "clicked");
            button1.x = 150;
            button1.y = 100;
            button1.addEventListener("click", function(event) { alert("clicked"); })
            button1.gotoAndStop("normal");
            stage.addChild(button1);

            var button2 = new createjs.Sprite(spriteSheet);
            var helper = new createjs.ButtonHelper(button2, "normal", "hover", "clicked");
            button2.x = 150;
            button2.y = 200;
            button2.addEventListener("click", function(event) { 
                stage.removeAllChildren();

                //Add background
                function lowerDaylight() {
                    brightness -= 5;
                    var matrix = new createjs.ColorMatrix().adjustBrightness(brightness);
                        bitmap.filters = [
                            new createjs.ColorMatrixFilter(matrix)
                    ];
                    bitmap.cache(0, 0, 640, 480);
                }
                var doge = new Image();
                doge.src = "http://read.pudn.com/downloads25/sourcecode/game/80278/RPG%20Programming/chapter3.2/sample__.jpg"
                var bitmap = new createjs.Bitmap(doge);
                stage.addChild(bitmap);

                //Add match icons
                var grid = [[1,1,1,1,1,1,1,1],
                            [0,0,0,0,0,0,0,0],
                            [0,0,2,0,0,1,0,0],
                            [0,1,0,0,0,0,1,0],
                            [0,0,0,2,0,0,0,2],
                            [0,0,0,0,0,0,1,0],
                            [0,2,0,1,0,1,0,0],
                            [0,0,0,0,0,0,1,1]];

                var resourceIcons = ["http://www.pminjurylaw.com/images/in-icon.png",
                                     "https://wikiislam.net/wiki/images/d/d7/Crystal_welcome-icon.gif",
                                     "http://kwic.info/sites/default/files/icon_youtube_0.jpg"];

                grid.forEach(function(result, row) {
                    result.forEach(function(column, index) {
                        var resImg = new Image();
                        resImg.src = resourceIcons[grid[row][index]];
                        var resBitmap = new createjs.Bitmap(resImg);
                        resBitmap.addEventListener("click", function(event) { 
                            lowerDaylight();
                        })
                        resBitmap.x = 100 + index*30;
                        resBitmap.y = 100 + row*30;
                        stage.addChild(resBitmap)
                    });
                });                
            })
            button2.gotoAndStop("normal");
            stage.addChild(button2);

            var button3 = new createjs.Sprite(spriteSheet);
            var helper = new createjs.ButtonHelper(button3, "normal", "hover", "clicked");
            button3.x = 150;
            button3.y = 300;
            button3.addEventListener("click", function(event) { stage.removeAllChildren(); })
            button3.gotoAndStop("normal");
            stage.addChild(button3);
        }
    }
});



