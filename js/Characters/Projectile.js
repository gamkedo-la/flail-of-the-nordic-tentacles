function projectileClass(startX,startY,vX,vY,time, rotation, image = undefined)
{
	this.x = startX;
	this.y = startY;
	this.velX = vX;
	this.velY = vY;
	this.life = time;
	this.damage = 50;
	this.radius = 5;
	var noImage = true;
	this.image = image;
	if (this.image != undefined) 
	{
		noImage = false;
	}
	this.width = (!noImage) ? this.image.width : this.radius * 2;
	this.height = (!noImage) ? this.image.height : this.radius * 2;
	if (noImage) 
	{
		this.collider = new colliderClass(this.x,this.y,this.width - 2,this.height - 2,0,0);
	}
	else 
	{
		this.collider = new colliderClass(this.x,this.y,this.width - 10,this.height - 16,0,0);
	}
	this.collided = false;
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
		this.collider.update(this.x,this.y);
		if (this.collider.isCollidingWithOtherCollider(player.collider) &&
			!this.collided) 
		{
			this.collided = true;
			player.stats.hp -= this.damage;
			if (player.stats.hp <= 0)
			{
				player.stats.isCharacterDead = true;
			}
			this.life = 0;
		}
	}

	this.draw = function()
	{
		if (this.image != undefined) 
		{
			drawBitmapCenteredWithRot(this.image, this.x, this.y, this.rotation);
		} 
		else 
		{
			drawCircle(this.x,this.y, this.radius, "blue"); // no projectile image - using default
		}

		if (debugState) 
		{
			this.collider.draw();
		}
	}

	this.isReadyToRemove = function()
	{
		return this.life < 0;
	}
}