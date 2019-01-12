var canvas, canvasContext;
var gameLoop;
var gameIsRunning = false;
var fps = 30;

/////// Game States /////////////

var isPaused = false;
var displayItem = false;
var itemDisplaytimer = 0;
var debugState = false;
var gameIsStarted = true;
/*
	NOTE: will need a way to save just about everything from state of game to player's current spot in game
*/
window.onload = function()
{
	gameIsStarted = false;
	canvas = document.getElementById('gc');
	canvasContext = canvas.getContext('2d');

	loadImages();
	handleBackgroundMusic();
}

function imgsDoneLoadingSoStartGame()
{
	gameIsRunning = true;
	gameLoop = setInterval(updateAll, 1000/fps);

	setupCharacters();

	setupInput();
}

function updateAll()
{
	if (gameIsStarted === false) {
    Menu.update();
  	}
    else if (isPaused == false) {

		moveAll();
		battleAll();
	} else {
		console.log("Pause");
			}

	updateGroundDecals(0.7); // a higher number here causes the footprints to fade out faster
	drawAll();
	emitters = [];
}

function moveAll()
{
	moveCharacters();
	moveCamera(currentMapCols, currentMapRows);

	plotParticles(150,150);
}

function battleAll()
{
	for(var i = 0; i < enemiesList.length; i++)
	{
		//checking for battle against player
		enemiesList[i].battle(player.collider);
	}

	regenPlayerHpIfAble(player,player.isIdle,enemiesList);
}

function drawAll()
{
	if(gameIsStarted == false){
    	Menu.draw();
   		return; // skip game logic below
 	}
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY);

	objectsWithDepth = [];

	drawVisibleWorld(currentMapCols, 0);
	drawGroundDecals();
	// drawAllCharacters();//characters are drawn with drawDepthSortedTiles()
	// wormexTestEnemy.draw(); // trying to determine where to call draw enemies - Vince
	// drawParticles();//now handled in drawDepthSortedTiles()
	drawVisibleWorld(currentMapCols, 1);
	drawDepthSortedTiles();

	canvasContext.restore();
	if(debugState)
	{
		gameDebugTools();
	}

	drawUI();
	createDialogue();
	canvasContext.restore();
}

function drawStatsBox() {
	// background:
	// drawRect(24,34, 116,122, "#888");
	// HP:
	drawRect(30,40, 104,28, "#ddd");
	drawText(`HP: ${player.stats.hp}/${player.stats.maxHp}`, 32, 50, 'black', '10px sans-serif');
	drawRect(32,55, 100,10, "white");
	drawRect(32,55, Math.ceil(player.stats.hp / player.stats.maxHp * 100),10, "red");
	// XP:
	drawRect(30,75, 104,24, "#ddd");
	drawText(`XP: ${player.exp.currentXp}/${player.exp.nextXp}`, 32, 85, 'black', '10px sans-serif');
	drawText(`Lvl: ${player.exp.currentLvl} `, 100, 85, 'black', '10px sans-serif');
	drawRect(32,90, 100,6, "white");
	drawRect(32,90, Math.ceil(player.exp.nextXp / player.exp.currentXp * 100),6, "purple");
	// STR:
	drawRect(30,106, 104,24, "#ddd");
	drawText(`STR: ${player.stats.str}/${player.stats.maxStr}`, 32, 118, 'black', '10px sans-serif');
	drawRect(32,120, 100,6, "blue");
	drawRect(32,120, Math.ceil(player.stats.str / player.stats.maxStr* 100),6, "grey");
	// DEF:
	drawRect(30,126, 104,24, "#ddd");
	drawText(`DEF: ${player.stats.def}/${player.stats.maxDef}`, 32, 138, 'black', '10px sans-serif');
	drawRect(32,140, 100,6, "blue");
	drawRect(32,140, Math.ceil(player.stats.def / player.stats.maxDef* 100),6, "grey");
	//drawText(`MP: ${player.stats.mp}/${player.stats.maxMp}`, 32, 168, 'black', '10px sans-serif');

	canvasContext.drawImage(statsBezelPic,24,34);


}

//will go to UI JS once implemented
function drawUI()
{
	drawText(currentMap, 700, 30, font="30px sans-serif");
	if(displayItem)
	{
		drawText('The Player has picked up ' + player.item + '.', canvas.width-275, 60, "black");
		itemPickedUp();
	}
	if(isPaused)
	{
		drawRect(canvas.width/2-55,canvas.height/2-30, 135,35, "black");
		drawRect(canvas.width/2-50,canvas.height/2-25, 125,25, "white");
		drawText("PAUSED", canvas.width/2-50,canvas.height/2, "black", font="30px sans-serif");
	}
	drawText("Player Xp: " + player.exp.currentXp, 20, 500, "Teal", "20px Arial", "center", 10);
	drawText("Next Lvl Xp: " + player.exp.nextXp, 20, 520, "Teal", "20px Arial", "center", 10);
	drawText("Player level: " + player.exp.currentLvl, 20, 540, "Maroon", "20px Arial", "center", 10);
	drawText("Next level: " + player.exp.nextLvl, 20, 560, "Maroon", "20px Arial", "center", 10);

	drawStatsBox();

	if(isInventoryVisible)
	{
		playerInventory.renderInventory();
	}

	fadingTitles.draw();
}