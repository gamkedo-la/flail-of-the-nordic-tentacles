const WAIT_TIME_BEFORE_PATROLLING = 120;
const DETECTION_RADIUS = TILE_W * 2;
const LEASH_LENGTH = 120;
const FRAME_DIMENSIONS = 40;
const FRAME_DELAY = 4;

function enemyClass()
{
	this.centerX = 75;
	this.centerY = 75;

	this.velX = 3.0;
	this.velY = 3.0;

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();

	this.collider;
	this.bitmap;

	this.directionFaced;
	this.animFrame = 0;
	this.animDelay = FRAME_DELAY;
	
	this.currentWaitTime = 0;

	this.canPatrol = false;
	this.isInCombat = false;

	this.minSpeed = 6;
	this.speedRange = 8;

	this.init = function(name, enemyType,whichImage)
	{
		console.log('initializing enemy');
		this.bitmap = whichImage;
		this.charName = name;
		this.collider = new colliderClass(this.centerX, this.centerY, 35, 15, 0, 15);
		this.exp.init(enemyType);
		this.stats.init(this.exp.currentLvl,enemyType);
		this.randomizeInitAI();
	}

	this.setupSpeed = function(newMin,newMax)
	{
		this.minSpeed = newMin;
		this.speedRange = newMax;
	}

	this.reset = function()
	{
		this.centerX = this.homeX;
		this.centerY = this.homeY;
	}

	this.setHome = function(startCol, startRow)
	{
		this.homeX = startCol * TILE_W + 0.5 * TILE_W;
		this.homeY = startRow * TILE_H;
	}

	this.move = function(nextX, nextY)
	{
		if(this.velX > 0)
		{
			if(this.canMoveToNextTile(nextX, nextY))
			{
				this.directionFaced = "East";
				if(nextX > this.homeX + LEASH_LENGTH)
				{
					this.velX = -this.velX;
				}
			}
			else
			{
				this.velX = -this.velX;
			}
		}
		else if(this.velX < 0)
		{
			if(this.canMoveToNextTile(nextX, nextY))
			{
				this.directionFaced = "West";
				if(nextX < this.homeX - LEASH_LENGTH)
				{
					this.velX = -this.velX;
				}
			}
			else
			{
				this.velX = -this.velX;
			}
		}//end  x movement
		if(this.velY > 0)
		{
			if(this.canMoveToNextTile(nextX, nextY))
			{
				this.directionFaced = "East";
				if(nextY > this.homeY + LEASH_LENGTH)
				{
					this.velY = -this.velY;
				}
			}
			else
			{
				this.velY = -this.velY;
			}
		}
		else if(this.velY < 0)
		{
			if(this.canMoveToNextTile(nextX, nextY))
			{
				this.directionFaced = "West";
				if(nextY < this.homeY - LEASH_LENGTH)
				{
					this.velY = -this.velY;
				}
			}
			else
			{
				this.velY = -this.velY;
			}
		}//end of y movement

		this.collider.update(this.centerX,this.centerY);
	}//end of this.move

	this.randomizeInitAI = function()
	{
		console.log(this.minSpeed);
		this.velX = this.minSpeed + Math.random() * this.speedRange;
		this.velY = this.minSpeed + Math.random() * this.speedRange;

		if(Math.random() < 0.5)
		{
			this.velX = -this.velX;
		}
		if(Math.random() < 0.5)
		{
			this.velY = -this.velY;
		}
		this.currentWaitTime = Math.floor(Math.random()*WAIT_TIME_BEFORE_PATROLLING);
	}

	this.battle = function(playerCollider)
	{
		this.isInCombat = this.collider.isCollidingWithOtherCollider(playerCollider);
		
		if(this.isInCombat)
		{
			console.log('checking for advantage');
			if(this.doesPlayerHaveAdvantage(player))
			{
				console.log(player.charName + " attacking " + this.charName);
				calculateDamage(player.stats, this.stats);
			}
			else
			{
				console.log(this.charName + " attacking " + player.charName);
				calculateDamage(this.stats, player.stats);
			}
		}
	}

	//not the best code ever but it works! TODO:implement a better way of checking direction instead of this
	this.doesPlayerHaveAdvantage = function(player)
	{
		if(player.directionFaced == undefined)
		{
			return false;
		}
		//check against player east
		else if(player.directionFaced == "East" && this.directionFaced == "East")
		{
			return true;
		}
		else if(player.directionFaced == "East" && this.directionFaced == "West")
		{
			return false;
		}
		//check against player west
		else if(player.directionFaced == "West" && this.directionFaced == "West")
		{
			return true;
		}
		else if(player.directionFaced == "West" && this.directionFaced == "East")
		{
			return false;
		}
		//check against player north
		else if(player.directionFaced == "North" && this.directionFaced == "East")
		{
			return true;
		}
		else if(player.directionFaced == "North" && this.directionFaced == "West")
		{
			return true;
		}
		//check against player south
		else if(player.directionFaced == "South" && this.directionFaced == "East")
		{
			return true;
		}
		else if(player.directionFaced == "South" && this.directionFaced == "West")
		{
			return true;
		}
	}

	//check if acting as sentry
	this.isSentryModeOn = function()
	{
		this.currentWaitTime--;
		if(this.currentWaitTime <= 0)
		{
			this.canPatrol = !this.canPatrol;
			this.currentWaitTime = WAIT_TIME_BEFORE_PATROLLING;
		}
		return this.canPatrol;
	}

	this.canMoveToNextTile = function(nextCenterX,nextCenterY)
	{
		var nextTileIndex = getTileIndexAtRowCol(nextCenterX, nextCenterY, currentMapCols, currentMapRows);
		var nextTileType = TILE_SNOW;

		if(nextTileIndex != undefined)
		{
			nextTileType = worldMap[0][nextTileIndex];
			if(moveCharIfAble(nextTileType))
			{
				this.centerX = nextCenterX;
				this.centerY = nextCenterY;

				return true;
			}
			else
			{
				return false;
			}
		}
	}

	this.draw = function()
	{
		this.animDelay--;

		if(this.animDelay < 0)
		{
			this.animDelay = FRAME_DELAY;
			
			switch(this.directionFaced) {
				case "South":
					this.animFrame = 0;
					break;
				case "East":
					this.animFrame = 1;
					break;
				case "West":
					this.animFrame = 2;
					break;
				case "North":
					this.animFrame = 3;
					break;
			}
		}

		// this.collider.draw();

		drawText(this.charName, this.centerX - this.bitmap.width/4, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
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
	// var tempEnemy = new wormexClass();

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