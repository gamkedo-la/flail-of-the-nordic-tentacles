var canvas, canvasContext;
var gameLoop;
var gameIsRunning = false;
var fps = 30;
var enemiesList = [];
const NUM_OF_ENEMIES_ON_SCREEN = 50;

var isPaused = false;

var player = new playerClass();

/*
	NOTE: will need a way to save just about everything from state of game to player's current spot in game
*/
window.onload = function()
{
	canvas = document.getElementById('gc');
	canvasContext = canvas.getContext('2d');

	loadImages();
}

function imgsDoneLoadingSoStartGame()
{
	gameIsRunning = true;
	gameLoop = setInterval(updateAll, 1000/fps);

	for(var i = 0; i < allLvls[0].enemies.length; i++)
	{
		addEnemyToSpawnList(allLvls[0].enemies[i].x,allLvls[0].enemies[i].y, allLvls[0].enemies.charType);
	}

	player.init(vikingPic, "Ragnar");

	findSpawnSpots();
	popEnemyList();
	for(var i = 0; i < enemiesList.length; i++)
	{
		//TODO: function to use the appropriate img for an enemy and a way to name them
		/*
			enemiesList[i].init(getPicForThisSpecificEnemy(), name of enemy)
		*/
		enemiesList[i].init(wormexPic, "Enemy " + i);
	}
	setupInput();
}

function updateAll()
{
	
	if (isPaused == false){
		moveAll();
		battleAll();
	} else {
		console.log("Pause");
			}

	drawAll();
}

function moveAll()
{
	player.move();
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].move();
	}
	moveCamera(currentMapCols, currentMapRows);
}

function battleAll()
{
	for(var i = 0; i < enemiesList.length; i++)
	{
		//checking for battle against player
		enemiesList[i].battle(player);
	}
}

function drawAll()
{
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY);

	drawVisibleWorld(currentMapCols, 0);
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].draw();
	}
	player.draw();

	drawVisibleWorld(currentMapCols, 1);
	canvasContext.restore();
	gameDebugTools();
}

function popEnemyList()
{
	for(var i = 0; i < NUM_OF_ENEMIES_ON_SCREEN; i++)
	{
		randomSpawn();
	}
}

function gameDebugTools()
{
	var tileCol =  Math.floor((mouseX + camPanX)/TILE_W);
	var tileRow =  Math.floor((mouseY + camPanY)/TILE_H);

	// drawCircle(camPanX, camPanY, 5, 'red');
	drawText("mouse: " + (mouseX + camPanX) + "," + (mouseY + camPanY) + "index: " + roomTileToIndex(tileCol, tileRow, currentMapCols), 
		mouseX, mouseY, "red");
}