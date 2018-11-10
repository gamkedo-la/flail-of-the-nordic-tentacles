const PLAYER_SPEED = 12.0;

function playerClass()
{
	this.centerX = 75;
	this.centerY = 75;
	this.hitbox = {radius: 15, x: this.centerX, y: this.centerY};

	this.exp = new xpClass();
	this.stats = new statsClass();

	this.goingNorth = false;
	this.goingSouth = false;
	this.goingWest = false;
	this.goingEast = false;

	this.directionFaced;

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
		this.reset();
	}

	this.reset = function()
	{
		//reset player stats to last saved stats
		//reset player health, buffs, etc
		if(this.homeX == undefined)
		{
			for(var i = 0; i < worldMap.length; i++)
			{
				if(worldMap[i] == TILE_PLAYER)
				{
					var tileRow = Math.floor(i/W_COLS);
					var tileCol = i%W_COLS;
					this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
					this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
					worldMap[i] = TILE_SNOW;
					break;
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
			nextY -= PLAYER_SPEED;
		}	
		if(this.goingSouth)
		{
			nextY += PLAYER_SPEED;
		}
		if(this.goingWest)
		{
			nextX -= PLAYER_SPEED;
		}
		if(this.goingEast)
		{
			nextX += PLAYER_SPEED;
		}
		this.setDirectionFaced();

		var nextTileIndex = getTileIndexAtRowCol(nextX, nextY);
		var nextTileType = TILE_SNOW;

		if(nextTileIndex != undefined)
		{
			nextTileType = worldMap[nextTileIndex];

			if(moveCharIfAble(nextTileType))
			{
				this.centerX = nextX;
				this.centerY = nextY;
			}
		}

		this.hitbox.x = this.centerX;
		this.hitbox.y = this.centerY;
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
		// drawCircle(this.hitbox.x, this.hitbox.y, this.hitbox.radius, 'yellow');
		
		drawBitmapCenteredWithRot(this.bitmap, this.centerX, this.centerY, 0.0);
	}
}