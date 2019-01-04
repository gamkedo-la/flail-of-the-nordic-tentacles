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

	this.init = function(name,enemyType,whichImage,colliderW,colliderH,footstepImage=footStepsPic)
	{
		let randomDirIndex = Math.floor(Math.random() * (CARDINALS.length + 1));
		this.directionFaced = CARDINALS[randomDirIndex];
		this.shotList = [];
		this.bitmap = whichImage;
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
				rotationTowardPlayer = Math.atan2(this.centerY - player.centerY + randBtweenTwoNums(-30,30), this.centerX - player.centerX + randBtweenTwoNums(-30,30)) ;
				enemySfx.shooting[randBtweenTwoNums(0,enemySfx.shooting.length - 1)].play();
				this.shotList.push(new projectileClass(this.centerX,this.centerY,8,8,50,rotationTowardPlayer,fightRune));
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
		debugDrawHeading(this);

		drawText(this.charName, this.centerX - this.bitmap.width/4, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS,
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);

		for(var i = 0; i<this.shotList.length;i++)
		{
			this.shotList[i].draw();
		}
	}
}
