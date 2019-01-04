//World related
function getTileSetRowForThisMode()
{
	if(gameIsRunning)
	{
		return currentMapTilesetRow;
	}
	else
	{
		if(editor.grid.mapTilesetRow == undefined)
			editor.grid.mapTilesetRow = 0;
		
		return editor.grid.mapTilesetRow;
	}
}

function getTileIndexAtRowCol(pxX, pxY, gridCols, gridRows)
{
	var tileCol = pxX / TILE_W;
	var tileRow = pxY / TILE_H;

	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	if(tileCol < 0 || tileCol >= gridCols ||
		tileRow < 0 || tileRow >= gridRows)
	{
		// console.log("TILE does not exist");
		return undefined;
	}

	var tileIndex = roomTileToIndex(tileCol, tileRow, gridCols);
	return tileIndex;
}

function roomTileToIndex(tileCol, tileRow, gridCols)
{
	return (tileCol + gridCols * tileRow);
}

function doesTileExistAtTileCoord(tileCol, tileRow, gridCols, map, layer)
{
	var tileIndex = roomTileToIndex(tileCol, tileRow, gridCols);
	return	(map[layer][tileIndex] != undefined);
}

function getNameOfTile(tileType)
{
	var tileName = "";

	switch(tileType)
	{
		case TILE_SNOW: tileName = "snow"; break;
		case TILE_OCEAN: tileName = "ocean"; break;
		case TILE_TREE: tileName = "tree"; break;
		case TILE_MOUNTAIN: tileName = "mountain"; break;
		case TILE_MT_ENTRY_DOOR: tileName = "mountain entry"; break;
		case TILE_MT_EXIT_DOOR: tileName = "mountain exit"; break;
		case TILE_FOREST_ENTRY_DOOR: tileName = "forest entry"; break;
		case TILE_FOREST_EXIT_DOOR: tileName = "forest exit"; break;
		case TILE_BEACH_ENTRY_DOOR: tileName = "beach entry"; break;
		case TILE_BEACH_EXIT_DOOR: tileName = "beach exit"; break;
		case TILE_SNOW_TO_BEACH: tileName = "snowy beach"; break;
		case TILE_BEACH_TO_OCEAN: tileName = "beach"; break;

		case TILE_SNOW_GRASS_1: tileName = "snowy grass 1"; break;
		case TILE_SNOW_GRASS_2: tileName = "snowy grass 2"; break;
		case TILE_SNOW_GRASS_3: tileName = "snowy grass 3"; break;
		case TILE_SNOW_GRASS_4: tileName = "snowy grass 4"; break;
		case TILE_SNOW_GRASS_5: tileName = "snowy grass 5"; break;
		case TILE_SNOW_GRASS_6: tileName = "snowy grass 6"; break;
		case TILE_SNOW_GRASS_7: tileName = "snowy grass 7"; break;
		case TILE_SNOW_GRASS_8: tileName = "snowy grass 8"; break;
		case TILE_SNOW_GRASS_9: tileName = "snowy grass 9"; break;
		case TILE_SNOW_GRASS_10: tileName = "snowy grass 10"; break;
		case TILE_SNOW_GRASS_11: tileName = "snowy grass 11"; break;
		case TILE_SNOW_GRASS_12: tileName = "snowy grass 12"; break;
		case TILE_SNOW_GRASS_13: tileName = "snowy grass 13"; break;

		case TILE_ROAD_HORIZONTAL: tileName = "horizontal road"; break;
		case TILE_ROAD_VERTICAL: tileName = "vertical road"; break;
		case TILE_ROAD_TOP_RIGHT_TURN: tileName = "top right road"; break;
		case TILE_ROAD_TOP_LEFT_TURN: tileName = "top left road"; break;
		case TILE_ROAD_BOTTOM_RIGHT_TURN: tileName = "bottom right road"; break;
		case TILE_ROAD_BOTTOM_LEFT_TURN: tileName = "bottom left road"; break;

		case TILE_FOREST_TREES_1: tileName = "tress 1";break;
		case TILE_FOREST_TREES_2: tileName = "trees 2"; break;
		case TILE_FOREST_TREES_3: tileName = "trees 3"; break;
		case TILE_FOREST_TREES_4: tileName = "trees 4"; break;
		case TILE_FOREST_TREES_5: tileName = "trees 5"; break;
		case TILE_FOREST_TREES_6: tileName = "trees 6"; break;
		case TILE_FOREST_TREES_7: tileName = "trees 7"; break;
		case TILE_FOREST_TREES_8: tileName = "trees 8"; break;
		case TILE_FOREST_TREES_9: tileName = "trees 9"; break;
		case TILE_FOREST_TREES_10: tileName = "trees 10"; break;
		case TILE_FOREST_TREES_11: tileName = "trees 11"; break;
		case TILE_FOREST_TREES_12: tileName = "trees 12"; break;
		case TILE_FOREST_TREES_13: tileName = "trees 13"; break;

		case TILE_PLAYER_NEW_GAME: tileName = "player start pos"; break;
		case TILE_WORMEX: tileName = "wormex"; break;
		case TILE_TANK: tileName = "tank"; break;
		case TILE_FALLEN: tileName = "fallen"; break;
		case TILE_VANGUARD: tileName = "vanguard"; break;
		case TILE_FEMALE_VIKING: tileName = "female viking"; break;
		case TILE_MALE_VIKING: tileName = "male viking"; break;
		case TILE_SEER: tileName = "the seer"; break;
		case TILE_OUTCAST: tileName = "the outcast"; break;

		case TILE_HORN: tileName = "horn"; break;
		case TILE_EYEPATCH: tileName = "eyepatch"; break;
		case TILE_TENCTACLE: tileName = "tentacle"; break;
		case TILE_WORMHOLE: tileName = "wormhole"; break;
		case TILE_DICTIONARY: tileName = "dictionary"; break;
		case TILE_BEACON: tileName = "beacon"; break;

		case TILE_RITUAL_TREE: tileName = "ritual tree"; break;
		case TILE_SNOWY_BUSH: tileName = "snowy bush"; break;
		case TILE_SNOWY_PIT: tileName = "snowy pit"; break;
		case TILE_TENT: tileName = "tent"; break;
		case TILE_SML_BUSH: tileName = "small bush"; break;

		case TILE_CUBE: tileName = "cube"; break;
		default: console.log("No name has been set for this tile!"); break;
	}

	return tileName;
}

