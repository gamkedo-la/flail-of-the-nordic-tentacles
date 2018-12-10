tankClass.prototype = new enemyClass();

function tankClass()
{
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(2,4);
		this.setProjectile(true);
		this.superClassInit(name,'Tank',tankPic);
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