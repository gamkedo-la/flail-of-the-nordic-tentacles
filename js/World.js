//TODO: implement transitions between scenes like going from a dungeon to a town if town isn't in dungeon
const TILE_W = 80;
const TILE_H = 80;
const W_ROWS = 17;
const W_COLS = 22;

var enemiesStartSpots = [];
var itemSpawnSpots = [];
/*--TODO: implement saved level maps data from lvl editor--*/
var worldMap = [
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
				2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
				2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,5,5,5,5,1,2,
				2,2,2,2,2,2,1,1,1,1,1,1,1,6,1,5,5,5,5,5,1,2,
				2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,6,5,5,5,5,1,2,
				2,2,2,2,2,2,2,2,1,1,1,1,6,1,1,6,5,5,5,1,1,2,
				2,1,1,2,2,2,2,2,1,1,1,1,1,1,6,1,1,3,1,1,1,2,
				2,1,1,2,2,2,2,2,1,1,13,1,1,1,1,1,1,3,1,1,1,2,
				2,1,1,1,1,2,2,2,1,1,8,0,12,1,1,1,3,3,1,1,1,2,
				2,1,1,1,2,2,2,3,1,1,9,10,11,1,1,3,3,1,1,2,1,2,
				2,1,6,1,2,2,2,1,3,1,1,1,1,3,3,3,1,1,4,2,2,2,
				2,1,1,6,1,1,1,1,1,3,3,3,3,3,1,1,1,4,4,2,2,2,
				2,1,1,1,6,1,1,1,1,1,1,1,3,1,1,4,4,4,4,2,2,2,
				2,1,1,6,1,1,1,1,1,1,1,6,3,3,4,4,4,4,4,2,2,2,
				2,6,1,1,1,1,1,1,1,6,1,1,6,1,4,4,4,4,4,2,2,2,
				2,1,1,1,1,1,1,1,1,1,6,1,1,1,1,1,1,1,2,2,2,2,
				2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
				];	

const TILE_SNOW = 1;
const TILE_OCEAN = 2;
const TILE_ROAD = 3;
const TILE_TREE = 4;
const TILE_MOUNTAIN = 5;

const TILE_PLAYER = 0;
const TILE_ENEMY = 6;

const TILE_AREA_DOOR = 7;
const TILE_HORN = 8;
const TILE_EYEPATCH = 9;
const TILE_TENCTACLE = 10;
const TILE_WORMHOLE = 11;
const TILE_DICTIONARY = 12;
const TILE_BEACON = 13;

function drawVisibleWorld(gridCols)
{
	var camLeftMostCol = Math.floor(camPanX/TILE_W);
	var camTopMostRow = Math.floor(camPanY/TILE_H);

	var colsThatFitOnScreen = Math.floor(canvas.width/TILE_W);
	var rowsThatFitOnScreen = Math.floor(canvas.height/TILE_H);

	var camRightMostCol = camLeftMostCol + colsThatFitOnScreen + 4;
	var camBottomMostRow = camTopMostRow + rowsThatFitOnScreen + 2;

	for(var col = camLeftMostCol; col < camRightMostCol; col++)
	{
		for(var row = camTopMostRow; row < camBottomMostRow; row++)
		{
			if(doesTileExistAtTileCoord(col,row, gridCols))
			{
				var tileIndex = roomTileToIndex(col,row, gridCols);
				var tileType = worldMap[tileIndex];
				var tileLeftEgdeX = col * TILE_W;
				var tileTopEdgeY = row * TILE_H;

				if(tileType != undefined)
				{
					canvasContext.drawImage(worldPics[TILE_SNOW], tileLeftEgdeX, tileTopEdgeY);
					canvasContext.drawImage(worldPics[tileType], tileLeftEgdeX, tileTopEdgeY);
				}	
				else
				{
					console.log("Trying to draw an undefined tile: " + tileType);
				}			
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
		case TILE_SNOW:
			return true;
			break;
		case TILE_ROAD:
			return true;
			break;
		case TILE_HORN:
			return true;
			break;
		case TILE_EYEPATCH:
			return true;
			break;
		case TILE_DICTIONARY:
			return true;
			break;
		case TILE_TENCTACLE:
			return true;
			break;
		case TILE_WORMHOLE:
			return true;
			break;
		case TILE_BEACON:
			return true;
			break;
		case TILE_OCEAN:
			return false;
			break;
		case TILE_TREE:
			return false;
			break;
		case TILE_MOUNTAIN:
			return false;
			break;
		default:
			return false;
			break;
	}
}

function findSpawnSpots()
{
	for(var i = 0; i < worldMap.length; i++)
	{
		if(worldMap[i] == TILE_ENEMY)
		{
			console.log("found enemy spawn at: " + i);
			var tileRow = Math.floor(i/W_COLS);
			var tileCol = i%W_COLS;
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