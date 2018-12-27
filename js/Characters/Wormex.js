wormexClass.prototype = new enemyClass();

var wormexTestEnemy = new wormexClass();

function wormexClass()
{

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();
	
	this.SpritePic = wormexPic;
	this.x = 150;
	this.y = 150;
	this.sx = 0;
	this.sy = 0;
	this.tickCount = 0;
	this.frameIndex = 0;
	this.width = 47;
	this.height = 42;
	this.numberOfFrames = 11;
	this.ticksPerFrame = 5;
		
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(6,8);
		this.superClassInit(name,'Wormex',wormexPic,20,15);
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
	
	this.draw = function()
	{
				
		drawSprite(this.tickCount, this.ticksPerFrame, this.frameIndex, this.SpritePic, this.sx, this.sy, this.width, this.height, this.centerX, this.centerY, this.width, this.height)

	}	
}