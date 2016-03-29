var netInterface = (function () { 
  var instance;
  var address = "";
  function init() {

    return {
      getMainMenu: function() {
        return stageData.main;
      },
      getMapMenu: function() {
        return stageData.map;
      },
      getStage: function(id) {
        return stageData.stages[id];
      },
      loginUser: function(user, pass) {
        for(var i=0; i<users.length; i++) {
          if(users[i].user == user) {
            if(users[i].pass == pass) {
              return users[i].stages;
            }
            else {
              $.notify("Incorrect password", "error");
            }
          }
        }
        return false;
      },
      createUser: function(user, pass) {
        return {
          stages: []
        };
      }
    }
  }
  return {
    getInstance: function () {
      if ( !instance )
        instance = init();
      return instance;
    }
  }
})();

var stageData = {
  main: {
    backgroundSrc: "res/backgrounds/mainMenu.gif", 
    buttons: [{
        src: "res/buttons/newGameButton.png",
        x: 350,
        y: 300,
        handler: function() {stateController.getInstance().createUser(); stateController.getInstance().getNextState();}
    }, {
        src: "res/buttons/loadGameButton.png",
        x: 350,
        y: 400,
        handler: function() {stateController.getInstance().loginUser(); stateController.getInstance().getNextState();}
    }, {
        src: "res/buttons/optionsButton.png",
        x: 350,
        y: 500,
        handler: function() {}
    }],
    iconContainer: false
  }, 
  map: {
    backgroundSrc: "res/backgrounds/mapMenu.gif",
    buttons: [{
        src: "res/buttons/playButton.png",
        x: 240,
        y: 450,
        handler: function() {stateController.getInstance().getStage(0);}
    }, {
        src: "res/buttons/playButton.png",
        x: 300,
        y: 220,
        handler: function() {stateController.getInstance().getStage(1);}
    }, {
        src: "res/buttons/playButton.png",
        x: 610,
        y: 150,
        handler: function() {stateController.getInstance().getStage(2);}
    }],
    iconContainer: false
  },
  stages: [{
    backgroundSrc: "res/backgrounds/stdBackground.jpg",
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
  }, {
    backgroundSrc: "res/backgrounds/bossBackground.jpg",
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
};

var users = [{
  user: "riley",
  pass: "pass",
  stages: [{
    id: 0,
    score: 12345
  }, {
    id: 1,
    score: 12345
  }]
}]









