var stateController = (function() {
	var instance;
	function init() {
		var state,
			net,
			onMap = false;
		net = netInterface.getInstance();

		return {
			stageComplete: function(id, score) {
				state.stages.push({id: id, score: score});
			},
			getNextState: function(stage, score) {
				if(!state) {
					return net.getMainMenu();
				}
				if(!onMap) {
					//state.stages.push({id: stage, score: score});
					//onMap = true;
					renderStage(net.getMapMenu());
				}
			},
			getStage: function(id) {
				if(id <= state.stages.length)
					renderStage(net.getStage(id));
				else {
					//notify stage is not unlocked
				}
			},
			loginUser: function(user, pass) {
				state = net.loginUser(user, pass);
				alert("logged in");
			},
			createUser: function(user, pass) {
				state = net.createUser(user, pass);
				alert("user created");
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