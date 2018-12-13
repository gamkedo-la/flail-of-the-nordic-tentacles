tankClass.prototype = new enemyClass();

function tankClass()
{

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();
	
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(2,4);
		this.setProjectile(true);
		this.superClassInit(name,'Tank',tankPic,30,15);
		this.reset();
	}

	this.superClassMove = this.move;
	this.move = function()
	{
		var nextX = this.centerX;
		var nextY = this.centerY;

		if(!this.isSentryModeOn())
		{
			nextX += this.velX;
			nextY += this.velY;

			this.superClassMove(nextX,nextY);
		}
	}
}