function projectileClass()
{
	this.x;
	this.y;
	this.velX;
	this.velY;

	this.reset = function()
	{
		console.log("resetting projectile");
	}

	this.move = function()
	{
		this.x += this.velX;
		this.y += this.velY;
	}

	this.draw = function()
	{
		drawCircle(this.x,this.y, 10, "red");
	}
}