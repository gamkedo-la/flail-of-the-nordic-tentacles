function playerClass()
{
	this.centerX = 75;
	this.centerY = 75;
	this.velX = 12.0;
	this.velY = 12.0;

	this.collider;

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

	this.item;

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
		this.collider = new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15);
		this.exp.init('Ragnar');
		this.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
		this.stats.init(this.exp.currentLvl,'Ragnar');
		this.reset();
	}

	this.reset = function()
	{
		//reset player stats to last saved stats
		resetPlayerHealth(this.stats);
		//reset player health, buffs, etc
		if(this.homeX == undefined || this.hasEnterAnotherLevel)
		{
			for(var i = 0; i < worldMap[0].length; i++)
			{
				placePlayerAtThisSpot(this,i);
			}
		}

		this.centerX = this.homeX;
		this.centerY = this.homeY;
	}

	this.move = function()
	{
		if(this.stats.isCharacterDead)
		{
			console.log("The Player has died!");
			player.reset();
		}

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
		
		if(nextX == this.centerX && nextY == this.centerY)
			this.isIdle = true;
		else
			this.isIdle = false;

		this.collider.update(nextX,nextY);

		var nextTileIndTL = getTileIndexAtRowCol(this.collider.box.left,this.collider.box.top,currentMapCols,currentMapRows);
        var nextTileIndTR = getTileIndexAtRowCol(this.collider.box.right,this.collider.box.top,currentMapCols,currentMapRows);
        var nextTileIndBR = getTileIndexAtRowCol(this.collider.box.right,this.collider.box.bottom,currentMapCols,currentMapRows);
        var nextTileIndBL = getTileIndexAtRowCol(this.collider.box.left,this.collider.box.bottom,currentMapCols,currentMapRows);
        
        var nextTileIndex = getTileIndexAtRowCol(nextX,nextY,currentMapCols,currentMapRows);
		var nextTileType = TILE_SNOW;

		if(nextTileIndex != undefined)
		{
			nextTileTypeTR = worldMap[0][nextTileIndTR];
			nextTileTypeTL = worldMap[0][nextTileIndTL];
			nextTileTypeBR = worldMap[0][nextTileIndBR];
			nextTileTypeBL = worldMap[0][nextTileIndBL];
			nextTileType = worldMap[0][nextTileIndex];

			//pass in the next tile type and add a collider box to the tile if it's solid and then check if the colliders are colliding
			this.pickupItemsIfAble(nextTileTypeTR,nextTileTypeTL,nextTileTypeBR,nextTileTypeBL, 
									nextTileIndTL, nextTileIndTR, nextTileIndBR, nextTileIndBL);

			//pass in collider here plus the next tile type and add a collider box to the tile if it's solid and then check if the colliders are colliding
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

		this.collider.update(this.centerX,this.centerY);

		if(currentMap == 'forestTest' && seer.collider != undefined)
			handleNpcCollisions(this.collider);
	}

	this.pickupItemsIfAble = function(itemTypeTR,itemTypeTL,itemTypeBR,itemTypeBL, indexTL,indexTR,indexBR,indexBL)
	{
		if((itemTypeTR == TILE_HORN ||
			itemTypeTR == TILE_BEACON ||
			itemTypeTR == TILE_TENCTACLE ||
			itemTypeTR == TILE_EYEPATCH ||
			itemTypeTR == TILE_DICTIONARY ||
			itemTypeTR == TILE_WORMHOLE))
		{
			worldMap[0][indexTR] = TILE_SNOW;
			console.log('I picked up a '+ itemTypeTR +'.');
			itemPickedUp();
			this.item = getNameOfTile(itemTypeTR);
		}
		else if((itemTypeTL == TILE_HORN ||
			itemTypeTL == TILE_BEACON ||
			itemTypeTL == TILE_TENCTACLE ||
			itemTypeTL == TILE_EYEPATCH ||
			itemTypeTL == TILE_DICTIONARY ||
			itemTypeTL == TILE_WORMHOLE))
		{
			worldMap[0][indexTL] = TILE_SNOW;
			console.log("I picked up a "+ itemTypeTL +".");
			itemPickedUp();
			this.item = getNameOfTile(itemTypeTL);
		}
		else if((itemTypeBR == TILE_HORN ||
			itemTypeBR == TILE_BEACON ||
			itemTypeBR == TILE_TENCTACLE ||
			itemTypeBR == TILE_EYEPATCH ||
			itemTypeBR == TILE_DICTIONARY ||
			itemTypeBR == TILE_WORMHOLE))
		{
			worldMap[0][indexBR] = TILE_SNOW;
			console.log("I picked up a "+ itemTypeBR +".");
			itemPickedUp();
			this.item = getNameOfTile(itemTypeBR);
		}
		else if((itemTypeBL == TILE_HORN ||
			itemTypeBL == TILE_BEACON ||
			itemTypeBL == TILE_TENCTACLE ||
			itemTypeBL == TILE_EYEPATCH ||
			itemTypeBL == TILE_DICTIONARY ||
			itemTypeBL == TILE_WORMHOLE))
		{
			worldMap[0][indexBL] = TILE_SNOW;
			console.log("I picked up a "+ itemTypeBL +".");
			itemPickedUp();
			this.item = getNameOfTile(itemTypeBL);
		}

		if(this.item == undefined)
			this.item = "nothing";

		// switch(itemType)
		// {
		// 	case TILE_HORN:
		// 	case TILE_EYEPATCH:
		// 	case TILE_BEACON:
		// 	case TILE_TENCTACLE:
		// 	case TILE_DICTIONARY:
		// 	case TILE_WORMHOLE:
		// 		worldMap[0][indexTL] = TILE_SNOW;
		// 		worldMap[0][indexTR] = TILE_SNOW;
		// 		worldMap[0][indexBR] = TILE_SNOW;
		// 		worldMap[0][indexBL] = TILE_SNOW;
		// 		console.log("picked up item: " + getNameOfTile(itemType));
		// 		break;
		// }
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

		this.collider.draw();

		canvasContext.drawImage(this.bitmap, this.animFrame * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.centerX - this.bitmap.width/8, this.centerY - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}
}

function handleNpcCollisions(playerCollider)
{
	if(playerCollider.isCollidingWithOtherCollider(maleViking.collider))
	{
		console.log("Talking with: " + maleViking.charName);
	}
	else if(playerCollider.isCollidingWithOtherCollider(femaleViking.collider))
	{
		console.log("Talking with: " + femaleViking.charName);
	}
	else if(playerCollider.isCollidingWithOtherCollider(seer.collider))
	{
		console.log("Talking with: " + seer.charName);
	}
	else if(playerCollider.isCollidingWithOtherCollider(outcast.collider))
	{
		console.log("Talking with: " + outcast.charName);
	}
	else
	{
		return;
	}
}

function placePlayerAtThisSpot(p,i)
{
	if(worldMap[0][i] == TILE_PLAYER_NEW_GAME)
	{
		if(previousLvlName == null)
		{
			var tileRow = Math.floor(i/currentMapCols);
			var tileCol = i%currentMapCols;
			p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
			p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
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
			p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
			p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
		}
	}
	if(worldMap[0][i] == TILE_BEACH_ENTRY_DOOR && previousLvlName == "beachTest")
	{
		var tileRow = Math.floor(i/currentMapCols);
		var tileCol = i%currentMapCols;
		tileRow++;
		p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
		p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
	}
	if(worldMap[0][i] == TILE_FOREST_ENTRY_DOOR && previousLvlName == "forestTest")
	{
		var tileRow = Math.floor(i/currentMapCols);
		var tileCol = i%currentMapCols;
		tileCol--;
		p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
		p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
	}
	if(worldMap[0][i] == TILE_MT_ENTRY_DOOR && previousLvlName == "mountainTest")
	{
		var tileRow = Math.floor(i/currentMapCols);
		var tileCol = i%currentMapCols;
		tileCol++;
		p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
		p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
	}
}