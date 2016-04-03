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
              return users[i];
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
        handler: function() {$('#myModalHorizontal').modal('show'); stateController.getInstance().getNextState();}
    }, {
        src: "res/buttons/loadGameButton.png",
        x: 350,
        y: 400,
        handler: function() {$('#myModalVertical').modal('show'); stateController.getInstance().getNextState();}
    }, {
        src: "res/buttons/optionsButton.png",
        x: 350,
        y: 500,
        handler: function() {}
    }],
    iconContainer: false
  }, 
  map: {
    type: 'map',
    backgroundSrc: "res/backgrounds/mapMenu.gif",
    buttons: [{
        src: "res/buttons/backButton.png",
        x: 700,
        y: 0,
        handler: function() { $('#exitModal').modal('show'); }
    }, {
        src: "res/buttons/nextMapButton.png",
        x: 700,
        y: 555,
        handler: function() { alert(""); }
    }, {
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
    iconContainer: false,
    scores: [{
      x: 230,
      y: 560
    }, {
      x: 290,
      y: 340
    }, {
      x: 610,
      y: 260
    }]
  },
  stages: [{
    backgroundSrc: "res/backgrounds/stdBackground.jpg",
    type: "std",
    buttons: [{
        src: "res/buttons/backButton.png",
        x: 700,
        y: 0,
        handler: function() { $('#confirmModal').modal('show'); } }],
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
    buttons: [{
        src: "res/buttons/backButton.png",
        x: 700,
        y: 0,
        handler: function() {$('#confirmModal').modal('show'); }}],
    opponent: "res/opponents/eel.jpg",
    self: "res/opponents/self.jpg",
    iconContainer: {
      iconData: ["icons/attack.png",
                 "icons/health.png",
                 "icons/coralSprite.png",
                 "icons/seaRockSprite.png",
                 "icons/seaweedSprite.png",
                 "icons/attackEmpty.png",
                 "icons/healthEmpty.png"],
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
    buttons: [{
        src: "res/buttons/backButton.png",
        x: 700,
        y: 0,
        handler: function() {$('#confirmModal').modal('show'); }}],
    opponent: "res/opponents/toxic.png",
    self: "res/opponents/bridge.png",
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
      numMoves: 140,
      iconSize: 55,
      goal: [20, 20, 20, 20, 20],
      goalGrid: [[0,0,0,0,0,0,1,0],
                 [0,0,0,0,1,1,1,0],
                 [1,1,1,1,1,0,0,0],
                 [1,0,0,0,0,0,0,0],
                 [1,1,0,0,0,0,0,0],
                 [0,1,0,0,0,0,0,0],
                 [0,1,0,0,0,0,0,0],
                 [0,1,0,0,0,0,0,0]]
    }
  }]
};

var users = [{
  user: "riley",
  pass: "pass",
  stages: [{
    id: 0,
    score: 1111
  }, {
    id: 1,
    score: 2222
  } , {
    id: 2,
    score: 3333
  }]
}]









