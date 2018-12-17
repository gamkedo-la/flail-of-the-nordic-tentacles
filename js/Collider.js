function colliderClass(x,y,width,height,xDeviation,yDeviation)
{
	this.xDeviation = xDeviation;
	this.yDeviation = yDeviation;

	this.x = x + this.xDeviation;
	this.y = y + this.yDeviation;
	this.box = {};
	this.width = width;
	this.height = height;

	this.setCollider = function(xPos,yPos)
	{
		this.box.left = xPos - this.width*0.5 + this.xDeviation;
		this.box.right = xPos + this.width*0.5 + this.xDeviation;
		this.box.top = yPos - this.height*0.5 + this.yDeviation;
		this.box.bottom = yPos + this.height*0.5 + this.yDeviation;

		this.x = xPos + this.xDeviation;
		this.y = yPos + this.yDeviation;
	}
	this.setCollider(this.x,this.y);

	this.isCollidingWithOtherCollider = function(otherCollider)
	{
		if(this.box.left < otherCollider.box.right &&
			this.box.right > otherCollider.box.left &&
			this.box.top < otherCollider.box.bottom &&
			this.box.bottom > otherCollider.box.top)
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
		var x = Math.floor(this.box.left) + .5;
        var y = Math.floor(this.box.top) + .5;
		outlineRect(x,y, this.width,this.height, 'red');
	}

	this.collidingWithTerrain = function()
	{
		
	}
}