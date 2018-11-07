const WAIT_TIME_BEFORE_PATROLLING = 120;
const NUM_PATROLLABLE_PIXELS_X = TILE_W * 2;
const NUM_PATROLLABLE_PIXELS_Y = TILE_H * 2;
const DETECTION_RADIUS = TILE_W * 2;
const LEASH_LENGTH = 120;
const FRAME_DIMENSIONS = 40;
const FRAME_DELAY = 4;

function slimeClass()
{
	this.centerX = 75;
	this.centerY = 75;
	this.hitbox = {radius: 15, x: this.centerX, y: this.centerY};
	this.velX = 3.0;
	this.velY = 3.0;

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();

	this.directionFaced;
	this.animFrame = 0;
	this.animDelay = FRAME_DELAY;
	
	this.numOfPxMoved = 0;
	this.currentWaitTime = 0;

	this.isPatrollingRight = false;
	this.canPatrol = false;

	this.isDefeated = false;

	/* 
	TODO: use bools (until I figure out a better solution if it's within my skill level) to make enemy move one direction a time only
	train of thought so far:
	this.isPatrollingEast = false;
	this.isPatrollingWest = false;
	this.isPatrollingNorth = false;
	this.isPatrollingSouth = false;
	*/

	this.init = function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.reset();
	}

	this.reset = function()
	{
		if(this.homeX == undefined)
		{
			for(var i = 0; i < worldMap.length; i++)
			{
				if(worldMap[i] == TILE_ENEMY)
				{
					var tileRow = Math.floor(i/W_COLS);
					var tileCol = i%W_COLS;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.25 * TILE_H;
					worldMap[i] = TILE_SNOW;
					break;
				}
			}
		}
		this.centerX = this.homeX;
		this.centerY = this.homeY;
	}

	this.setHome = function(startCol, startRow)
	{
		this.homeX = startCol * TILE_W + 0.5 * TILE_W;
		this.homeY = startRow * TILE_H + 0.25 * TILE_H;
	}

	this.move = function()
	{
		this.hitbox.x = this.centerX;
		this.hitbox.y = this.centerY;

		var nextX = this.centerX;
		var nextY = this.centerY;

		if(!this.isSentryModeOn())
		{
			nextX += this.velX;
			nextY += this.velY;
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
			}
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
			}
		}
	}//end of this.move

	this.randomizeInitAI = function()
	{
		this.velX = 4 + Math.random() * 8;
		this.velY = 4 + Math.random() * 8;
		if(Math.random() < 0.5)
		{
			this.velX = -this.velX;
			this.velY = -this.velY;
		}
		this.currentWaitTime = Math.floor(Math.random()*WAIT_TIME_BEFORE_PATROLLING);
	}

	this.battle = function(player)
	{
		/*TODO: find a way to reference enemies; once enemy can detected, check which player edge collide with which enemy edge;
			if collision was player front on enemy front, dmg player; if collision was player front on enemy back or sides then dmg enemy
			THINK OF Ys I and II
			NOTE: use this.directionFaced and check it against player's direction faced to find zone of collision
		*/
		let dx = this.hitbox.x - player.hitbox.x;
		let dy = this.hitbox.y - player.hitbox.y;
		let distance = Math.sqrt(dx*dx + dy*dy);

		if(distance < this.hitbox.radius + player.hitbox.radius)
		{
			//TODO: after implementing stats and XP, check stats and lvls to have somewhat appropriate dmg values
			if(this.doesPlayerHaveAdvantage(player))
			{
				console.log(player.charName + " attacking enemy");
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

	//check if slime is acting as sentry
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
		var nextTileIndex = getTileIndexAtRowCol(nextCenterX, nextCenterY);
		var nextTileType = TILE_SNOW;

		if(nextTileIndex != undefined)
		{
			nextTileType = worldMap[nextTileIndex];
			if(moveCharIfAble(nextTileType))
			{
				this.centerX = nextCenterX;
				this.centerY = nextCenterY;

				return true;
			}
			else
			{
				// this.isPatrollingRight = !this.isPatrollingRight;

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
			this.animFrame++;
			if(this.animFrame >= 4)
			{
				this.animFrame = 0;
			}
		}
	
		// drawBitmapCenteredWithRot(this.bitmap, this.centerX, this.centerY, 0.0);
		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}
}