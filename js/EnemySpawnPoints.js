var enemySpawnList = [];

//could push an object literal that using the spawn point class and the char type property found there
function addEnemyToSpawnList(atX,atY)
{
	var tempEnemy = new enemySpawnPointClass();

	tempEnemy.setup(atX, atY, 0);
	enemySpawnList.push(tempEnemy);
	// console.log(enemySpawnList);
}

function clearSpawnList()
{
	enemySpawnList = [];
}

function drawEnemySpawns()
{
	for(var i = 0; i < enemySpawnList.length; i++)
	{
		enemySpawnList[i].draw();
	}
}

function spawnEnemiesSpawnList()
{
	for (var i = 0; i < enemySpawnList.length; i++)
	{
		// console.log("found enemy spawn at: " + i);
		var tileCol = Math.floor(enemySpawnList[i].x/TILE_W);
		var tileRow = enemySpawnList[i].y/TILE_H;
		enemiesStartSpots.push({col: tileCol, row: tileRow});
	}
}

function spawnListSaveText()
{
	var outputString = "[\n";

	for(var i = 0; i < enemySpawnList.length; i++)
	{
		outputString += "{x:" + enemySpawnList[i].x + ",y:" + enemySpawnList[i].y + ",type:" + enemySpawnList[i].charType + "}, ";
		if(i%4 === 0 && i !== 0)
		{
			outputString += "\n";
		}
	}
	outputString += "]";

	return outputString;
}

function removeSpawnNearMouse()
{
	var closestI = -1;
	var nearDist = 80;

	for(var i = 0; i < enemySpawnList.length; i++)
	{
		var newDist = enemySpawnList[i].distFromMouse();
	
		if(newDist <= nearDist)
		{
			nearDist = newDist;
			closestI = i;
		}
	}

	if(closestI != -1)
	{
		enemySpawnList.splice(closestI, 1);
	}
}

function enemySpawnPointClass()
{
	this.x = 0;
	this.y = 0;

	this.bitmap;
	this.charType = 0;//will handle various types of enemies later

	this.setup = function(startX,startY,enemyKind)
	{
		this.x = startX;
		this.y = startY;
		this.bitmap = wormexPic;//handle different enemy types pics later
		this.charType = enemyKind;
	}

	this.draw = function()
	{
		canvasContext.drawImage(this.bitmap, 0 * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.x - this.bitmap.width/8, this.y - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}

	this.distFromMouse = function()
	{
		var dx = this.x - (mouseX + camPanX);
		var dy = this.y - (mouseY + camPanY);

		return Math.sqrt(dx * dx + dy * dy);
	}
}