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

