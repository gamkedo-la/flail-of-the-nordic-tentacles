const TILE_W = 80;
const TILE_H = 80;

//Tiles from 100 - 250;
const TILE_SNOW = 100;
const TILE_OCEAN = 101;
const TILE_TREE = 103;
const TILE_MOUNTAIN = 104;
const TILE_MT_ENTRY_DOOR = 105;

const TILE_SNOW_GRASS_1 = 106;
const TILE_SNOW_GRASS_2 = 135;
const TILE_SNOW_GRASS_3 = 136;
const TILE_SNOW_GRASS_4 = 137;
const TILE_SNOW_GRASS_5 = 138;
const TILE_SNOW_GRASS_6 = 139;
const TILE_SNOW_GRASS_7 = 140;
const TILE_SNOW_GRASS_8 = 141;
const TILE_SNOW_GRASS_9 = 142;
const TILE_SNOW_GRASS_10 = 143;
const TILE_SNOW_GRASS_11 = 144;
const TILE_SNOW_GRASS_12 = 145;
const TILE_SNOW_GRASS_13 = 146;

const TILE_MT_EXIT_DOOR = 107;
const TILE_SNOW_TO_BEACH = 108;
const TILE_BEACH_TO_OCEAN = 109;

const TILE_ROAD_HORIZONTAL = 110;
const TILE_ROAD_VERTICAL = 111;
const TILE_ROAD_TOP_RIGHT_TURN = 112;
const TILE_ROAD_TOP_LEFT_TURN = 113;
const TILE_ROAD_BOTTOM_RIGHT_TURN = 114;
const TILE_ROAD_BOTTOM_LEFT_TURN = 115;

const TILE_FOREST_TREES_1 = 116;
const TILE_FOREST_TREES_2 = 117;
const TILE_FOREST_TREES_3 = 118;
const TILE_FOREST_TREES_4 = 119;
const TILE_FOREST_TREES_5 = 120;
const TILE_FOREST_TREES_6 = 121;
const TILE_FOREST_TREES_7 = 122;
const TILE_FOREST_TREES_8 = 123;
const TILE_FOREST_TREES_9 = 124;
const TILE_FOREST_TREES_10 = 125;
const TILE_FOREST_TREES_11 = 126;
const TILE_FOREST_TREES_12 = 127;
const TILE_FOREST_TREES_13 = 128;
const TILE_FOREST_TREES_14 = 129;

const TILE_BEACH_ENTRY_DOOR = 130;
const TILE_FOREST_ENTRY_DOOR = 131;
const TILE_BEACH_EXIT_DOOR = 132;
const TILE_FOREST_EXIT_DOOR = 133;

const TILE_FOREST_BIGTREE_1 = 134;


//Characters from 300 - 450;
const TILE_PLAYER_NEW_GAME = 300;
const TILE_WORMEX = 301;
const TILE_TANK = 302;
const TILE_FALLEN = 303;
const TILE_VANGUARD = 304;
const TILE_SEER = 305;
const TILE_OUTCAST = 306;
const TILE_MALE_VIKING = 307;
const TILE_FEMALE_VIKING = 308;

//Items from 500 - 650;
const TILE_HORN = 500;
const TILE_EYEPATCH = 501;
const TILE_TENCTACLE = 502;
const TILE_WORMHOLE = 503;
const TILE_DICTIONARY = 504;
const TILE_BEACON = 505;

//Layer Tests 900 - 999
const TILE_CUBE = 900;

var enemiesStartSpots = [];
var itemSpawnSpots = [];
var allLvls = [snowTest,beachTest,mountainTest,forestTest];
var currentLvlIndex = 0;

var currentMapRows = allLvls[currentLvlIndex].rows;
var currentMapCols = allLvls[currentLvlIndex].cols;
var currentMapTilesetRow = allLvls[currentLvlIndex].tilesetRow;

var worldMap = [];

worldMap = Array.from(allLvls[currentLvlIndex].gridLayers);

function drawVisibleWorld(gridCols, layer)
{
	var camLeftMostCol = Math.floor(camPanX/TILE_W);
	var camTopMostRow = Math.floor(camPanY/TILE_H);

	var colsThatFitOnScreen = Math.floor(canvas.width/TILE_W);
	var rowsThatFitOnScreen = Math.floor(canvas.height/TILE_H);

	var camRightMostCol = camLeftMostCol + colsThatFitOnScreen + 2;
	var camBottomMostRow = camTopMostRow + rowsThatFitOnScreen + 2;

	for(var col = camLeftMostCol; col < camRightMostCol; col++)
	{
		for(var row = camTopMostRow; row < camBottomMostRow; row++)
		{
			if(gameIsRunning)
			{
				drawVisibleWorldHelper(col,row,gridCols,worldMap,layer);
			}
			else
			{
				drawVisibleWorldHelper(col,row,gridCols,editor.grid.map, layer);
			}
		}
	}

	if(gameIsRunning === false)
	{
		drawEnemySpawns();
	}
}

