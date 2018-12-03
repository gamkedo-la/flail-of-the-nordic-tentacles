function colliderClass(x,y,radius,xDeviation,yDeviation)
{
	this.xDeviation = xDeviation;
	this.yDeviation = yDeviation;

	this.x = x + this.xDeviation;
	this.y = y + this.yDeviation;
	this.radius = radius;

	this.setCollider = function(xPos,yPos)
	{
		this.x = xPos + this.xDeviation;
		this.y = yPos + this.yDeviation;
	}
	this.setCollider(this.x,this.y);

	this.isColliderWithOtherCollider = function(otherCollider)
	{
		let dx = this.hitbox.x - player.hitbox.x;
		let dy = this.hitbox.y - player.hitbox.y;
		let distance = Math.sqrt(dx*dx + dy*dy);

		if(distance < this.radius + otherCollider.radius)
			return true;
		else
			return false;
	}

	this.update = function(xPos,yPos)
	{
		this.setCollider(xPos,yPos);
	}

	this.draw = function()
	{
		drawCircle(this.x, this.y, this.radius, 'yellow');
	}
}