//TODO: implement transitions between scenes like going from a dungeon to a town if town isn't in dungeon
const TILE_W = 80;
const TILE_H = 80;

//Tiles from 100 - 250;
const TILE_SNOW = 100;
const TILE_OCEAN = 101;
// const TILE_ROAD = 102; // TODO: Replace tile on spritesheet with single tile type
const TILE_TREE = 103;
const TILE_MOUNTAIN = 104;
const TILE_MT_ENTRY_DOOR = 105;
const TILE_SNOW_GRASS = 106;
const TILE_MT_EXIT_DOOR = 107;
const TILE_SNOW_TO_BEACH = 108;
const TILE_BEACH_TO_OCEAN = 109;
const TILE_ROAD_HORIZONTAL = 110;
const TILE_ROAD_VERTICAL = 111;
const TILE_ROAD_TOP_RIGHT_TURN = 112;
const TILE_ROAD_TOP_LEFT_TURN = 113;
const TILE_ROAD_BOTTOM_RIGHT_TURN = 114;
const TILE_ROAD_BOTTOM_LEFT_TURN = 115;


//Characters from 300 - 450;
const TILE_PLAYER = 300;
const TILE_WORMEX = 301;
const TILE_TANK = 302;
const TILE_FALLEN = 303;
const TILE_VANGUARD = 304;

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
var allLvls = [testMap,layerTest];
var currentLvlIndex = 0;

var currentMapRows = allLvls[currentLvlIndex].rows;
var currentMapCols = allLvls[currentLvlIndex].cols;

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

		if(tileType != undefined)
		{
			if(tileType != 000)
			{
				if(tileType == TILE_HORN || tileType == TILE_EYEPATCH || tileType == TILE_BEACON ||
				tileType == TILE_TENCTACLE || tileType == TILE_DICTIONARY || tileType == TILE_WORMHOLE)
				{
					canvasContext.drawImage(worldPics[TILE_SNOW], tileLeftEgdeX, tileTopEdgeY);
					canvasContext.drawImage(worldPics[tileType], 0, 0, 40,40, tileLeftEgdeX + 20, tileTopEdgeY + 20,
						worldPics[tileType].width,worldPics[tileType].height);
				}
				else if(tileType == TILE_PLAYER && !gameIsRunning)//specific to editor to prevent smear when player tile is placed
				{
					canvasContext.drawImage(worldPics[TILE_SNOW], tileLeftEgdeX, tileTopEdgeY);
					canvasContext.drawImage(worldPics[tileType], tileLeftEgdeX, tileTopEdgeY);
				}
				else
				{
					canvasContext.drawImage(worldPics[tileType], tileLeftEgdeX, tileTopEdgeY);
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
				outlineRect(tileLeftEgdeX, tileTopEdgeY, TILE_W, TILE_H, 'red');
			}
		}
	}
	else
	{
		// console.log("tile doesn't exist");
	}
}

function drawTileBasedOnType(tileType, tileLeftEgdeX,tileTopEdgeY)
{
	var xClipping = 0;
	var yClipping = 0;

	switch(tileType)
	{
		case TILE_SNOW:
			break;
		case TILE_OCEAN:
			xClipping = TILE_W;
			break;
		// case TILE_ROAD: // TODO: Replace tile on spritesheet with single tile type
		// 	xClipping = TILE_W * 2;
		// 	break;
		case TILE_TREE:
			xClipping = TILE_W * 3;
			break;
		case TILE_MOUNTAIN:
			xClipping = TILE_W * 4;
			break;
		case TILE_MT_ENTRY_DOOR:
			xClipping = TILE_W * 5;
			break;
		case TILE_MT_EXIT_DOOR:
			xClipping = TILE_W * 6;
			break;
		case TILE_SNOW_TO_BEACH:
			xClipping = TILE_W * 7;
			break;
		case TILE_BEACH_TO_OCEAN:
			xClipping = TILE_W * 8;
			break;
		case TILE_ROAD_HORIZONTAL:
			break;
		case TILE_ROAD_VERTICAL:
			xClipping = TILE_W;
			break;
		case TILE_ROAD_TOP_LEFT_TURN:
			xClipping = TILE_W * 2;
			break;
		case TILE_ROAD_TOP_RIGHT_TURN:
			xClipping = TILE_W * 3;
			break;
		case TILE_ROAD_BOTTOM_RIGHT_TURN:
			xClipping = TILE_W * 4;
			break;
		case TILE_ROAD_BOTTOM_LEFT_TURN:
			xClipping = TILE_W * 5;
			break;
		default:
			xClipping = 0;
			yClipping = 0;
			break;
	}

	canvasContext.drawImage(worldPics[tileType], xClipping, yClipping, TILE_W,TILE_H, tileLeftEgdeX, tileTopEdgeY,
					TILE_W, TILE_H);
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
			return false;
			break;
		case TILE_TREE:
			return false;
			break;
		case TILE_MOUNTAIN:
			return false;
			break;
		case TILE_MT_ENTRY_DOOR:
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
			loadMap("layerTest");
			break;
	}
}

function findSpawnSpots()
{
	spawnEnemiesSpawnList();

	//old tile based approach will be obsolete soon
	// for(var i = 0; i < worldMap.length; i++)
	// {
	// 	if(worldMap[i] == TILE_WORMEX)
	// 	{
	// 		// console.log("found enemy spawn at: " + i);
	// 		var tileRow = Math.floor(i/currentMapCols);
	// 		var tileCol = i%currentMapCols;
	// 		enemiesStartSpots.push({col: tileCol, row: tileRow});
	// 		worldMap[i] = TILE_SNOW;
	// 	}
	// }
}

function randomSpawn()
{
	if(enemiesStartSpots.length <= 0)
	{
		console.log("TRIED TO SPAWN MORE ENEMIES THAN ALLOWED");
		return;
	}
	var randSpot = Math.floor(Math.random() * enemiesStartSpots.length);
	var tempEnemy = new wormexClass();

	tempEnemy.randomizeInitAI();
	// console.log("homeX,homeY prior randSpawn: ", enemiesStartSpots[randSpot].col,enemiesStartSpots[randSpot].row);
	tempEnemy.setHome(enemiesStartSpots[randSpot].col,enemiesStartSpots[randSpot].row);
	enemiesStartSpots.splice(randSpot, 1);
	enemiesList.push(tempEnemy);
}