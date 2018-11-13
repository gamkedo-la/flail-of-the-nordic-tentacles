var canvas, canvasContext;
var gameLoop;
var gameIsRunning = false;
var fps = 30;
var enemiesList = [];
const NUM_OF_ENEMIES_ON_SCREEN = 14;

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

	player.init(vikingPic, "Ragnar");

	findSpawnSpots();
	popEnemyList();
	for(var i = 0; i < enemiesList.length; i++)
	{
		//TODO: function to use the appropriate img for an enemy and a way to name them
		/*
			enemiesList[i].init(getPicForThisSpecificEnemy(), name of enemy)
		*/
		enemiesList[i].init(slimePic, "Slime " + i);
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
	moveCamera(W_COLS, W_ROWS);
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

	drawVisibleWorld(W_COLS);
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].draw();
	}
	player.draw();

	canvasContext.restore();
	// gameDebugTools();
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
	drawCircle(camPanX, camPanY, 5, 'red');
	drawText("mouse: " + mouseX + "," + mouseY, mouseX, mouseY, "red");
}