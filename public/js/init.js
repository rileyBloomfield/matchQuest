var gameSettings = {
    fps: 30
}

function stdLevel(backgroundSrc, grid, iconFiles, numMoves) {
    this.backgroundSrc = backgroundSrc || "http://read.pudn.com/downloads25/sourcecode/game/80278/RPG%20Programming/chapter3.2/sample__.jpg",
    this.grid = grid ||
                [[1,2,1,1,2,1,0,1],
                 [0,3,0,0,0,2,3,4],
                 [0,0,2,4,3,1,0,0],
                 [0,1,2,4,0,3,1,0],
                 [4,2,0,2,4,0,4,2],
                 [0,3,0,0,2,3,1,0],
                 [0,2,0,1,0,1,0,0],
                 [0,4,0,0,3,4,1,1]],
    this.background = "",
    this.iconFiles = iconFiles || 
                     ["icons/logSprite.png",
                      "icons/waterSprite.png",
                      "icons/sunSprite.png",
                      "icons/moonSprite.png",
                      "icons/flowerSprite.png"],
    this.numMoves = 10 || numMoves,
    this.iconSize = 55,
    this.brightness = 0,
    this.lowerDaylight = function() {
        this.brightness -= 180/this.numMoves;
        var matrix = new createjs.ColorMatrix().adjustBrightness(this.brightness);
            this.background.filters = [
                new createjs.ColorMatrixFilter(matrix)
        ];
        this.background.cache(0, 0, 640, 480);
    },
    this.init = function() {
            var doge = new Image();
            doge.src = "http://read.pudn.com/downloads25/sourcecode/game/80278/RPG%20Programming/chapter3.2/sample__.jpg"
            this.background = new createjs.Bitmap(doge);
        }
    }

function canvasData() {
    this.stage = null,
    this.initStage = function() {
    	if (!this.stage) {
    		this.stage = new createjs.Stage("canvas");
    		this.stage.enableMouseOver();
    	}
    }
}

