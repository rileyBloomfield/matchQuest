var canvas;

function init() {
	canvas = new createjs.Stage("canvas");
	canvas.enableMouseOver();
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", function() {
        canvas.update();
    });
    var controller = stateController.getInstance();
    renderStage(controller.getNextState());
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

