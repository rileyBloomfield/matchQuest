var netInterface = (function () { 
  var instance;
  var address = "";
  function init() {

    return {
      getNextState: function() {
        return stageData.std;
      },
      login: function(user, pass) {
        return true;
      },
      createUser: function(user, pass) {
        return true;
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
        handler: function() {}
    }, {
        src: "res/buttons/loadGameButton.png",
        x: 350,
        y: 400,
        handler: function() {}
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
    buttons: [],
    iconContainer: false
  },
  std: {
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
      iconSize: 55
    }
  }
};









