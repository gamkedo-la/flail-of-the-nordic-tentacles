wormexClass.prototype = new enemyClass();

var wormexTestEnemy = new wormexClass();

function wormexClass()
{

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();
	
	this.wormexPic = wormexPic;
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
	this.wormexMoveSpeed = 10;
		
	this.walkNorth = true;
	this.walkEast = false;
	this.walkSouth = false;
	this.walkWest = false;
	
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
				
		this.tickCount++; // acts as a counter
	
		if (this.tickCount > this.ticksPerFrame) // advance the frame
		{
			
			this.tickCount = 0;
	
			if(this.frameIndex < this.numberOfFrames-1) // frame moves to the next number
			{
				this.frameIndex += 1;
			} else  // frame moves from the last frame to the first frame 
				{ 
				this.frameIndex = 0;
			}
		}

		this.sx = this.frameIndex * this.width;		// This is the Frame the Sprite is on
		
		canvasContext.drawImage(this.wormexPic, this.sx, this.sy, this.width, this.height, this.velX, this.velY, this.width, this.height);
		
		/* for reference
		
			this.wormexPic, // 1.) Sprite Sheet reference 
			this.sx, // 2.) Source X, Frame Index 
			this.sy, // 3.) Source Y 3 
			this.width, // 4.) Frame width 
			this.height, // 5.) Frame height
			this.x, // 6.) Destination X 
			this.y, // 7.) Destination Y
			this.width, // 8.) Frame Width
			this.height); // 9.) Frame Height
		*/
	}	
}