function init() {
		this.canvas = new canvasData();
		this.canvas.initStage();

        //Init tick
        createjs.Ticker.setFPS(gameSettings.fps);
        createjs.Ticker.addEventListener("tick", function() {
			this.canvas.stage.update();
        });

        renderTitleScreen();

        function renderTitleScreen() {
            //Clear Stage
            canvas.stage.removeAllChildren();

            //Draw Background Image
            var backgroundImg = new Image();
            backgroundImg.src = "http://www.unoosa.org/res/timeline/index_html/space-2.jpg";
            var backgroundBitmap = new createjs.Bitmap(backgroundImg);
            canvas.stage.addChild(backgroundBitmap);

            //Draw Title Image
            var titleBitmap = new createjs.Bitmap("res/title.png");
            titleBitmap.x = 200;
            titleBitmap.y = 50;
            canvas.stage.addChild(titleBitmap);

            //Draw Log In Button
            var logInButtonData = {
              images: ["http://www.backwardcompatible.net/images/3buttons.png"],
              frames: {width:100, height:45},
              animations: {normal:[0], hover:[1], clicked:[2]}
            };

            var logInSpriteSheet = new createjs.SpriteSheet(logInButtonData);
            var loginButton = new createjs.Sprite(logInSpriteSheet);
            var helper = new createjs.ButtonHelper(loginButton, "normal", "hover", "clicked");
            loginButton.x = 350;
            loginButton.y = 300;
            loginButton.addEventListener("click", function(event) { alert("Log In Successful");
                renderStdLevel();
            })
            loginButton.gotoAndStop("normal");
            canvas.stage.addChild(loginButton);

            //Draw Create Account Button
            var createAccountButtonData = {
              images: ["http://www.backwardcompatible.net/images/3buttons.png"],
              frames: {width:100, height:45},
              animations: {normal:[0], hover:[1], clicked:[2]}
            };

            var createAccountSpriteSheet = new createjs.SpriteSheet(createAccountButtonData);
            var createAccountButton = new createjs.Sprite(createAccountSpriteSheet);
            var helper = new createjs.ButtonHelper(createAccountButton, "normal", "hover", "clicked");
            createAccountButton.x = 350;
            createAccountButton.y = 400;
            createAccountButton.addEventListener("click", function(event) { alert("Account Create Successfully"); })
            createAccountButton.gotoAndStop("normal");
            canvas.stage.addChild(createAccountButton);
        }

        function renderProgressMap() {
            
        }

        function renderStdLevel() {
            //Clear stage
            canvas.stage.removeAllChildren();

            //Create Level and initialize
            var level = new stdLevel();
            level.init();

            //Holders for matching
            var prevSelected = null,
                currSelected = null;

            //Add Background Image
            this.canvas.stage.addChild(level.background);

            //Container to hold icons together
            var iconContainer = new createjs.Container();

            //Set of all tiles
            var tiles = [];

            function tile(xPos, yPos, icon) {

            }

            //Create Animated Icons from Icon Data
            var iconData = [];
            level.iconFiles.forEach(function(file) {
                iconData.push({
                    images: [file],
                    frames: {width:100, height:100},
                    animations: {normal:[0], hover:[1], clicked:[2]}
                });
            });

            //Draw Icons on screen
            drawIcons();

            function drawIcons() {
                this.canvas.stage.removeChild(iconContainer);
                iconContainer.removeAllChildren();
                //Add All Icons to Stage
                level.grid.forEach(function(result, row) {
                    result.forEach(function(column, index) {
                        var spriteSheet = new createjs.SpriteSheet(iconData[level.grid[row][index]]);
                        var icon = new createjs.Sprite(spriteSheet);
                        var helper = new createjs.ButtonHelper(icon, "normal", "hover", "clicked");
                        icon.addEventListener("click", function(event) {
                            handleClick(icon);
                        });
                        icon.type = level.grid[row][index];
                        icon.xPos = index;
                        icon.yPos = row;
                        icon.scaleX=0.5;
                        icon.scaleY=0.5;
                        icon.x = index * level.iconSize;
                        icon.y = row * level.iconSize;
                        iconContainer.addChild(icon);
                    });
                });

                //Shift the iconContainer where we want it on the screen and add to stage
                iconContainer.x = 100;
                iconContainer.y = 25;
                this.canvas.stage.addChild(iconContainer);
            }

            function handleClick(icon) {
                //gets rid of specific icon --> iconContainer.removeChild(icon);
                if(prevSelected) {
                    currSelected = icon;

                    //Selected icons are adjacent, make the move
                    if (isAdjacent()) {

                        //swap grid elements
                        var tempXPos = currSelected.xPos,
                            tempYPos = currSelected.yPos;
                        currSelected.xPos = prevSelected.xPos;
                        currSelected.yPos = prevSelected.yPos;
                        prevSelected.xPos = tempXPos;
                        prevSelected.yPos = tempYPos;

                        //Make swap animation on icons
                        createjs.Tween.get(currSelected, { loop: false }).to({ x: prevSelected.x, y: prevSelected.y }, 500, createjs.Ease.getPowInOut(6));
                        createjs.Tween.get(prevSelected, { loop: false }).to({ x: currSelected.x, y: currSelected.y }, 500, createjs.Ease.getPowInOut(6));
                        
                        //If the move does not result in a match, move them back
                        if (!isMatch()) {
                            //Swap grid elements back
                            
                            //Animate switch back
                        }
                        //Lower daylight as move has been completed
                        level.lowerDaylight();
                    }
                    currSelected = null;
                    prevSelected = null;
                }
                else {
                    prevSelected = icon;
                }
            }

            function isAdjacent() {
                //Check if two selected icons are beside each other before allowing a swap
                if(Math.abs(prevSelected.xPos - currSelected.xPos) == 1) {
                    if(prevSelected.yPos - currSelected.yPos == 0){
                        return true;
                    }
                }
                else if (Math.abs(prevSelected.yPos - currSelected.yPos) == 1) {
                    if(prevSelected.xPos - currSelected.xPos == 0){
                        return true;
                    }
                }
                else
                    return false;
            }

            function isMatch(firstIconCoords, secondIconCoords) {
                var matchLength = 0;

                //checkVertical match

                //Check if a swap results in a match
                return true;
            }

            function moveTileLeft(tile) {

            }
            function moveTileRight(tile) {

            }
            function moveTileDown(tile) {

            }
        }       

        function renderCombatLevel() {

        }

        function renderBossLevel() {

        }
}