function drawVisibleWorldHelper(col,row,gridCols,map,layer)
{
	if(doesTileExistAtTileCoord(col,row, gridCols,map,layer))
	{
		var tileIndex = roomTileToIndex(col,row, gridCols);
		var tileType = map[layer][tileIndex];
		var tileLeftEgdeX = col * TILE_W;
		var tileTopEdgeY = row * TILE_H;

		var setRowToUse = getTileSetRowForThisMode();

		if(tileType != undefined)
		{
			if(tileType != 000)
			{
				if(shouldDrawGroundUnderTile_Item(tileType))
				{
					canvasContext.drawImage(worldPics[TILE_SNOW], 0, TILE_H * setRowToUse, TILE_W,TILE_H, tileLeftEgdeX, tileTopEdgeY,
						TILE_W, TILE_H);
					canvasContext.drawImage(worldPics[tileType], 0, 0, 40,40, tileLeftEgdeX + 20, tileTopEdgeY + 20,
						worldPics[tileType].width,worldPics[tileType].height);
				}
				//else if is specific to editor to prevent smear when player tile is placed
				else if((tileType == TILE_PLAYER_NEW_GAME) || 
						(tileType == TILE_FEMALE_VIKING) ||
						(tileType == TILE_MALE_VIKING) ||
						(tileType == TILE_SEER) ||
						(tileType == TILE_OUTCAST) 
						&& !gameIsRunning)
				{
					canvasContext.drawImage(worldPics[TILE_SNOW], 0, TILE_H * setRowToUse, TILE_W,TILE_H, tileLeftEgdeX, tileTopEdgeY,
						TILE_W, TILE_H);
					canvasContext.drawImage(worldPics[tileType], tileLeftEgdeX, tileTopEdgeY);
				}
				else
				{
					if(shouldDrawGroundUnderTile_NonItem(tileType))
					{
						canvasContext.drawImage(worldPics[TILE_SNOW], 0, TILE_H * setRowToUse, TILE_W,TILE_H, tileLeftEgdeX, tileTopEdgeY,
						TILE_W, TILE_H);
					}
					
					drawTileBasedOnType(tileType, tileLeftEgdeX, tileTopEdgeY);
				}
			}		
		}
		else
		{
			console.log("Trying to draw an undefined tile: " + tileType);
		}

		if(!gameIsRunning)
		{
			if(editor.tileToBeReplaced == tileIndex)
			{	
				canvasContext.save();
				canvasContext.globalAlpha = 0.5;
				drawTileBasedOnType(editor.selectedTileType, tileLeftEgdeX,tileTopEdgeY)
				canvasContext.restore();
				
				outlineRect(tileLeftEgdeX, tileTopEdgeY, TILE_W, TILE_H, 'red');
			}
		}
	}
	else
	{
		// console.log("tile doesn't exist");
	}
}

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
		case TILE_FOREST_BIGTREE_1:
		// case TILE_FOREST_BIGTREE_1:
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

