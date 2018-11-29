const WAIT_TIME_BEFORE_PATROLLING = 120;
const DETECTION_RADIUS = TILE_W * 2;
const LEASH_LENGTH = 120;
const FRAME_DIMENSIONS = 40;
const FRAME_DELAY = 4;

function enemyClass()
{
	this.centerX = 75;
	this.centerY = 75;

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
	}//end of this.move

	this.randomizeInitAI = function()
	{
		if(Math.random() < 0.5)
		{
			this.velX = -this.velX;
			this.velY = -this.velY;
		}
		this.currentWaitTime = Math.floor(Math.random()*WAIT_TIME_BEFORE_PATROLLING);
	}

	this.battle = function(player)
	{
		//improve collisions here
		let dx = this.hitbox.x - player.hitbox.x;
		let dy = this.hitbox.y - player.hitbox.y;
		let distance = Math.sqrt(dx*dx + dy*dy);

		if(distance < this.hitbox.radius + player.hitbox.radius)
		{ 
			if(this.doesPlayerHaveAdvantage(player))
			{
				console.log(player.charName + " attacking " + this.charName);
			}
			else
			{
				console.log(this.charName + " attacking " + player.charName);
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
	//get type of enemy and set temp to that class
	// var tempEnemy = getClassBasedOnType(enemiesStartSpots[randSpot].charType);
	var tempEnemy = new wormexClass();

	tempEnemy.randomizeInitAI();
	tempEnemy.superClassSetHome(enemiesStartSpots[randSpot].col,enemiesStartSpots[randSpot].row);
	enemiesStartSpots.splice(randSpot, 1);
	enemiesList.push(tempEnemy);
}

function getClassBasedOnType(charType)
{
	// declare var classType as undefined
	// check char type against constants
	// set classType according to conditional checks against charType
	//return classType
}