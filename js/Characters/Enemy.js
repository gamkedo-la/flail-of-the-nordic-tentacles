const WAIT_TIME_BEFORE_PATROLLING = 120;
const DETECTION_RADIUS = TILE_W * 2;
const LEASH_LENGTH = 120;
const FRAME_DIMENSIONS = 40;
const FRAME_DELAY = 4;
const NUM_OF_ENEMIES_ON_SCREEN = 5;
const CARDINALS = ["North", "East", "South", "West"];

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
	this.chases;
	this.chasing = false;
	this.returning = false;
	this.animFrame = 0;
	this.animDelay = FRAME_DELAY;

	this.currentWaitTime = 0;

	this.canPatrol = false;
	this.isInCombat = false;

	this.minSpeed = 6;
	this.speedRange = 8;

	this.shotList = [];
	this.canShoot = false;

	this.distSinceLastFootstep = 0;
	const ENEMY_FOOTSTEP_DISTANCE = 8;

	this.init = function(name,enemyType,whichImage,colliderW,colliderH,chases=false,footstepImage=footStepsPic)
	{
		let randomDirIndex = Math.floor(Math.random() * (CARDINALS.length + 1));
		this.directionFaced = CARDINALS[randomDirIndex];
		this.shotList = [];
		this.bitmap = whichImage;
		this.chases = chases;
		this.chasing = false;
		this.footstepImage = footstepImage;
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
		} else if (this.chasing) {
			this.canMoveToNextTile(nextX, nextY)	
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
					this.directionFaced = "South";
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
					this.directionFaced = "North";
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
		}
		// draw footprints on the ground as we travel
		if (this.footstepImage) {
			this.distSinceLastFootstep += Math.hypot(nextX - this.centerX, nextY - this.centerY);
			if (this.distSinceLastFootstep >= ENEMY_FOOTSTEP_DISTANCE)
			{
				addGroundDecal({
					x: this.centerX,
					y: this.centerY + 16
				}, this.footstepImage)
			}
		}

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

	this.playerDetected = function() 
	{
		var nextX = this.centerX;
		var nextY = this.centerY;
		var radius = LEASH_LENGTH * 2;
		var distX = Math.abs((this.centerX) - player.centerX);
		var distY = Math.abs((this.centerX) - player.centerX);
		var diffX = distX - 20; // player width
		var diffY = distY - 20; // player height - both taken from collider data
	
		if ((diffX * diffX + diffY * diffY) <= (radius * radius)) 
		{	
			if (!this.returning) 
			{
				this.chasing = true;
				//console.log("chasing!");
			}
		} 
		else
		{
			if (!this.returning && !this.chasing) 
			{
				//console.log("at home ready to chase");
			} 
			else 
			{
				//console.log("returning");
				this.chasing = false;
				this.returning = true;
			}
		}
		
		if (this.chasing) {
			if (this.velX < 0) {
			this.velX = -this.velX;
			}
			if (this.velY < 0) {
			this.velY = -this.velY;
			}
			rotationTowardPlayer = Math.atan2(this.centerY - player.centerY, this.centerX - player.centerX);
			nextX -= Math.cos(rotationTowardPlayer) * this.velX;
			nextY -= Math.sin(rotationTowardPlayer) * this.velY;
			this.superClassMove(nextX,nextY);
		} else if (this.returning) {
			if (this.velX < 0) {
				this.velX = -this.velX;
			}
			if (this.velY < 0) {
				this.velY = -this.velY;
			}
			rotationTowardHome = Math.atan2(this.centerY - this.homeY, this.centerX - this.homeX);
			nextX -= Math.cos(rotationTowardHome) * this.velX;
			nextY -= Math.sin(rotationTowardHome) * this.velY;
			if (this.canMoveToNextTile(nextX, nextY)) {
				// all is well
			}
			else 
			{
				this.getUnstuck();
				this.returning = false;
				this.canPatrol = false;
			}
			if ((this.centerX <= this.homeX + LEASH_LENGTH &&
				this.centerX >= this.homeX - LEASH_LENGTH) &&
				(this.centerY <= this.homeY + LEASH_LENGTH &&
				this.centerY >= this.homeY - LEASH_LENGTH)) 
			{
				this.returning = false;
			}
		} // end of if this.returning
	}

	this.getUnstuck = function() 
	{	
		var path = [];
		var tileCheckDirectionX = 1;
		var tileCheckDirectionY = currentMapCols;

		if (this.centerX < this.homeX) 
		{
			tileCheckDirectionX = -1;
		}
		if (this.centerY > this.homeY) 
		{
			tileCheckDirectionY = -currentMapCols;
		}

		var enemyWorldIndex = getTileIndexAtRowCol(this.centerX,this.centerY, currentMapCols,currentMapRows);
		var homeWorldIndex = getTileIndexAtRowCol(this.homeX,this.homeY, currentMapCols,currentMapRows);
		var nextXMoveTile = indexToCenteredXY(enemyWorldIndex + tileCheckDirectionX);
		var nextYMoveTile = indexToCenteredXY(enemyWorldIndex + tileCheckDirectionY);

		if(!this.collider.collidingWithTerrain(nextXMoveTile.x,nextXMoveTile.y,false,0) && 
			!this.collider.collidingWithTerrain(nextXMoveTile.x,nextXMoveTile.y,false,1))
        {
			path.push(nextXMoveTile);

		}

		if(!this.collider.collidingWithTerrain(nextYMoveTile.x,nextYMoveTile.y,false,0) && 
			!this.collider.collidingWithTerrain(nextYMoveTile.x,nextYMoveTile.y,false,1))
        {
			path.push(nextYMoveTile);
		}
	}

	this.battle = function(playerCollider)
	{
		this.isInCombat = this.collider.isCollidingWithOtherCollider(playerCollider);

		if(this.isInCombat)
        {
            spawnFightParticles(this);
            playerSfx.attack.play();

			if(this.doesPlayerHaveAdvantage(player))
			{
				console.log ("bad guy bumped:NOT YET WORKING");
				calculateDamage(player.stats, this.stats);
				randomHitSound(true);
				handleEnemyRemovalAndXpDrop(this);
			}
			else
			{
				console.log ("player bumped:SHOULD WORK!");
				player.bumpAwayFrom(this.centerX, this.centerY);
			//	player.immunity();              // need to determine when damage occurs to start timer
				if(player.isImmune == false)
				{
					calculateDamage(this.stats, player.stats);
					randomHitSound();
				}
			}
		}

		if(this.canShoot)
		{
			if(Math.random() * 100 < 5)
			{
				rotationTowardPlayer = Math.atan2(this.centerY - player.centerY + randBtweenTwoNums(-30,30), this.centerX - player.centerX + randBtweenTwoNums(-30,30));
				enemySfx.shooting[randBtweenTwoNums(0,enemySfx.shooting.length - 1)].play();
				this.shotList.push(new projectileClass(this.centerX,this.centerY,8,8,50,50,rotationTowardPlayer,fightRune));
			}
		}

		for(var i = this.shotList.length - 1; i>=0;i--)
		{
			var projectile = this.shotList[i];
			projectile.move();
			if(projectile.isReadyToRemove())
			{
				projectile.reset();
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
		else if	((player.directionFaced == "East" && this.directionFaced == "West") ||
				(player.directionFaced == "West" && this.directionFaced == "East") ||
				(player.directionFaced == "North" && this.directionFaced == "South") ||
				(player.directionFaced == "South" && this.directionFaced == "North"))
		{
			return false;
		}
		else
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
		if(!this.collider.collidingWithTerrain(nextCenterX,nextCenterY,false,0) && !this.collider.collidingWithTerrain(nextCenterX,nextCenterY,false,1))
        {
            this.centerX = nextCenterX;
            this.centerY = nextCenterY;
            return true;
        }
        return false;
	}
}
