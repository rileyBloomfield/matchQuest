var stateController = (function() {
	var instance;
	function init() {
		var state,
			net,
			onMap = false;
		net = netInterface.getInstance();

		return {
			stageComplete: function(id, score) {
				//search through all completed stages to update score (if better), if not exist, add stage completed
				for (var i=0; i<state.stages.length; i++) {
					if(state.stages[i].id == id) {
						if(stage.stages[i].score < score) {
							state.stages[i].score = score;
						}
						return;
					}
				}
				state.stages.push({id: id, score: score});
			},
			getNextState: function(stage, score) {
				if(!state) {
					return net.getMainMenu();
				}
				if(!onMap) {
					//state.stages.push({id: stage, score: score});
					renderStage(net.getMapMenu());
				}
			},
			getStage: function(id) {
				if(id <= state.stages.length)
					renderStage(net.getStage(id), id);
				else {
					$.notify("You have not completed to this point yet", "error"/*{style: 'happyblue', autoHide: true}*/);
				}
			},
			loginUser: function(user, pass) {
				var user = prompt("Please enter your name");
				var pass = prompt("Please enter your password");
				if(user && pass) {
					state = net.loginUser(user, pass);
				}
			},
			createUser: function(user, pass) {
				var user = prompt("Please enter your name");
				var pass = prompt("Please enter your password");
				if(user && pass) {
					state = net.createUser(user, pass);
				}
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