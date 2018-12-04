wormexClass.prototype = new enemyClass();

function wormexClass()
{
	this.centerX = 75;
	this.centerY = 75;
	this.hitbox = {radius: 15, x: this.centerX, y: this.centerY};
	this.velX = 3.0;
	this.velY = 3.0;

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();

	this.hasEnterAnotherLevel = false;

	this.directionFaced;
	this.animFrame = 0;
	this.animDelay = FRAME_DELAY;
	
	this.currentWaitTime = 0;

	this.canPatrol = false;
	this.isInCombat = false;
	this.isDefeated = false;

	this.init = function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.exp.init('Wormex');
		this.stats.init(this.exp.currentLvl,'Wormex');
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
		}//end of sentry check

		this.hitbox.x = this.centerX;
		this.hitbox.y = this.centerY + this.bitmap.height/4;
	}//end of this.move

	this.superClassRandInitAI = this.randomizeInitAI;
	this.randomizeInitAI = function()
	{
		this.velX = 4 + Math.random() * 8;
		this.velY = 4 + Math.random() * 8;
		this.superClassRandInitAI();
	}

	this.superClassBattle = this.battle;
	this.superClassDoesPlayerHaveAdvantage = this.doesPlayerHaveAdvantage;
	this.battle = function(player)
	{
		if(this.superClassBattle(player))
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

	//check if acting as sentry
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
		
		// drawBitmapCenteredWithRot(this.bitmap, this.centerX, this.centerY, 0.0);

		drawCircle(this.hitbox.x, this.hitbox.y, this.hitbox.radius, 'yellow');
		
		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}
}