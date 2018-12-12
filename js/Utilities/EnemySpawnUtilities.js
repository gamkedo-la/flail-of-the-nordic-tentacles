//Enemy Spawns related
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

function spawnListSaveText()
{
	var outputString = "[\n";

	for(var i = 0; i < enemySpawnList.length; i++)
	{
		outputString += "{x:" + enemySpawnList[i].x + ",y:" + enemySpawnList[i].y + ", charType:" + enemySpawnList[i].charType + "}, ";
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