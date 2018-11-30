function playerClass()
{
	this.centerX = 75;
	this.centerY = 75;
	this.hitbox = {radius: 15, x: this.centerX, y: this.centerY};
	this.velX = 12.0;
	this.velY = 12.0;

	this.exp = new xpClass();
	this.stats = new statsClass();

	this.goingNorth = false;
	this.goingSouth = false;
	this.goingWest = false;
	this.goingEast = false;

	this.directionFaced;
	this.animFrame = 0;
	this.animDelay = FRAME_DELAY;

	this.isInCombat = false;
	this.hasEnterAnotherLevel = false;
	this.isIdle = false;
	this.waitTimeForHpRegen = 0;

	this.setupInput = function(north,south,west,east)
	{
		this.ctrlNorth = north;
		this.ctrlSouth = south;
		this.ctrlWest = west;
		this.ctrlEast = east;
	}

	this.init = function(image, name)
	{
		this.bitmap = image;
		this.charName = name;
		this.exp.init('Ragnar');
		this.stats.init(this.exp.currentLvl,'Ragnar');
		this.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
		this.reset();
	}

	this.reset = function()
	{
		//reset player stats to last saved stats
		//reset player health, buffs, etc
		if(this.homeX == undefined || this.hasEnterAnotherLevel)
		{
			for(var i = 0; i < worldMap[0].length; i++)
			{
				if(worldMap[0][i] == TILE_PLAYER_NEW_GAME)
				{
					if(previousLvlName == null)
					{
						var tileRow = Math.floor(i/currentMapCols);
						var tileCol = i%currentMapCols;
						this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
						this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
					}

					worldMap[0][i] = TILE_SNOW;
				}
				if(previousLvlName == "snowTest")
				{
					if(worldMap[0][i] == TILE_BEACH_EXIT_DOOR || worldMap[0][i] == TILE_FOREST_EXIT_DOOR || worldMap[0][i] == TILE_MT_EXIT_DOOR)
					{
						var tileRow = Math.floor(i/currentMapCols);
						var tileCol = i%currentMapCols;
						tileRow--;
						this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
						this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
					}
				}
				if(worldMap[0][i] == TILE_BEACH_ENTRY_DOOR && previousLvlName == "beachTest")
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					tileRow++;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
				}
				if(worldMap[0][i] == TILE_FOREST_ENTRY_DOOR && previousLvlName == "forestTest")
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					tileCol--;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
				}
				if(worldMap[0][i] == TILE_MT_ENTRY_DOOR && previousLvlName == "mountainTest")
				{
					var tileRow = Math.floor(i/currentMapCols);
					var tileCol = i%currentMapCols;
					tileCol++;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
				}
			}
		}

		this.centerX = this.homeX;
		this.centerY = this.homeY;
	}

	this.move = function()
	{
		this.directionFaced = undefined;

		var nextX = this.centerX;
		var nextY = this.centerY;		

		if(this.goingNorth)
		{
			nextY -= this.velY;
		}	
		if(this.goingSouth)
		{
			nextY += this.velY;
		}
		if(this.goingWest)
		{
			nextX -= this.velX;
		}
		if(this.goingEast)
		{
			nextX += this.velX;
		}
		this.setDirectionFaced();

		var nextTileIndex = getTileIndexAtRowCol(nextX, nextY, currentMapCols, currentMapRows);
		var nextTileType = TILE_SNOW;

		if(nextTileIndex != undefined)
		{
			nextTileType = worldMap[0][nextTileIndex];

			this.pickupItemsIfAble(nextTileType, nextTileIndex);

			if(moveCharIfAble(nextTileType))
			{
				this.centerX = nextX;
				this.centerY = nextY;
			}
			else
			{
				handleLevelTransition(nextTileType);
			}
		}

		this.hitbox.x = this.centerX;
		this.hitbox.y = this.centerY;

		if(nextX == this.centerX && nextY == this.centerY)
			this.isIdle = true;
		else
			this.isIdle = false;

		regenPlayerHpIfAble(this,this.isIdle,this.isInCombat);
	}

	this.pickupItemsIfAble = function(itemType, itemIndex)
	{
		switch(itemType)
		{
			case TILE_HORN:
			case TILE_EYEPATCH:
			case TILE_BEACON:
			case TILE_TENCTACLE:
			case TILE_DICTIONARY:
			case TILE_WORMHOLE:
				worldMap[0][itemIndex] = TILE_SNOW;
				console.log("picked up item: " + getNameOfTile(itemType));
				break;
		}
	}

	this.setDirectionFaced = function()
	{
		//checking for W,E,S,N
		if(this.goingWest)
		{
			this.directionFaced = "West";
		}
		if(this.goingEast)
		{
			this.directionFaced = "East";
		}
		if(this.goingNorth)
		{
			this.directionFaced = "North";
		}
		if(this.goingSouth)
		{
			this.directionFaced = "South";
		}
		//checking for NW,NE,SW,SE
		if(this.goingNorth && this.goingWest)
		{
			this.directionFaced = "Northwest";
		}
		if(this.goingNorth && this.goingEast)
		{
			this.directionFaced = "Northeast";
		}
		if(this.goingSouth && this.goingWest)
		{
			this.directionFaced = "Southwest";
		}
		if(this.goingSouth && this.goingEast)
		{
			this.directionFaced = "Southeast";
		}
	}

	this.draw = function()
	{
		this.animDelay--;

		if(this.animDelay < 0)
		{
			this.animDelay = FRAME_DELAY;
			
			switch(this.directionFaced) {
				case "South":
					this.animFrame = 0;
					break;
				case "East":
					this.animFrame = 1;
					break;
				case "West":
					this.animFrame = 2;
					break;
				case "North":
					this.animFrame = 3;
					break;
			}
		}

		// drawCircle(this.hitbox.x, this.hitbox.y, this.hitbox.radius, 'yellow');
		
		// drawBitmapCenteredWithRot(this.bitmap, this.centerX, this.centerY, 0.0);

		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}
}