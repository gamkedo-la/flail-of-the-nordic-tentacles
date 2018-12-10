function projectileClass(startX,startY,vX,vY)
{
	this.x = startX;
	this.y = startY;
	this.velX = vX;
	this.velY = vY;
	this.life = 20;

	this.reset = function()
	{
		console.log("resetting projectile");
	}

	this.move = function()
	{
		this.life--;

		this.x += this.velX;
		this.y += this.velY;
	}

	this.draw = function()
	{
		drawCircle(this.x,this.y, 10, "red");
	}

	this.isReadyToRemove = function()
	{
		return this.life < 0;
	}
}