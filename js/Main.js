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
		addEnemyToSpawnList(allLvls[0].enemies[i].x,allLvls[0].enemies[i].y, allLvls[0].enemies[i].charType);
	}

	player.init(vikingPic, "Ragnar");
	maleViking.init(maleVikingPic,"Male Viking");

	findSpawnSpots();
	popEnemyList();
	for(var i = 0; i < enemiesList.length; i++)
	{
		//TODO: function to use the appropriate img for an enemy and a way to name them
		/*
			enemiesList[i].init(getPicForThisSpecificEnemy(), nameOfEnemyKind() + i)
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
		regenPlayerHpIfAble(player,player.isIdle,enemiesList);
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
		enemiesList[i].battle(player.collider);
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
	maleViking.draw();

	drawVisibleWorld(currentMapCols, 1);
	canvasContext.restore();
	gameDebugTools();
	if(isPaused)
	{
		drawRect(canvas.width/2-55,canvas.height/2-30, 135,35, "black")
		drawRect(canvas.width/2-50,canvas.height/2-25, 125,25, "white")
		drawText("PAUSED", canvas.width/2-50,canvas.height/2, "black", font="30px sans-serif")
	}
    createDialogue();
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

	drawText(`Player Health: ${player.stats.hp}`, 20, 20, 'black', '20px sans-serif');
	// drawText(`In Combat: ${player.isInCombat}`, 20, 40, 'black', '20px sans-serif');
	drawText(`Player Wait Before Regen: ${player.waitTimeForHpRegen}`,20,60,'black','20px sans-serif');
	for(var i = 0; i < enemiesList.length; i++)
	{
		drawText(`Enemy ${i} Health: ${enemiesList[i].stats.hp}`, 20, (i+4) * 20, 'black', '20px sans-serif');
	}

	// drawCircle(camPanX, camPanY, 5, 'red');
	// drawText('mouse: ' + (mouseX + camPanX) + ',' + (mouseY + camPanY) + 'index: ' + roomTileToIndex(tileCol, tileRow, currentMapCols), 
	// 	mouseX, mouseY, 'red');
}