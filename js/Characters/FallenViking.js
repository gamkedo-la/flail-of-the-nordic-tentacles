fallenVikingClass.prototype = new enemyClass();

function fallenVikingClass()
{

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();
	this.frame = {x: 0, y: 0}
	this.anims = new AnimManager(this);
	const { anims } = this;
	anims.add('walk-up',
		[{x:2, y:0}],0.1);
	anims.add('walk-down',
		[{x:0, y:0}],0.1);
	anims.add('walk-right',
		[{x:1, y:0}],0.1);
	anims.add('walk-left',
		[{x:3, y:0}],0.1);

	this.height = 40;
	this.width = 40;
	this.chases = true;
	
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(3,5);
		this.superClassInit(name,'Fallen',fallenPic,30,15,this.chases);
		this.reset();
	}

	this.superClassMove = this.move;
	this.move = function()
	{
		var nextX = this.centerX;
		var nextY = this.centerY;

		if (this.chases) 
		{	
			this.playerDetected();
		}
		if(!this.isSentryModeOn() && !this.returning && !this.chasing)
		{
			nextX += this.velX;
			nextY += this.velY;

			this.superClassMove(nextX,nextY);
		}
		this.anims.update(1/fps); 
	}

	this.draw = function()
	{
		switch(this.directionFaced) 
		{
			case "South":
				anims.play('walk-down');
				break;
			case "East":
				anims.play('walk-left');
				break;
			case "West":
				anims.play('walk-right');
				break;
			case "North":
				anims.play('walk-up');
				break;
		}

		if(debugState)
		{
			this.collider.draw();
			debugDrawHeading(this);
		}

		// UI variables
		let charTopLeftCoordX = this.centerX - this.width/2;
		let charTopRightCoordY = this.centerY - this.height/2;
		let frameX = anims.frameSource.x * this.width;
		let frameY = anims.frameSource.y * this.height; 

		// draw name
		drawText(this.charName, charTopLeftCoordX, charTopRightCoordY, 'black');
		
		// draw sprite
		drawSprite(this.bitmap, frameX, frameY, this.width, this.height, charTopLeftCoordX, charTopRightCoordY);

		// draw health bar
		var healthBarHeight = 4;

		// eyepatch needed to see enemy health
		if (playerInventory.hasItem('eyepatch',1)) {
			drawRect(charTopLeftCoordX-1,charTopRightCoordY-1, this.width+2,healthBarHeight+2, '#004005'); // give a dark green 1px border
			drawRect(charTopLeftCoordX,charTopRightCoordY, this.width,healthBarHeight, 'white');
			drawRect(charTopLeftCoordX,charTopRightCoordY, Math.ceil(this.stats.hp / this.stats.maxHp * this.width),healthBarHeight, '#00ac0d');
		}
	}
}