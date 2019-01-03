function projectileClass(startX,startY,vX,vY,time, rotation, image = undefined)
{
	this.x = startX;
	this.y = startY;
	this.velX = vX;
	this.velY = vY;
	this.life = time;
	this.image = image;
	this.rotation = rotation;

	this.reset = function()
	{
		console.log("projectile finished");
	}

	this.move = function()
	{
		this.life--;

		this.x -= Math.cos(this.rotation) * this.velX;
		this.y -= Math.sin(this.rotation) * this.velY;
	}

	this.draw = function()
	{
		if (this.image != undefined) {
			drawBitmapCenteredWithRot(this.image, this.x, this.y, this.rotation);
		} else {
			drawCircle(this.x,this.y, 5, "red"); // no projectile image - using default
		}
	}

	this.isReadyToRemove = function()
	{
		return this.life < 0;
	}
}