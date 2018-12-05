var maleViking = {
	x: 75,
	y: 75,
	init: function (image,name)
	{
		this.bitmap = image;
		this.charName = name;
		this.reset();
	},
	collider: new colliderClass(this.x, this.y, 20, 20, 0, 15),
	reset: function ()
	{
		if(this.homeX == undefined)
		{
			for(var i = 0; i < worldMap[0].length; i++)
			{
				if(worldMap[0][i] == TILE_MALE_VIKING)
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;

					// worldMap[0][i] = TILE_SNOW;
				}
			}
		}

		this.x = this.homeX;
		this.y = this.homeY;
	},
	draw: function()
	{
		this.collider.draw();

		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.x - this.bitmap.width/8, this.y - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}
}