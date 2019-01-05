function animatedSprite(image,sw,sh)
{
	this.image = image;
	this.width = sw;
	this.height = sh;

	this.draw = function(sx,sy,x,y)
	{
		canvasContext.drawImage(this.image, sx, sy, this.width, this.height, 
							x-this.width*0.5, y-this.height*0.5, this.width, this.height);
	}
}

function drawSprite(SpritePic, spriteSheetSourceX, spriteSheetSourceY, spriteSheetFrameWidth, spriteSheetFrameHeight, centerX, centerY) 
{
	canvasContext.drawImage(SpritePic, spriteSheetSourceX, spriteSheetSourceY, spriteSheetFrameWidth, spriteSheetFrameHeight, 
							centerX, centerY, spriteSheetFrameWidth, spriteSheetFrameHeight);
}