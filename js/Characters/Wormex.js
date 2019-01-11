wormexClass.prototype = new enemyClass();

// var wormexTestEnemy = new wormexClass();

function wormexClass()
{

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();
	this.frame = {x: 0, y: 0}
	this.anims = new AnimManager(this);
	const { anims } = this;
	anims.add('walk-up', [
		{x:0, y: 0},
		{x:1, y: 0},
		{x:2, y: 0},
		{x:3, y: 0},
		{x:4, y: 0},
		{x:5, y: 0},
		{x:6, y: 0},
		{x:7, y: 0},
		{x:8, y: 0},
		{x:9, y: 0},
		{x:10, y: 0},
	], 0.1);
	anims.add('walk-down', [
		{x:0, y: 1},
		{x:1, y: 1},
		{x:2, y: 1},
		{x:3, y: 1},
		{x:4, y: 1},
		{x:5, y: 1},
		{x:6, y: 1},
		{x:7, y: 1},
		{x:8, y: 1},
		{x:9, y: 1},
		{x:10, y: 1},
	], 0.1);
	anims.add('walk-right', [
		{x:0, y: 2},
		{x:1, y: 2},
		{x:2, y: 2},
		{x:3, y: 2},
		{x:4, y: 2},
		{x:5, y: 2},
		{x:6, y: 2},
		{x:7, y: 2},
		{x:8, y: 2},
		{x:9, y: 2},
		{x:10, y: 2},
	], 0.1);

	this.width = 47;
	this.height = 42;
	this.chases = true;
		
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(6,8);
		this.superClassInit(name,'Wormex',wormexPic,20,15, this.chases);
		this.reset();
	}
	
	this.superClassMove = this.move;
	this.move = function()
	{
		var nextX = this.centerX;
		var nextY = this.centerY;

		if (this.playerDetected(this.chases)) 
		{	
			if (this.chasing) {
				if (this.velX < 0) {
					this.velX  = -this.velX;
				}
				if (this.velY < 0) {
					this.velY = -this.velY;
				}
				this.velX = nextX < player.centerX ? this.velX : -this.velX;
				this.velY = nextY < player.centerY ? this.velY : -this.velY;
				this.superClassMove(nextX,nextY);
			}
		}
		else if(!this.isSentryModeOn())
		{
			nextX += this.velX;
			nextY += this.velY;

			this.superClassMove(nextX,nextY);
		}
		this.anims.update(1/fps); 
	}
	
	this.draw = function()
	{
		if(this.velY > 0){
			anims.play('walk-down');
		}
		else anims.play('walk-up');
		// this.tickCount++;
		
		// if (this.tickCount > this.ticksPerFrame) // advance the frame
		// {
			
		// 	this.tickCount = 0;
			
		// 	if(this.frameIndex < this.numberOfFrames-1) // frame moves to the next number
		// 	{
		// 		this.frameIndex += 1;
		// 	} else  // frame moves from the last frame to the first frame 
		// 		{ 
		// 		this.frameIndex = 0;
		// 	}
		// }
		
		// this.sx = this.frameIndex * this.width;		// This is the Frame the Sprite is on	

		// debugDrawHeading(this)
		

		let frameX = anims.frameSource.x * this.width;
		let frameY = anims.frameSource.y * this.height; 
		this.collider.draw();
		drawText(this.charName, this.centerX - this.width/2, this.centerY - this.height/2, 'black');
		drawSprite(this.bitmap, frameX, frameY, this.width, this.height, this.centerX - this.width/2, this.centerY - this.height/2);
	}	
}