function drawTileBasedOnType(tileType, tileLeftEgdeX,tileTopEdgeY)
{
	var xClipping = 0;
	var yClipping = 0;

	//next two lines are for supporting tiles bigger than 80*80 px
	var yExtraHeight = 0;
	var xExtraWidth = 0;

	if(((tileType >= TILE_SNOW && tileType <= TILE_BEACH_TO_OCEAN) || 
		(tileType >= TILE_BEACH_ENTRY_DOOR && tileType <= TILE_FOREST_EXIT_DOOR)) && gameIsRunning)
	{
		yClipping = TILE_H * currentMapTilesetRow;
	}

	if(((tileType >= TILE_SNOW && tileType <= TILE_BEACH_TO_OCEAN) || 
		(tileType >= TILE_BEACH_ENTRY_DOOR && tileType <= TILE_FOREST_EXIT_DOOR)) && !gameIsRunning)
	{
		if(editor.grid.mapTilesetRow == undefined)
			editor.grid.mapTilesetRow = 0;

		yClipping = TILE_H * editor.grid.mapTilesetRow;
	}

	switch(tileType)
	{
		case TILE_SNOW: break;
		case TILE_OCEAN: xClipping = TILE_W; break;
		case TILE_TREE: xClipping = TILE_W * 3; break;
		case TILE_MOUNTAIN: xClipping = TILE_W * 4; break;
		case TILE_MT_ENTRY_DOOR: xClipping = TILE_W * 5; break;
		case TILE_MT_EXIT_DOOR: xClipping = TILE_W * 6; break;
		case TILE_FOREST_ENTRY_DOOR: xClipping = TILE_W * 5; break;
		case TILE_FOREST_EXIT_DOOR: xClipping = TILE_W * 6; break;
		case TILE_BEACH_ENTRY_DOOR: xClipping = TILE_W * 5; break;
		case TILE_BEACH_EXIT_DOOR: xClipping = TILE_W * 6; break;
		case TILE_SNOW_TO_BEACH: xClipping = TILE_W * 7; break;
		case TILE_BEACH_TO_OCEAN: xClipping = TILE_W * 8; break;

		case TILE_ROAD_HORIZONTAL: break;
		case TILE_ROAD_VERTICAL: xClipping = TILE_W; break;
		case TILE_ROAD_TOP_LEFT_TURN: xClipping = TILE_W * 2; break;
		case TILE_ROAD_TOP_RIGHT_TURN: xClipping = TILE_W * 3; break;
		case TILE_ROAD_BOTTOM_RIGHT_TURN: xClipping = TILE_W * 4; break;
		case TILE_ROAD_BOTTOM_LEFT_TURN: xClipping = TILE_W * 5; break;

		case TILE_FOREST_TREES_1: break;
		case TILE_FOREST_TREES_2: xClipping = TILE_W; break;
		case TILE_FOREST_TREES_3: xClipping = TILE_W * 2; break;
		case TILE_FOREST_TREES_4: xClipping = TILE_W * 3; break;
		case TILE_FOREST_TREES_5: xClipping = TILE_W * 4; break;
		case TILE_FOREST_TREES_6: xClipping = TILE_W * 5; break;
		case TILE_FOREST_TREES_7: xClipping = TILE_W * 6; break;
		case TILE_FOREST_TREES_8: xClipping = TILE_W * 7; break;
		case TILE_FOREST_TREES_9: xClipping = TILE_W * 8; break;
		case TILE_FOREST_TREES_10: xClipping = TILE_W * 9; break;
		case TILE_FOREST_TREES_11: xClipping = TILE_W * 10; break;
		case TILE_FOREST_TREES_12: xClipping = TILE_W * 11; break;
		case TILE_FOREST_TREES_13: xClipping = TILE_W * 12; break;
		case TILE_FOREST_BIGTREE_1: yExtraHeight = 60; break;

		case TILE_BEACH_ENTRY_DOOR: xClipping = TILE_W * 5; break;
		case TILE_FOREST_ENTRY_DOOR: xClipping = TILE_W * 5; break;
		case TILE_BEACH_EXIT_DOOR: xClipping = TILE_W * 6; break;
		case TILE_FOREST_EXIT_DOOR: xClipping = TILE_W * 6; break;

		case TILE_SNOW_GRASS_2: xClipping = TILE_W; break;
		case TILE_SNOW_GRASS_3: xClipping = TILE_W * 2; break;
		case TILE_SNOW_GRASS_4: xClipping = TILE_W * 3; break;
		case TILE_SNOW_GRASS_5: xClipping = TILE_W * 4; break;
		case TILE_SNOW_GRASS_6: xClipping = TILE_W * 5; break;
		case TILE_SNOW_GRASS_7: xClipping = TILE_W * 6; break;
		case TILE_SNOW_GRASS_8: xClipping = TILE_W * 7; break;
		case TILE_SNOW_GRASS_9: xClipping = TILE_W * 8; break;
		case TILE_SNOW_GRASS_10: xClipping = TILE_W * 9; break;
		case TILE_SNOW_GRASS_11: xClipping = TILE_W * 10; break;
		case TILE_SNOW_GRASS_12: xClipping = TILE_W * 11; break;
		case TILE_SNOW_GRASS_13: xClipping = TILE_W * 12; break;
		default:
			xClipping = 0;
			yClipping = 0;
			break;
	}

	canvasContext.drawImage(worldPics[tileType], xClipping, yClipping, TILE_W,TILE_H+yExtraHeight, tileLeftEgdeX, tileTopEdgeY-yExtraHeight,
					TILE_W, TILE_H+yExtraHeight);
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

function moveCharIfAble(tileType)
{
	switch(tileType)
	{
		case TILE_OCEAN:
		case TILE_TREE:
		case TILE_MOUNTAIN:
		case TILE_MT_ENTRY_DOOR:
		case TILE_FOREST_ENTRY_DOOR:
		case TILE_BEACH_ENTRY_DOOR:
		case TILE_FOREST_EXIT_DOOR:
		case TILE_MT_EXIT_DOOR:
		case TILE_BEACH_EXIT_DOOR:
		case TILE_FOREST_TREES_1:
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
	 	case TILE_FOREST_TREES_14:
	 	case TILE_FOREST_BIGTREE_1:
			return false;
			break;
		default:
			return true;
			break;
	}
}

function handleLevelTransition(doorType)
{
	switch(doorType)
	{
		case TILE_MT_ENTRY_DOOR:
			loadMap("mountainTest");
			break;
		case TILE_FOREST_ENTRY_DOOR:
			loadMap("forestTest");
			break;
		case TILE_BEACH_ENTRY_DOOR:
			loadMap("beachTest");
			break;
		case TILE_BEACH_EXIT_DOOR:
			loadMap("snowTest");
			break;
		case TILE_MT_EXIT_DOOR:
			loadMap("snowTest");
			break;
		case TILE_FOREST_EXIT_DOOR:
			loadMap("snowTest");
			break;
	}
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
		case TILE_EYEPATCH: tileName = "eye patch"; break;
		case TILE_TENCTACLE: tileName = "tentacle"; break;
		case TILE_WORMHOLE: tileName = "wormhole"; break;
		case TILE_DICTIONARY: tileName = "dictionary"; break;
		case TILE_BEACON: tileName = "beacon"; break;

		case TILE_CUBE: tileName = "cube"; break;
		default: console.log("No name has been set for this tile!"); break;
	}

	return tileName;
}