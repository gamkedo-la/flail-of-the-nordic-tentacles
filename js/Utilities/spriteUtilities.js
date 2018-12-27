function drawSprite(tickCount, ticksPerFrame, frameIndex, SpritePic, spriteSheetSourceX, spriteSheetSourceY, spriteSheetFrameWidth, spriteSheetFrameHeight, centerX, centerY, spriteSheetFrameWidth, spriteSheetFrameHeight) 
	// when using this function, use "this." prior to each input.
	// example; 
	//		drawSprite(this.tickCount, this.ticksPerFrame, this.frameIndex, this.SpritePic, this.sx, this.sy, this.width, this.height, this.centerX, this.centerY, this.width, this.height)
{
	tickCount++; // acts as a counter
	
	if (tickCount > ticksPerFrame) // advance the frame
	{
		
		tickCount = 0;

		if(frameIndex < numberOfFrames-1) // frame moves to the next number
		{
			frameIndex += 1;
		} else  // frame moves from the last frame to the first frame 
			{ 
			frameIndex = 0;
		}
	}

	spriteSheetSourceX = frameIndex * spriteSheetFrameWidth;		// This is the Frame the Sprite is on
	
					
	canvasContext.drawImage(SpritePic, spriteSheetSourceX, spriteSheetSourceY, spriteSheetFrameWidth, spriteSheetFrameHeight, centerX, centerY, spriteSheetFrameWidth, spriteSheetFrameHeight);
		
}