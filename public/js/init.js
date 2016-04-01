var canvas;
var queue;

function init() {
	canvas = new createjs.Stage("canvas");
	canvas.enableMouseOver();
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", function() {
       canvas.update();
  });

  var controller = stateController.getInstance();
  renderStage(controller.getNextState());

   queue = new createjs.LoadQueue();
   queue.installPlugin(createjs.Sound);
   queue.on("complete", handleComplete, this);
   queue.loadManifest([
       {id: "menuSound", src:"res/actions/MenuSelect.mp3"},
       {id: "ambientSound", src:"res/actions/Menu.mp3"},
       {id: "alertSound", src:"res/actions/Alert.mp3"},
       {id: "successSound", src:"res/actions/Success.mp3"}
   ]);

   function handleComplete() {
       createjs.Sound.play("ambientSound", loop=true);
       //var image = queue.getResult("mainMenu");
   }
}

$.notify.addStyle('happyblue', {
  html: "<div>☺<span data-notify-text/>☺</div>",
  classes: {
    base: {
      "white-space": "nowrap",
      "background-color": "lightblue",
      "padding": "5px"
    },
    superblue: {
      "color": "white",
      "background-color": "blue"
    }
  }
});

