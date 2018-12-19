//Enemy related
function popEnemyList()
{
	for(var i = 0; i < NUM_OF_ENEMIES_ON_SCREEN; i++)
	{
		randomSpawn();
	}
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
	enemiesStartSpots.splice(randSpot, 1);
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
		// case TILE_FALLEN:
		// 	classType = new wormexClass();
			// break;
		// case TILE_VANGUARD:
		// 	classType = new wormexClass();
			// break;
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
		let image = getParticleImageBasedOnType(whichEnemy.charType);
		let life = getParticleLifeBasedOnImage(image);
		let size = getParticleSizeBasedOnImage(image);

		//need a way to pass in whichEnemy's pos equation according to their specific bitmap size, 
		//angle/magnitude based whichEnemy, and spread based whichEnemy
		emitters.push(new Emitter(new Vector(whichEnemy.centerX - whichEnemy.bitmap.width/8, whichEnemy.centerY - whichEnemy.bitmap.height/2),
                                            Vector.getNewVectorFromAngMag(0,2),Math.PI));
         addParticles(Vector.randBtweenTwoNums(5,50),image,life,size);

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
			}
		}
	}
}