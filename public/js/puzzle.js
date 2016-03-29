var puzzle = function(stage, iconFiles, grid, numMoves, background, iconSize, goal, id, type, opponent) {
	//Holders for matching
    var prevSelected = null,
        currSelected = null;

    var completed = false;

    var brightness = 0;
    var goalMatches = [0,0,0,0,0];
    var stageScore = 0;
    var health = 100,
        oppHealth = 100;

	//Container to hold icons together
    var iconContainer = new createjs.Container();

    //container to hold status
    var statusContainer = new createjs.Container();

    //container for daylight update
    var clockContainer = new createjs.Container();

    //Set of all tiles
    var tiles = [[0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0],
                 [0,0,0,0,0,0,0,0]];



    var resourceLabels = [];

    //Create Animated Icons from Icon Data
    var iconData = [];
    iconFiles.forEach(function(file) {
        iconData.push({
            images: [file],
            frames: {width:100, height:100},
            animations: {normal:[0], hover:[1], clicked:[2]}
        });
    });

    //Draw Icons on screen
    init();

    function createTile(xPos, yPos, type) {
        if(tiles[xPos][yPos] != 0)
            return;

        var spriteSheet = new createjs.SpriteSheet(iconData[type]);
        var icon = new createjs.Sprite(spriteSheet);
        var helper = new createjs.ButtonHelper(icon, "normal", "hover", "clicked");
        icon.addEventListener("click", function(event) {
            handleClick(icon);
        });
        icon.alpha = 0;
        icon.type = type;
        icon.xPos = xPos;
        icon.yPos = yPos;
        icon.scaleX=0.5;
        icon.scaleY=0.5;
        icon.x = xPos * iconSize;
        icon.y = yPos * iconSize;
        //console.log("Icon created at "+xPos+", "+yPos+" type: "+type);
        iconContainer.addChild(icon);
        createjs.Tween.get(icon, { loop: false }).to({ alpha: 1 }, 500);
        tiles[xPos][yPos] = icon;
        removeMatches(icon);
    }

    function deleteTile(icon) {
        if(icon.yPos === undefined || icon.xPos === undefined)
            return;
        tiles[icon.xPos][icon.yPos] = 0;
        iconContainer.removeChild(icon);
    }

    function removeAllMatches() {
        for(var i=0; i<8; i++) {
            for (var j=0; j<8; j++) {
                removeMatches(tiles[i][j]);
            }
        }
    }

    function init() {
        stage.removeChild(iconContainer);
        iconContainer.removeAllChildren();
        //Add All Icons to Stage
        grid.forEach(function(result, row) {
            result.forEach(function(column, index) {
                createTile(index, row, grid[index][row]);
            });
        });

        //Shift the iconContainer where we want it on the screen and add to stage
        iconContainer.x = 25;
        iconContainer.y = 25;
        stage.addChild(iconContainer);

        statusContainer.x = 50;
        statusContainer.y = 490;

        clockContainer.x = 490;
        clockContainer.y = 25;

        if(type == "std") {
            for(var i = 0; i<iconData.length; i++) {
                var spriteSheet = new createjs.SpriteSheet(iconData[i]);
                var icon = new createjs.Sprite(spriteSheet);
                icon.x = 80*i;
                icon.scaleY = 0.75;
                icon.scaleX = 0.75;
                statusContainer.addChild(icon);

                var text = new createjs.Text("0/"+goal[i], "20px Arial", "#ff7700");
                text.x = 80*i;
                text.textBaseline = "alphabetic";
                resourceLabels.push(text);
                statusContainer.addChild(text);
            }
        }
        if(type == "cmbt") {
                var img = new Image();
                img.src = opponent;
                var bitmap = new createjs.Bitmap(img);
                bitmap.scaleY = 0.75;
                bitmap.scaleX = 0.75;
                statusContainer.addChild(bitmap);

                var text = new createjs.Text(oppHealth+"/100", "20px Arial", "#ff7700");
                text.textBaseline = "alphabetic";
                resourceLabels.push(text);
                statusContainer.addChild(text);

                var spriteSheet = new createjs.SpriteSheet(iconData[0]);
                var icon = new createjs.Sprite(spriteSheet);
                icon.x = 160;
                icon.scaleY = 0.75;
                icon.scaleX = 0.75;
                statusContainer.addChild(icon);

                var text = new createjs.Text(health+"/100", "20px Arial", "#ff7700");
                text.x = 160;
                text.textBaseline = "alphabetic";
                resourceLabels.push(text);
                statusContainer.addChild(text);

        }

        stage.addChild(statusContainer);
        stage.addChild(clockContainer);

        //removeAllMatches();
    }

    function handleClick(icon) {
        //if combat, chance of attack on every click
        if(type == "cmbt") {
            if(Math.round(Math.random()*5) == 2) {
                health -= 10;
                changeText(resourceLabels[1], health+"/100", 1);
                if (health <= 0 && !completed) {
                    completed = true;
                    createjs.Tween.get(iconContainer, { loop: false }).to({ alpha: 0 }, 2000);
                    setTimeout(function() {
                        alert("You lose");
                        stateController.getInstance().getNextState();
                    }, 2000);
                }
            }
            if(Math.round(Math.random()*25) == 3) {
                if (oppHealth <= 90)
                    oppHealth += 10;
                changeText(resourceLabels[0], oppHealth+"/100", 0);
            }

        }
        if(prevSelected) {
            currSelected = icon;

            //Selected icons are adjacent, make the move
            if (isAdjacent()) {

                //swap icon position attributes
                var tempXPos = currSelected.xPos,
                    tempYPos = currSelected.yPos;
                currSelected.xPos = prevSelected.xPos;
                currSelected.yPos = prevSelected.yPos;
                prevSelected.xPos = tempXPos;
                prevSelected.yPos = tempYPos;

                //swap on tiles grid
                tiles[currSelected.xPos][currSelected.yPos] = currSelected;
                tiles[prevSelected.xPos][prevSelected.yPos] = prevSelected;

                //Make swap animation on icons
                createjs.Tween.get(currSelected, { loop: false }).to({ x: prevSelected.x, y: prevSelected.y }, 500, createjs.Ease.getPowInOut(6)).call(handleNextIcon, [currSelected, prevSelected], this);
                createjs.Tween.get(prevSelected, { loop: false }).to({ x: currSelected.x, y: currSelected.y }, 500, createjs.Ease.getPowInOut(6));

                function handleNextIcon(currSelected, prevSelected) {
                    removeMatches(prevSelected)
                    removeMatches(currSelected)
                    createjs.Sound.play("alertSound");
                    if(type != "cmbt") {
                        lowerBrightness();
                    }                    	
                }
            }
            currSelected = null;
            prevSelected = null;
        }
        else {
            prevSelected = icon;
        }
    }

    //pass in start location of tile, cascade will fill all holes at and above location
    function cascadeFill(column, row) {
        if(type == "std") {
            setTimeout(function(){
            //if top row, make new element
            if(row == 0) {
                //make new random tile at top
                if(tiles[column][row] == 0) {
                    createTile(column, row, Math.round(Math.random()*4));
                }
                return;
            }
            //not top element
            else {
                //look through all tiles above to see if there is one to move down
                var index = 0;
                while(row - ++index >= 0) {
                    //if yes, move it down and call on tile above current
                    if(tiles[column][row-index] != 0) {
                        //make tile at bottom same as top tile
                        if(tiles[column][row]) {
                            deleteTile(tiles[column][row]);
                            //tiles[column][row] = 0;
                        }
                        //create tile at desired position and delete from original
                        createTile(column, row, tiles[column][row-index].type);
                        deleteTile(tiles[column][row-index]);

                        //tiles[column][row-index] = 0;
                        cascadeFill(column, row-1);
                        return;
                    }
                }
                //if not, make new tile
                createTile(column, row, Math.round(Math.random()*4));
                cascadeFill(column, row-1);
                return;
            }
            }, 100);
        }
        else if (type == "cmbt") {
            createTile(column, row, Math.round(Math.random()*4));        
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

    function removeMatches(icon) {
        var matchLength = 1,
            index,
            x,
            y, 
            matches = [],
            currMatch = [];

        //Check horizontally
        x = icon.xPos,
        y = icon.yPos;
        index = x;
        while(index > 0) {
            index--;
            if (tiles[index][y].type == icon.type) {
                matchLength++;
                currMatch.push(tiles[index][y]);
            }
            else {
                break;
            }
        }
        index = x;
        while(index < 7) {
            index++;
            if (tiles[index][y].type == icon.type) {
                matchLength++;
                currMatch.push(tiles[index][y]);
            }
            else {
                if(matchLength < 3)
                    currMatch = [];
                break;
            }
        }

        if(matchLength >= 3) {
            console.log("Matched "+matchLength+" tile type "+currMatch[0].type);
            countMatch(currMatch[0].type);
            matches.push(currMatch);
        }

        //Check Vertically
        x = icon.xPos,
        y = icon.yPos;
        matchLength = 1;
        index = y;
        while(index > 0) {
            index--;
            if (tiles[x][index].type == icon.type) {
                matchLength++;
                currMatch.push(tiles[x][index]);
            }
            else {
                break;
            }
        }
        index = y;
        while(index < 7) {
            index++;
            if (tiles[x][index].type == icon.type) {
                matchLength++;
                currMatch.push(tiles[x][index]);
            }
            else {
                if(matchLength < 3)
                    currMatch = [];
                break;
            }
        }

        if(matchLength >= 3) {
            console.log("Matched "+matchLength+" tile type "+currMatch[0].type);
            countMatch(currMatch[0].type);
            matches.push(currMatch);
        }

        if(matches.length == 0)
            return false;

        var lastMatch = [];
        lastMatch.push(tiles[icon.xPos][icon.yPos]);
        matches.push(lastMatch);

        //if there are matches, delete the tiles in the matches
        for (var i=0; i<matches.length; i++) {
            for (var j=0; j<matches[i].length; j++) {
                deleteTile(matches[i][j]);
            }
        }

        //call cascade fill on all tiles removed
        matches.forEach(function(matchSet){
            matchSet.forEach(function(icon) {
                cascadeFill(icon.xPos, icon.yPos);
            });
        })
        if(checkWin() && !completed) {
            completed = true;
            createjs.Tween.get(iconContainer, { loop: false }).to({ alpha: 0 }, 2000);
            setTimeout(function(){
                createjs.Sound.play("successSound");
                alert("you win! score: "+(brightness+180*100));
                stateController.getInstance().stageComplete(id, (brightness+180*100));
                stateController.getInstance().getNextState();
            }, 2000);
        }
        return true;
    }

    function lowerBrightness() {
        brightness -= 180/numMoves;
        var matrix = new createjs.ColorMatrix().adjustBrightness(brightness);
            background.filters = [
                new createjs.ColorMatrixFilter(matrix)
        ];
        background.cache(0, 0, 800, 600);
        if(brightness < -180 && !completed) {
            completed = true;
            createjs.Tween.get(iconContainer, { loop: false }).to({ alpha: 0 }, 2000);
            setTimeout(function() {
                alert("You lose");
                stateController.getInstance().getNextState();
            }, 2000);
        }
    }

    function checkWin() {
        console.log(goalMatches);
        for(var i=0; i<goal.length; i++) {
            if(goalMatches[i] < goal[i])
                return false;
        }
        return true;
    }

    function countMatch(index) {
        if (type == "std") {
            goalMatches[index]++;
            changeText(resourceLabels[index], goalMatches[index]+"/"+goal[index], index);
        }
        if (type == "cmbt") {
            if(index == 0) { //attack tile is matched
                oppHealth -= 10;
                changeText(resourceLabels[index], oppHealth+"/100", index);
                if (oppHealth <= 0 && !completed) {
                    completed = true;
                    createjs.Tween.get(iconContainer, { loop: false }).to({ alpha: 0 }, 2000);
                    setTimeout(function(){
                        createjs.Sound.play("successSound");
                        alert("you have defeated the oppnent!");
                        stateController.getInstance().stageComplete(id, 12345);
                        stateController.getInstance().getNextState();
                    }, 2000);
                }
            }
            if (index == 1) { //health tile is matched
                if (health <= 90)
                    health += 10;
                changeText(resourceLabels[index], health+"/100", index);
            }
        }
    }

    function changeText(child, value, index) {
        if(type == "std") {
            var text = new createjs.Text(value, "20px Arial", "#ff7700");
            text.x = child.x;
            text.textBaseline = "alphabetic";
            statusContainer.removeChild(child);
            resourceLabels[index] = text;
            statusContainer.addChild(text);
        }
        if(type == "cmbt") {
            var text = new createjs.Text(value, "20px Arial", "#ff7700");
            text.x = child.x;
            text.textBaseline = "alphabetic";
            statusContainer.removeChild(child);
            resourceLabels[index] = text;
            statusContainer.addChild(text);
        }
    }
}
