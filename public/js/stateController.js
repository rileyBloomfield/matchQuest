var stateController = (function() {
	var instance;
	function init() {
		var currentStage = 0,
			stageSet = 0,
			user = null,
			net;
		net = netInterface.getInstance();

		return {
			getNextState: function(params) {
				return net.getNextState(currentStage, stageSet);
			}
		}
	}
	return {
		getInstance: function() {
			if (!instance)
				instance = init();
			return instance;
		}
	}
})();