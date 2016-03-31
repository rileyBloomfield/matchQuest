var servicesModule = angular.module('servicesModule',[]);

servicesModule.service('canvasService', function(){
    _canvas = new createjs.Stage("canvas");
    _canvas.enableMouseOver();
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", function() {
        _canvas.update();
    });
    return {
        canvas: _canvas
    }
});


servicesModule.service('stateService', function(canvasService){
    _currentStage = 0;
    return {
        stage: _currentStage
    }
});

servicesModule.service('stageService', function(canvasService, stateService){
    var stages = [{
        backgroundSrc: "res/backgrounds/stdBackground.jpg",
        type: "std",
        buttons: [],
        iconContainer: {
          iconData: ["icons/logSprite.png",
                     "icons/waterSprite.png",
                     "icons/sunSprite.png",
                     "icons/moonSprite.png",
                     "icons/flowerSprite.png"],
          grid: [[1,2,1,1,2,1,0,1],
                 [0,3,0,1,0,2,3,4],
                 [2,0,2,4,3,1,0,0],
                 [0,1,2,4,0,3,1,0],
                 [4,2,0,2,4,0,4,2],
                 [0,3,0,0,2,3,1,0],
                 [2,2,1,0,3,1,0,0],
                 [0,4,0,1,0,4,1,1]],
          numMoves: 25,
          iconSize: 55,
          goal: [2, 2, 2, 2, 2]
        }
      }, {
        backgroundSrc: "res/backgrounds/cmbtBackground.jpg",
        type: "cmbt",
        buttons: [],
        opponent: "res/opponents/eel.jpg",
        iconContainer: {
          iconData: ["icons/logSprite.png",
                     "icons/waterSprite.png",
                     "icons/sunSprite.png",
                     "icons/moonSprite.png",
                     "icons/flowerSprite.png"],
          grid: [[1,2,1,1,2,1,0,1],
                 [0,3,0,1,0,2,3,4],
                 [2,0,2,4,3,1,0,0],
                 [0,1,2,4,0,3,1,0],
                 [4,2,0,2,4,0,4,2],
                 [0,3,0,0,2,3,1,0],
                 [2,2,1,0,3,1,0,0],
                 [0,4,0,1,0,4,1,1]],
          numMoves: 25,
          iconSize: 55,
          goal: [20, 20, 20, 20, 20]
        }
      }, {
        backgroundSrc: "res/backgrounds/bossBackground.jpg",
        type: "boss",
        buttons: [],
        iconContainer: {
          iconData: ["icons/logSprite.png",
                     "icons/waterSprite.png",
                     "icons/sunSprite.png",
                     "icons/moonSprite.png",
                     "icons/flowerSprite.png"],
          grid: [[1,2,1,1,2,1,0,1],
                 [0,3,0,1,0,2,3,4],
                 [2,0,2,4,3,1,0,0],
                 [0,1,2,4,0,3,1,0],
                 [4,2,0,2,4,0,4,2],
                 [0,3,0,0,2,3,1,0],
                 [2,2,1,0,3,1,0,0],
                 [0,4,0,1,0,4,1,1]],
          numMoves: 25,
          iconSize: 55,
          goal: [20, 20, 20, 20, 20]
        }
      }]
    return {
        getNextStage: function() {
            return stages[stateService.stage];
        }
    }
});