function shouldDrawGroundUnderTile_NonItem(tileType)
{
	switch(tileType)
	{
		case TILE_BEACH_EXIT_DOOR:
 		case TILE_FOREST_EXIT_DOOR:
		case TILE_MT_EXIT_DOOR:
		case TILE_ROAD_HORIZONTAL:
		case TILE_ROAD_VERTICAL:
		case TILE_ROAD_TOP_RIGHT_TURN:
		case TILE_ROAD_BOTTOM_RIGHT_TURN:
		case TILE_ROAD_TOP_LEFT_TURN:
		case TILE_ROAD_BOTTOM_LEFT_TURN:
		case TILE_SNOW_GRASS_2: 
		case TILE_SNOW_GRASS_3: 
		case TILE_SNOW_GRASS_4: 
		case TILE_SNOW_GRASS_5: 
		case TILE_SNOW_GRASS_6: 
		case TILE_SNOW_GRASS_7: 
		case TILE_SNOW_GRASS_8: 
		case TILE_SNOW_GRASS_9: 
		case TILE_SNOW_GRASS_10:
		case TILE_SNOW_GRASS_11:
		case TILE_SNOW_GRASS_12:
		case TILE_SNOW_GRASS_13:
		case TILE_FOREST_TREES_2:
		case TILE_FOREST_TREES_3:
		case TILE_FOREST_TREES_4:
		case TILE_FOREST_TREES_5:
		case TILE_FOREST_TREES_6:
		case TILE_FOREST_TREES_7:
		case TILE_FOREST_TREES_8:
		case TILE_FOREST_TREES_9:
		case TILE_FOREST_TREES_10:
		case TILE_FOREST_TREES_11:
		case TILE_FOREST_TREES_12:
		case TILE_FOREST_TREES_13:
		return true;
	}

	return false;
}

function shouldDrawGroundUnderTile_Item(tileType)
{
	switch(tileType)
	{
		case TILE_HORN: 
		case TILE_EYEPATCH: 
		case TILE_BEACON: 
		case TILE_TENCTACLE: 
		case TILE_DICTIONARY: 
		case TILE_WORMHOLE:
		return true;
	}

	return false;
}

function DepthObject(x,y,drawX,drawY,image = null)
{
	this.x = x;
	this.y = y;
	this.image = image;

	this.draw = function()
	{
		canvasContext.drawImage(this.image,drawX,drawY);
	}
}