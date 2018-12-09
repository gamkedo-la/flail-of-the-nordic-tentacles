tankClass.prototype = new enemyClass();

function tankClass()
{
	this.centerX = 75;
	this.centerY = 75;
	this.velX = 2.0;
	this.velY = 2.0;

	this.collider

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();

	this.directionFaced;
	this.animFrame = 0;
	this.animDelay = FRAME_DELAY;
	
	this.currentWaitTime = 0;

	this.canPatrol = false;
	this.isInCombat = false;
	this.isDefeated = false;

	this.init = function(name)
	{
		this.bitmap = tankPic;
		this.charName = name;
		this.collider = new colliderClass(this.centerX, this.centerY, 30, 30, 0, 20);
		this.exp.init('Tank');
		this.stats.init(this.exp.currentLvl,'Tank');
		this.reset();
	}

	this.superClassReset = this.reset;
	this.reset = function()
	{
		this.superClassReset();
	}

	this.superClassSetHome = this.setHome;

	this.superClassMove = this.move;
	this.move = function()
	{
		var nextX = this.centerX;
		var nextY = this.centerY;

		if(!this.superClassSentryCheck())
		{
			nextX += this.velX;
			nextY += this.velY;

			this.superClassMove(nextX,nextY);
		}

		this.collider.update(this.centerX,this.centerY);
	}

	this.superClassRandInitAI = this.randomizeInitAI;
	this.randomizeInitAI = function()
	{
		this.velX = 2 + Math.random() * 4;
		this.velY = 2 + Math.random() * 4;
		this.superClassRandInitAI();
	}

	this.superClassBattle = this.battle;
	this.superClassDoesPlayerHaveAdvantage = this.doesPlayerHaveAdvantage;
	this.battle = function(playerCollider)
	{
		if(this.superClassBattle(playerCollider))
		{
			if(this.superClassDoesPlayerHaveAdvantage(player))
			{
				// console.log(player.charName + " attacking " + this.charName);
				calculateDamage(player.stats, this.stats);
			}
			else
			{
				// console.log(this.charName + " attacking " + player.charName);
				calculateDamage(this.stats, player.stats);
			}
		}
		else
		{
			return;
		}
	}

	this.superClassSentryCheck = this.isSentryModeOn;

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
		
		drawText("Tank "+ this.charName, this.centerX - this.bitmap.width/4, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}
}