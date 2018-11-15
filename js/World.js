//TODO: implement transitions between scenes like going from a dungeon to a town if town isn't in dungeon
const TILE_W = 80;
const TILE_H = 80;

const TILE_SNOW = 1;
const TILE_OCEAN = 2;
const TILE_ROAD = 3;
const TILE_TREE = 4;
const TILE_MOUNTAIN = 5;
const TILE_MT_ENTRY_DOOR = 7;

const TILE_PLAYER = 0;
const TILE_ENEMY = 6;

const TILE_HORN = 8;
const TILE_EYEPATCH = 9;
const TILE_TENCTACLE = 10;
const TILE_WORMHOLE = 11;
const TILE_DICTIONARY = 12;
const TILE_BEACON = 13;

var enemiesStartSpots = [];
var itemSpawnSpots = [];
/*--TODO: implement saved level maps data from lvl editor--*/
var allLvls = [testMap];
var currentLvlIndex = 0;

var currentMapRows = allLvls[currentLvlIndex].rows;
var currentMapCols = allLvls[currentLvlIndex].cols;

var worldMap = [];

worldMap = Array.from(allLvls[currentLvlIndex].grid);

function drawVisibleWorld(gridCols)
{
	var camLeftMostCol = Math.floor(camPanX/TILE_W);
	var camTopMostRow = Math.floor(camPanY/TILE_H);

	var colsThatFitOnScreen = Math.floor(canvas.width/TILE_W);
	var rowsThatFitOnScreen = Math.floor(canvas.height/TILE_H);

	//bug with editor not supporting grids bigger than 17x22 is most likely happening here.
	var camRightMostCol = camLeftMostCol + colsThatFitOnScreen + 4;
	var camBottomMostRow = camTopMostRow + rowsThatFitOnScreen + 2;

	for(var col = camLeftMostCol; col < camRightMostCol; col++)
	{
		for(var row = camTopMostRow; row < camBottomMostRow; row++)
		{
			if(gameIsRunning)
			{
				drawVisibleWorldHelper(col,row,gridCols,worldMap);
			}
			else
			{
				drawVisibleWorldHelper(col,row,gridCols,editor.grid.map);
			}			
		}
	}
}

function drawVisibleWorldHelper(col,row,gridCols,map)
{
	if(doesTileExistAtTileCoord(col,row, gridCols))
	{
		var tileIndex = roomTileToIndex(col,row, gridCols);
		var tileType = map[tileIndex];
		var tileLeftEgdeX = col * TILE_W;
		var tileTopEdgeY = row * TILE_H;

		if(tileType != undefined)
		{
			canvasContext.drawImage(worldPics[TILE_SNOW], tileLeftEgdeX, tileTopEdgeY);

			if(tileType == TILE_HORN || tileType == TILE_EYEPATCH || tileType == TILE_BEACON ||
			tileType == TILE_TENCTACLE || tileType == TILE_DICTIONARY || tileType == TILE_WORMHOLE)
			{
				canvasContext.drawImage(worldPics[tileType], tileLeftEgdeX + 20, tileTopEdgeY + 20);
			}
			else
			{
				canvasContext.drawImage(worldPics[tileType], tileLeftEgdeX, tileTopEdgeY);
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
		console.log("TILE does not exist");
		return undefined;
	}

	var tileIndex = roomTileToIndex(tileCol, tileRow, gridCols);
	return tileIndex;
}

function roomTileToIndex(tileCol, tileRow, gridCols)
{
	return (tileCol + gridCols * tileRow);
}

function doesTileExistAtTileCoord(tileCol, tileRow, gridCols)
{
	var tileIndex = roomTileToIndex(tileCol, tileRow, gridCols);
	return	(worldMap[tileIndex] != undefined);
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
			loadMap("testMap");
			break;
	}
}

function findSpawnSpots()
{
	for(var i = 0; i < worldMap.length; i++)
	{
		if(worldMap[i] == TILE_ENEMY)
		{
			// console.log("found enemy spawn at: " + i);
			var tileRow = Math.floor(i/currentMapCols);
			var tileCol = i%currentMapCols;
			enemiesStartSpots.push({col: tileCol, row: tileRow});
			worldMap[i] = TILE_SNOW;
		}
		// else if(worldMap[i] == TILE_ITEM)
		// {
		// 	var tileRow = Math.floor(i/W_COLS);
		// 	var tileCol = i%W_COLS;
		// 	itemSpawnSpots.push({col: tileCol, row: tileRow});
		// 	worldMap[i] = TILE_SNOW;
		// }
	}
}

function randomSpawn()
{
	if(enemiesStartSpots.length <= 0)
	{
		console.log("TRIED TO SPAWN MORE ENEMIES THAN ALLOWED");
		return;
	}
	var randSpot = Math.floor(Math.random() * enemiesStartSpots.length);
	var tempEnemy = new slimeClass();

	tempEnemy.randomizeInitAI();
	tempEnemy.setHome(enemiesStartSpots[randSpot].col,enemiesStartSpots[randSpot].row);
	enemiesStartSpots.splice(randSpot, 1);
	enemiesList.push(tempEnemy);
}