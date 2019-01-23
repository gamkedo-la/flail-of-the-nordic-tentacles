//Enemy related
var enemiesInAreaCount = 0;
var respawnTimerFrames = 0;
const FRAME_DELAY_RESPAWN = 150;
var spawnID = 1;

function popEnemyList()
{
	//use allLvls[currentLvlIndex].totalEnemies instead of the const here
	for(var i = 0; i < allLvls[currentLvlIndex].totalEnemies; i++)
	{
		randomSpawn();
	}
	enemiesInAreaCount = allLvls[currentLvlIndex].totalEnemies;
}

function findSpawnSpots()
{
	spawnEnemiesSpawnList();
}

function randomSpawn()
{
	if(enemiesStartSpots.length <= 0)
	{
		console.log("TRIED TO SPAWN MORE ENEMIES THAN ALLOWED");
		return;
	}
	var randSpot = Math.floor(Math.random() * enemiesStartSpots.length);
	var tempEnemy = getClassBasedOnType(enemiesStartSpots[randSpot].charType);

	tempEnemy.setHome(enemiesStartSpots[randSpot].col,enemiesStartSpots[randSpot].row);
	// enemiesStartSpots.splice(randSpot, 1);
	tempEnemy.init('Enemy' + spawnID);
	spawnID++;
	enemiesList.push(tempEnemy);
}

function checkForCombat(fighting)
{
	return fighting == false;
}

function getClassBasedOnType(charType)
{
	var classType = null;

	switch(charType)
	{
		case TILE_WORMEX:
			classType = new wormexClass();
			break;
		case TILE_TANK:
			classType = new tankClass();
			break;
		case TILE_FALLEN:
			classType = new fallenVikingClass();
			break;
		case TILE_VANGUARD:
			classType = new vanguardClass();
			break;
		case TILE_BOSS:
		    classType = new bossClass('Boss');
    		break;
	}

	return classType;
}

function getEnemyPicBasedOnType(charType)
{
	switch(charType)
	{
		case TILE_WORMEX:
			return wormexPic;
		case TILE_TANK:
			return tankPic;
		case TILE_FALLEN:
			return fallenPic;
		case TILE_VANGUARD:
			return vanguardPic;
		case TILE_BOSS:
    		return bossPic;
	}
}

function drawEnemies()
{
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].draw();
	}
}

function handleEnemyRemovalAndXpDrop(whichEnemy)
{
	if(whichEnemy.stats.isCharacterDead)
	{
		spawnEnemyBasedParticles(whichEnemy);

		if(player.exp.currentLvl < 50)
		{
			player.exp.currentXp += whichEnemy.exp.gainEnemyXpDrop();

			if(hasPlayerLeveledUp())
				levelUpPlayer();
		}
		else
		{
			player.exp.nextXp = player.exp.currentXp;
			player.exp.nextLvl = player.exp.currentLvl;
		}

		for(var i = enemiesList.length - 1; i >= 0; i--)
		{
			if(enemiesList[i].stats.isCharacterDead)
			{
				enemiesList.splice(i,1);
				if(respawnTimerFrames <= 0)
				{
					respawnTimerFrames = FRAME_DELAY_RESPAWN;
				}
			}
		}
	}
	else // did not die
	{
		spawnHitParticles(whichEnemy);
	}

}
