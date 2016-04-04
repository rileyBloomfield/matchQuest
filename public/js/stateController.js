var stateController = (function() {
	var instance;
	function init() {
		var state,
			net,
			onMap = false,
			difficultyMod = 0;
		net = netInterface.getInstance();

		return {
			difficultyMod: difficultyMod,
			stageComplete: function(id, score) {
				//search through all completed stages to update score (if better), if not exist, add stage completed
				for (var i=0; i<state.stages.length; i++) {
					if(state.stages[i].id == id) {
						if(state.stages[i].score < score) {
							$.notify("New high score!", "success");
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
					renderStage(net.getMapMenu());
				}
			},
			getStage: function(id) {
				if(stateController.getInstance().checkIfStageAvailable(id)) {
					$('#insertStory').html(net.getStory(id));
					$('#storyModal').modal('show');
					renderStage(net.getStage(id), id);
				}
				else {
					$.notify("You have not completed to this point yet", "error");
				}
			},
			checkIfStageAvailable: function(id) {
				return (id <= state.stages.length);
			},
			getStageNumber: function() {
				return state.stages.length;
			},
			getStageScore: function(id) {
				if(state.stages[id] !== undefined)
					return state.stages[id].score;
				else
					return 0;
			},
			loginUser: function(user, pass) {
				var user = $("#inputUser2").val();
				var pass = $("#inputPassword2").val();
				if(user && pass) {
					state = net.loginUser(user, pass);
					if(state) {
						this.getNextState();
					}
				}
			},
			createUser: function(user, pass) {
				var user = $("#inputUser").val();
				var pass = $("#inputPassword").val();
				if(user && pass) {
					state = net.createUser(user, pass);
					this.getNextState();
					$('#insertStory').html(net.getStory(-1));
					$('#storyModal').modal('show');
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