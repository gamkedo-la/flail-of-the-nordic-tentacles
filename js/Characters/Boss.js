bossClass.prototype = new enemyClass();

function bossClass()
{

	this.exp = new xpClass();//only for init level within a bracket appropriate to enemy
	this.stats = new statsClass();
	this.frame = {x: 0, y: 3}
	this.anims = new AnimManager(this);
	const { anims } = this;
	anims.add('walk-up', [
		{x:0, y:3},
		{x:1, y:3},
		{x:2, y:3},
		{x:3, y:3}
	], 0.1);
	anims.add('walk-down', [
		{x:0, y:0},
		{x:1, y:0},
		{x:2, y:0},
		{x:3, y:0}
	], 0.1);
	anims.add('walk-right',	[
		{x:0, y:1},
		{x:1, y:1},
		{x:2, y:1},
		{x:3, y:1}
	], 0.1);
	anims.add('walk-left', [
		{x:0, y:2},
		{x:1, y:2},
		{x:2, y:2},
		{x:3, y:2}
	],0.1);

	this.height = 60;
	this.width = 51;
	this.chases = true;
	
	this.superClassInit = this.init;
	this.init = function(name)
	{
		this.setupSpeed(4,5);
		this.setProjectile(true);
		this.superClassInit(name,'Boss',bossPic,51,60,this.chases);
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
		
		// UI variables
		let charTopLeftCoordX = this.centerX - this.width/2;
		let charTopRightCoordY = this.centerY - this.height/2;
		let frameX = anims.frameSource.x * this.width;
		let frameY = anims.frameSource.y * this.height; 

		if(debugState)
		{
			this.collider.draw();
			debugDrawHeading(this);
			// draw name
			drawText(this.charName, charTopLeftCoordX, charTopRightCoordY, 'black');
		}
		
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

		for(var i = 0; i<this.shotList.length;i++)
		{
			this.shotList[i].draw();
		}
	}
}
