function drawSprite(SpritePic, spriteSheetSourceX, spriteSheetSourceY, spriteSheetFrameWidth, spriteSheetFrameHeight, centerX, centerY) 
{
	canvasContext.drawImage(SpritePic, spriteSheetSourceX, spriteSheetSourceY, spriteSheetFrameWidth, spriteSheetFrameHeight, 
							centerX, centerY, spriteSheetFrameWidth, spriteSheetFrameHeight);
}