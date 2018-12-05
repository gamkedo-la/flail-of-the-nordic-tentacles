var maleViking = {
	centerX: 75,
	centerY: 75,
	collider: new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15),
	init: function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.reset();
	},
	reset: function()
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

					worldMap[0][i] = TILE_SNOW;
				}
			}
		}

		this.centerX = this.homeX;
		this.centerY = this.homeY;
		this.collider.setCollider(this.centerX, this.centerY);
	},
	draw: function()
	{
		this.collider.draw();

		drawText(""+ this.charName, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2);
	}
}

var femaleViking = {
	centerX: 75,
	centerY: 75,
	collider: new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15),
	init: function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.reset();
	},
	reset: function()
	{
		if(this.homeX == undefined)
		{
			for(var i = 0; i < worldMap[0].length; i++)
			{
				if(worldMap[0][i] == TILE_FEMALE_VIKING)
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;

					worldMap[0][i] = TILE_SNOW;
				}
			}
		}

		this.centerX = this.homeX;
		this.centerY = this.homeY;
		this.collider.setCollider(this.centerX, this.centerY);
	},
	draw: function()
	{
		this.collider.draw();

		drawText(""+ this.charName, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2);
	}
}

var seer = {
	centerX: 75,
	centerY: 75,
	collider: new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15),
	init: function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.reset();
	},
	reset: function()
	{
		if(this.homeX == undefined)
		{
			for(var i = 0; i < worldMap[0].length; i++)
			{
				if(worldMap[0][i] == TILE_SEER)
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;

					worldMap[0][i] = TILE_SNOW;
				}
			}
		}

		this.centerX = this.homeX;
		this.centerY = this.homeY;
		this.collider.setCollider(this.centerX, this.centerY);
	},
	draw: function()
	{
		this.collider.draw();

		drawText(""+ this.charName, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2);
	}
}

var outcast = {
	centerX: 75,
	centerY: 75,
	collider: new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15),
	init: function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.reset();
	},
	reset: function()
	{
		if(this.homeX == undefined)
		{
			for(var i = 0; i < worldMap[0].length; i++)
			{
				if(worldMap[0][i] == TILE_OUTCAST)
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;

					worldMap[0][i] = TILE_SNOW;
				}
			}
		}

		this.centerX = this.homeX;
		this.centerY = this.homeY;
		this.collider.setCollider(this.centerX, this.centerY);
	},
	draw: function()
	{
		this.collider.draw();

		drawText(""+ this.charName, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2, 'black');
		canvasContext.drawImage(this.bitmap, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2);
	}
}

// function npcClass()
// {
// 	this.centerX = 75;
// 	this.centerY = 75;

// 	this.collider;

// 	this.init = function(image, name)
// 	{
// 		this.bitmap = image;
// 		this.charName = name;
// 		this.reset();
// 	}

// 	this.reset = function()
// 	{
// 		if(this.homeX == undefined)
// 		{
// 			for(var i = 0; i < worldMap[0].length; i++)
// 			{
// 				if(worldMap[0][i] == TILE_MALE_VIKING)
// 				{
// 					var tileRow = Math.floor(i/currentMapCols);
// 					var tileCol = i%currentMapCols;
// 					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
// 					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;

// 					worldMap[0][i] = TILE_SNOW;
// 				}
// 			}
// 		}

// 		this.centerX = this.homeX;
// 		this.centerY = this.homeY;
// 		this.collider = new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15);
// 	}

// 	this.draw = function()
// 	{
// 		this.collider.draw();

// 		drawText(""+ this.charName, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2, 'black');
// 		canvasContext.drawImage(this.bitmap, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2);
// 	}
// };