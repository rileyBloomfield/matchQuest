var servicesModule = angular.module('servicesModule',[]);

servicesModule.service('canvasService', function() {
	var _canvas,
		_canvasHeight = 0,
		_canvasWidth = 0,
		_stage;

	return {
		stage: _stage,
		getCanvasWidth: function() {
			return _canvasWidth;
		},
		getCanvasHeight: function() {
			return _canvasHeight;
		},
		setCanvas: function(canvas) {
			_canvas = canvas;
		},
		setCanvasDimensions: function(width, height) {
			_canvasWidth = width;
			_canvasHeight = height;
			canvas.width = _canvasWidth;
			canvas.height = _canvasHeight;
		},
		initializeStage: function() {
			_stage = new createjs.Stage("canvas");
            _stage.enableMouseOver();
		}
	}
});