function renderStage(params, id) {
    canvas.removeAllChildren();
	//render background
    var backgroundImg = new Image();
    backgroundImg.src = params.backgroundSrc;
    var backgroundBitmap = new createjs.Bitmap(backgroundImg);
    canvas.addChild(backgroundBitmap);

    //Render Buttons
    if(params.type != 'map') {
        params.buttons.forEach(function(button, index) {
            var buttonData = {
              images: [button.src],
              frames: {width:100, height:45},
              animations: {normal:[0], hover:[1], clicked:[2]}
            };

            var spriteSheet = new createjs.SpriteSheet(buttonData);
            var newButton = new createjs.Sprite(spriteSheet);
            var helper = new createjs.ButtonHelper(newButton, "normal", "hover", "clicked");
            newButton.x = button.x;
            newButton.y = button.y;
            newButton.addEventListener("click", function(){
                createjs.Sound.play("menuSound");
                button.handler(); 
            });
            newButton.gotoAndStop("normal");
            canvas.addChild(newButton);
        })  
    }
    else {
        params.buttons.forEach(function(button, index) {
            if(index < (2+stateController.getInstance().getStageNumber())) {
                var buttonData = {
                  images: [button.src],
                  frames: {width:100, height:45},
                  animations: {normal:[0], hover:[1], clicked:[2]}
                };

                var spriteSheet = new createjs.SpriteSheet(buttonData);
                var newButton = new createjs.Sprite(spriteSheet);
                var helper = new createjs.ButtonHelper(newButton, "normal", "hover", "clicked");
                newButton.x = button.x;
                newButton.y = button.y;
                newButton.addEventListener("click", function(){
                    createjs.Sound.play("menuSound");
                    button.handler(); 
                });
                newButton.gotoAndStop("normal");
                canvas.addChild(newButton);
            }
        })  
    }
    



    //render icon container
    if(params.iconContainer) {
    	var matchPuzzle = new puzzle(canvas, params.iconContainer.iconData, params.iconContainer.grid, params.iconContainer.numMoves, backgroundBitmap, params.iconContainer.iconSize, params.iconContainer.goal, id, params.type, params.opponent, params.self, params.iconContainer.goalGrid);
    }
};









