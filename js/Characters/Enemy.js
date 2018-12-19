const WAIT_TIME_BEFORE_PATROLLING = 120;
const DETECTION_RADIUS = TILE_W * 2;
const LEASH_LENGTH = 120;
const FRAME_DIMENSIONS = 40;
const FRAME_DELAY = 4;
const NUM_OF_ENEMIES_ON_SCREEN = 50;

var enemiesList = [];
var enemiesStartSpots = [];
var stopEnemyMovement = false;

function enemyClass()
{
	this.centerX = 75;
	this.centerY = 75;

	this.velX = 3.0;
	this.velY = 3.0;

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

	this.shotList = [];
	this.canShoot = false;
	
	this.init = function(name,enemyType,whichImage,colliderW,colliderH)
	{
		this.shotList = [];
		this.bitmap = whichImage;
		this.charName = name;
		this.charType = enemyType;
		this.collider = new colliderClass(this.centerX, this.centerY, colliderW, colliderH, 0, 15);
		this.exp.init(enemyType);
		this.stats.init(this.exp.currentLvl,enemyType);
		this.randomizeInitAI();
	}

	this.setProjectile = function(ableToShoot)
	{
		this.canShoot = ableToShoot;
	}

	this.setupSpeed = function(newMin,newMax)
	{
		this.minSpeed = newMin;
		this.speedRange = newMax;
	}

	this.reset = function()
	{
		this.shotList = [];
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
		if(stopEnemyMovement){
			// no action - cheat activated 
		} else {
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
		} // end cheat code - stop enemy movement 
		this.collider.update(this.centerX,this.centerY);
	}//end of this.move

	this.randomizeInitAI = function()
	{
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
			if(this.doesPlayerHaveAdvantage(player))
			{
				calculateDamage(player.stats, this.stats);

				handleEnemyRemovalAndXpDrop(this);
			}
			else
			{
			//	player.immunity();              // need to determine when damage occurs to start timer
				if(player.isImmune == false)
				{
					calculateDamage(this.stats, player.stats);		
				}	
			}
		}

		if(this.canShoot)
		{
			if(Math.random() * 100 < 5)
			{
				this.shotList.push(new projectileClass(this.centerX,this.centerY,8,10));
			}
		}
		
		for(var i = this.shotList.length - 1; i>=0;i--)
		{
			this.shotList[i].move();
			if(this.shotList[i].isReadyToRemove())
			{
				this.shotList.splice(i,1);
			}
		}
	}

	this.doesPlayerHaveAdvantage = function(player)
	{
		if(player.directionFaced == undefined)
		{
			return false;
		}
		//check against player east/west/north/south
		else if	((player.directionFaced == "East" && this.directionFaced == "East") ||
				(player.directionFaced == "West" && this.directionFaced == "West") ||
				(player.directionFaced == "North" && this.directionFaced == "East") ||
				(player.directionFaced == "North" && this.directionFaced == "West") ||
				(player.directionFaced == "South" && this.directionFaced == "East") ||
				(player.directionFaced == "South" && this.directionFaced == "West"))
		{
			return true;
		}
		else 
		{
			return false;
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
		if(this.collider.collidingWithTerrain(nextCenterX,nextCenterY,false))
        {
            this.centerX = nextCenterX;
            this.centerY = nextCenterY;
            return true;
        }
        return false;
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

		this.collider.draw();

		drawText(this.charName, this.centerX - this.bitmap.width/4, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
		
		for(var i = 0; i<this.shotList.length;i++)
		{
			this.shotList[i].draw();
		}
	}
}