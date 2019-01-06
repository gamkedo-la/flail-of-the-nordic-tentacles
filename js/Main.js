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

	if(isInventoryVisible)
	{
		playerInventory.renderInventory();
	}

	fadingTitles.draw();
}