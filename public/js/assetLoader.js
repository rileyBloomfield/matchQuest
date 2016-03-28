var assetLoader = (function () { 
  var instance;
  var address = "";
  function init() {
    var queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", handleComplete, this);
     
     function handleComplete(event) {
         return 1;
     } 

    return {
      loadMainMenuAssets: function () {
        queue.loadManifest([
         {id: "mainMenu", src:address+"res/mainMenu.gif"},
         {id: "newGameButton", src:address+"res/buttons/newGameButton.png"},
         {id: "loadGameButton", src:address+"res/buttons/loadGameButton.png"},
         {id: "optionsButton", src:address+"res/buttons/optionsButton.png"}
        ]); 
      },

      loadMapMenuAssets: function() {
        queue.loadManifest([
         {id: "mainMenu", src:address+"res/mainMenu.gif"}
        ]);
      }
    };
  };
  return {
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})();