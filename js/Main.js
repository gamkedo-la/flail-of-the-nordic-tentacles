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
	if (gameIsStarted == false || isPaused) {
    	Menu.update();
    	// Menu.draw();
    	return;
  	}
    else {
		moveAll();
		battleAll();
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