var canvas, canvasContext;
var gameLoop;
var gameIsRunning = false;
var fps = 30;
var enemiesList = [];
const NUM_OF_ENEMIES_ON_SCREEN = 50;

var isPaused = false;
var displayItem = false;
var timer = 0;
var debugState = false;

var player = new playerClass();
var seer = new npcClass();
var outcast = new npcClass();
var maleViking = new npcClass();
var femaleViking = new npcClass();

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
	maleViking.init(maleVikingPic,"Male Viking",TILE_MALE_VIKING);
	femaleViking.init(femaleVikingPic,"Female Viking",TILE_FEMALE_VIKING);
	seer.init(seerPic,"The Seer",TILE_SEER);
	outcast.init(outcastPic,"The Outcast",TILE_OUTCAST);

	findSpawnSpots();
	popEnemyList();
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].init("Enemy " + i);
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

function itemPickedUp()
{
	timer ++;
	if (timer <= 100)
	{
		displayItem = true;
	}
	else if (timer > 100){
		displayItem = false;
		timer = 0;
	}
}

function toggleDebugMode()
{
	if(debugState)
	{
		debugState = false;
	}
	else
	{
		debugState = true;
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

	//going to need y-sorting for these
	if(currentMap == 'forestTest')
	{
		maleViking.draw();
		femaleViking.draw();
		seer.draw();
		outcast.draw();
	}
	player.draw();

	drawVisibleWorld(currentMapCols, 1);
	canvasContext.restore();
	if(debugState)
	{
		gameDebugTools();
	}
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
	drawText('mouse: ' + (mouseX + camPanX) + ',' + (mouseY + camPanY) + 'index: ' + roomTileToIndex(tileCol, tileRow, currentMapCols),
		mouseX, mouseY, 'black');
}