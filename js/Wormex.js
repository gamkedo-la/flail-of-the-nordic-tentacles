wormexClass.prototype = new enemyClass();

function wormexClass()
{
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(6,8);
		this.superClassInit(name,'Wormex',wormexPic);
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