wormexClass.prototype = new enemyClass();

var wormexTestEnemy = new wormexClass();

const WORMEX_TIME_BETWEEN_CHANGE_DIR = 100;

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
	
	this.cyclesTilDirectionChange = 0;
	this.addedCyclesTilDirectionChange = 0;
	
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
	
	this.changeDirection = function() {
		if(this.walkNorth == true) 
		{
			this.walkNorth = false;
			this.walkEast = true;
		} 
		else if(this.walkWest == true) 
		{
			this.walkWest = false;
			this.walkNorth = true;
		} 
		else if(this.walkEast == true) 
		{
			this.walkEast = false;
			this.walkSouth = true;
		} 
		else if(this.walkSouth == true) 
		{
			this.walkSouth = false;
			this.walkWest = true;
		}	
	}

	this.superClassMove = this.move;
	this.move = function()
	{
		
		var nextX = this.x; 
		var nextY = this.y;
		
		this.cyclesTilDirectionChange--;
		// console.log(this.cyclesTilDirectionChange + "N: " + this.walkNorth + " S: " + this.walkSouth + " W: " + this.walkWest + " E: " + this.walkEast );
		if(this.cyclesTilDirectionChange <= 0) 
		{
			if(this.addedCyclesTilDirectionChange <= 0) 
			{
				this.cyclesTilDirectionChange = WORMEX_TIME_BETWEEN_CHANGE_DIR;
				this.changeDirection();
				this.addedCyclesTilDirectionChange++; 
			}
			else if(this.addedCyclesTilDirectionChange == 1) 
			{
				this.cyclesTilDirectionChange = WORMEX_TIME_BETWEEN_CHANGE_DIR;
				this.changeDirection();
				this.addedCyclesTilDirectionChange++;
			}
			else if(this.addedCyclesTilDirectionChange == 2) 
			{
				this.cyclesTilDirectionChange = WORMEX_TIME_BETWEEN_CHANGE_DIR;
				this.changeDirection();
				this.addedCyclesTilDirectionChange++;
			}
			else if(this.addedCyclesTilDirectionChange == 3) 
			{
				this.cyclesTilDirectionChange = WORMEX_TIME_BETWEEN_CHANGE_DIR;
				this.changeDirection();
				this.addedCyclesTilDirectionChange = 0;
		}
		
			// which directional image to use

		if(this.walkNorth) 
		{
			nextY -= this.wormexMoveSpeed;
			this.sy = 0;
			wormexDirection = "north";
		}
		
		if(this.walkSouth) 
		{
			nextY += this.wormexMoveSpeed;
			this.sy = 42;
			wormexDirection = "south";
		}
		if(this.walkWest) 
		{
			nextX -= this.wormexMoveSpeed;
			this.sy = 84; // need to flip the image 180 degrees
			wormexDirection = "west";
		}
		if(this.walkEast) 
		{
			nextX += this.wormexMoveSpeed;
			this.sy = 84;
			wormexDirection = "east";
		}
		
		
	}
			
			
		/*var nextX = this.centerX;
		var nextY = this.centerY;

		if(!this.isSentryModeOn())
		{
			nextX += this.velX;
			nextY += this.velY;

			this.superClassMove(nextX,nextY);
		} */
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
		
		canvasContext.drawImage(this.wormexPic, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width, this.height);
		
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