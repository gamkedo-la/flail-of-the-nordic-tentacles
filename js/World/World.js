const TILE_W = 80;
const TILE_H = 80;

//Tiles from 100 - 250;
const TILE_SNOW = 100;
const TILE_OCEAN = 101;
const TILE_TREE = 103;
const TILE_MOUNTAIN = 104;
const TILE_MT_ENTRY_DOOR = 105;

const TILE_SNOW_GRASS_1 = 106;

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

const TILE_SNOWY_BUSH = 147;
const TILE_RITUAL_TREE = 148;
const TILE_SNOWY_PIT = 149;
const TILE_TENT = 150;
const TILE_SML_BUSH = 151;

const TILE_SNOW_DUNE_1 = 152;
const TILE_SNOW_DUNE_2 = 153;
const TILE_SNOW_DUNE_3 = 154;
const TILE_SNOW_DUNE_4 = 155;
const TILE_SNOW_DUNE_5 = 156;
const TILE_SNOW_DUNE_6 = 157;
const TILE_SNOW_DUNE_7 = 158;
const TILE_SNOW_DUNE_8 = 159;
const TILE_SNOW_DUNE_9 = 160;
const TILE_SNOW_DUNE_10 = 161;
const TILE_SNOW_DUNE_11 = 162;
const TILE_SNOW_DUNE_12 = 163;

const TILE_ICE_1 = 164;
const TILE_ICE_2 = 165;
const TILE_ICE_3 = 166;
const TILE_ICE_4 = 167;
const TILE_ICE_5 = 168;
const TILE_ICE_6 = 169;
const TILE_ICE_7 = 170;
const TILE_ICE_8 = 171;
const TILE_ICE_9 = 172;
const TILE_ICE_10 = 173;
const TILE_ICE_11 = 174;
const TILE_ICE_12 = 175;
const TILE_ICE_13 = 176;
const TILE_ICE_14 = 177;

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
const TILE_BOSS = 309;

//Items from 500 - 650;
const TILE_HORN = 500;
const TILE_EYEPATCH = 501;
const TILE_TENCTACLE = 502;
const TILE_WORMHOLE = 503;
const TILE_DICTIONARY = 504;
const TILE_BEACON = 505;

//Layer Tests 900 - 999
const TILE_CUBE = 900;

var allLvls = [snowTest,beachTest,mountainTest,forestTest];
var currentLvlIndex = 0;

var currentMapRows = allLvls[currentLvlIndex].rows;
var currentMapCols = allLvls[currentLvlIndex].cols;
var currentMapTilesetRow = allLvls[currentLvlIndex].tilesetRow;

var currentMap = allLvls[currentLvlIndex].levelName;

var worldMap = [];
var objectsWithDepth = [];

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
				else if((tileType >= TILE_PLAYER_NEW_GAME && tileType <= TILE_FEMALE_VIKING) 
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

function drawTileBasedOnType(tileType, tileLeftEgdeX,tileTopEdgeY)
{
	var sx = 0;
	var sy = 0;
	var sWidth = 0;
	var sHeight = 0;
	var destX = 0;
	var destY = 0;
	var yScale = 0;
	var xScale = 0;

	if(((tileType >= TILE_SNOW && tileType <= TILE_BEACH_TO_OCEAN) || 
		(tileType >= TILE_BEACH_ENTRY_DOOR && tileType <= TILE_FOREST_EXIT_DOOR)) && gameIsRunning)
	{
		sy = TILE_H * currentMapTilesetRow;
	}

	if(((tileType >= TILE_SNOW && tileType <= TILE_BEACH_TO_OCEAN) || 
		(tileType >= TILE_BEACH_ENTRY_DOOR && tileType <= TILE_FOREST_EXIT_DOOR)) && !gameIsRunning)
	{
		if(editor.grid.mapTilesetRow == undefined)
			editor.grid.mapTilesetRow = 0;

		sy = TILE_H * editor.grid.mapTilesetRow;
	}

	switch(tileType)
	{
		case TILE_SNOW: break;
		case TILE_OCEAN: sx = TILE_W; break;
		case TILE_TREE: sx = TILE_W * 3; break;
		case TILE_MOUNTAIN: sx = TILE_W * 4; break;
		case TILE_MT_ENTRY_DOOR: sx = TILE_W * 5; break;
		case TILE_MT_EXIT_DOOR: sx = TILE_W * 6; break;
		case TILE_FOREST_ENTRY_DOOR: sx = TILE_W * 5; break;
		case TILE_FOREST_EXIT_DOOR: sx = TILE_W * 2; sy = TILE_H * 2; break;
		case TILE_BEACH_ENTRY_DOOR: sx = TILE_W * 5; break;
		case TILE_BEACH_EXIT_DOOR: sx = TILE_W * 6; break;
		case TILE_SNOW_TO_BEACH: sx = TILE_W * 7; break;
		case TILE_BEACH_TO_OCEAN: sx = TILE_W * 8; break;

		case TILE_ROAD_HORIZONTAL: break;
		case TILE_ROAD_VERTICAL: sx = TILE_W; break;
		case TILE_ROAD_TOP_LEFT_TURN: sx = TILE_W * 2; break;
		case TILE_ROAD_TOP_RIGHT_TURN: sx = TILE_W * 3; break;
		case TILE_ROAD_BOTTOM_RIGHT_TURN: sx = TILE_W * 4; break;
		case TILE_ROAD_BOTTOM_LEFT_TURN: sx = TILE_W * 5; break;

		case TILE_FOREST_TREES_1: break;
		case TILE_FOREST_TREES_2: sx = TILE_W; break;
		case TILE_FOREST_TREES_3: sx = TILE_W * 2; break;
		case TILE_FOREST_TREES_4: sx = TILE_W * 3; break;
		case TILE_FOREST_TREES_5: sx = TILE_W * 4; break;
		case TILE_FOREST_TREES_6: sx = TILE_W * 5; break;
		case TILE_FOREST_TREES_7: sx = TILE_W * 6; break;
		case TILE_FOREST_TREES_8: sx = TILE_W * 7; break;
		case TILE_FOREST_TREES_9: sx = TILE_W * 8; break;
		case TILE_FOREST_TREES_10: sx = TILE_W * 9; break;
		case TILE_FOREST_TREES_11: sx = TILE_W * 10; break;
		case TILE_FOREST_TREES_12: sx = TILE_W * 11; break;
		case TILE_FOREST_TREES_13: sx = TILE_W * 12; break;
		case TILE_FOREST_BIGTREE_1: yScale = 60; break;

		case TILE_SNOW_GRASS_2: sx = TILE_W; break;
		case TILE_SNOW_GRASS_3: sx = TILE_W * 2; break;
		case TILE_SNOW_GRASS_4: sx = TILE_W * 3; break;
		case TILE_SNOW_GRASS_5: sx = TILE_W * 4; break;
		case TILE_SNOW_GRASS_6: sx = TILE_W * 5; break;
		case TILE_SNOW_GRASS_7: sx = TILE_W * 6; break;
		case TILE_SNOW_GRASS_8: sx = TILE_W * 7; break;
		case TILE_SNOW_GRASS_9: sx = TILE_W * 8; break;
		case TILE_SNOW_GRASS_10: sx = TILE_W * 9; break;
		case TILE_SNOW_GRASS_11: sx = TILE_W * 10; break;
		case TILE_SNOW_GRASS_12: sx = TILE_W * 11; break;
		case TILE_SNOW_GRASS_13: sx = TILE_W * 12; break;

		case TILE_SNOWY_PIT: sx = TILE_W; sy = 0; break;

		case TILE_SNOW_DUNE_1: sx = TILE_W; break;
		case TILE_SNOW_DUNE_2: sx = TILE_W * 2; break;
		case TILE_SNOW_DUNE_3: sx = TILE_W * 3; break;
		case TILE_SNOW_DUNE_4: sx = TILE_W * 4; break;
		case TILE_SNOW_DUNE_5: sx = TILE_W * 5; break;
		case TILE_SNOW_DUNE_6: sx = TILE_W * 6; break;
		case TILE_SNOW_DUNE_7: sx = TILE_W * 7; break;
		case TILE_SNOW_DUNE_8: sx = TILE_W * 8; break;
		case TILE_SNOW_DUNE_9: sx = TILE_W * 9; break;
		case TILE_SNOW_DUNE_10: sx = TILE_W * 10; break;
		case TILE_SNOW_DUNE_11: sx = TILE_W * 11; break;
		case TILE_SNOW_DUNE_12: sx = TILE_W * 12; break;
		
		case TILE_ICE_1: sx = TILE_W; break;
		case TILE_ICE_2: sx = TILE_W * 2; break;
		case TILE_ICE_3: sx = TILE_W * 3; break;
		case TILE_ICE_4: sx = TILE_W * 4; break;
		case TILE_ICE_5: sx = TILE_W * 5; break;
		case TILE_ICE_6: sx = TILE_W * 6; break;
		case TILE_ICE_7: sx = TILE_W * 7; break;
		case TILE_ICE_8: sx = TILE_W * 8; break;
		case TILE_ICE_9: sx = TILE_W * 9; break;
		case TILE_ICE_10: sx = TILE_W * 10; break;
		case TILE_ICE_11: sx = TILE_W * 11; break;
		case TILE_ICE_12: sx = TILE_W * 12; break;
		case TILE_ICE_13: sx = TILE_W * 13; break;
		case TILE_ICE_14: sx = TILE_W * 14; break;

		default:
			sx = sy = 0;
			destX = destY = 0;
			xScale = yScale = 0;
			addToDepthSortedTiles(tileType,tileLeftEgdeX,tileTopEdgeY);
			return;
	}

	canvasContext.drawImage(worldPics[tileType], sx, sy, TILE_W+sWidth,TILE_H+sHeight, 
							tileLeftEgdeX+destX, tileTopEdgeY+destY,
							TILE_W+xScale, TILE_H+yScale);
}

function addToDepthSortedTiles(tileType, tileLeftEgdeX,tileTopEdgeY)
{
	var sx = 0;
	var sy = 0;
	var sWidth = 0;
	var sHeight = 0;
	var destX = 0;
	var destY = 0;
	var yScale = 0;
	var xScale = 0;
	var image = null;
	var depthGap = null;

	if(((tileType >= TILE_SNOW && tileType <= TILE_BEACH_TO_OCEAN) || 
		(tileType >= TILE_BEACH_ENTRY_DOOR && tileType <= TILE_FOREST_EXIT_DOOR)) && gameIsRunning)
	{
		sy = TILE_H * currentMapTilesetRow;
	}

	if(((tileType >= TILE_SNOW && tileType <= TILE_BEACH_TO_OCEAN) || 
		(tileType >= TILE_BEACH_ENTRY_DOOR && tileType <= TILE_FOREST_EXIT_DOOR)) && !gameIsRunning)
	{
		if(editor.grid.mapTilesetRow == undefined)
			editor.grid.mapTilesetRow = 0;

		sy = TILE_H * editor.grid.mapTilesetRow;
	}

	switch(tileType)
	{
		case TILE_MT_ENTRY_DOOR: sx = TILE_W * 5; break;
		case TILE_MT_EXIT_DOOR: sx = TILE_W * 6; break;
		case TILE_FOREST_ENTRY_DOOR: sx = TILE_W * 5; break;
		case TILE_FOREST_EXIT_DOOR: sx = TILE_W * 2; sy = TILE_H * 2; break;
		case TILE_BEACH_ENTRY_DOOR: sx = TILE_W * 5; break;
		case TILE_BEACH_EXIT_DOOR: sx = TILE_W * 6; break;
		case TILE_SNOW_TO_BEACH: sx = TILE_W * 7; break;
		case TILE_BEACH_TO_OCEAN: sx = TILE_W * 8; break;

		case TILE_FOREST_BIGTREE_1: yScale = 60; break;

		case TILE_RITUAL_TREE: break;
		case TILE_SNOWY_BUSH: sx = TILE_W * 2; sy = 0; break;
		case TILE_TENT: sx = 0; sy = TILE_H * 2; sWidth = sHeight = 80; destX = -40; destY = -60; xScale = yScale = 80; break;
		case TILE_SML_BUSH: sx = TILE_W * 3; sy = 0; sWidth = sHeight = -40; destX = destY = 20; xScale = yScale = -40; break;

		default:
			sx = sy = 0;
			destX = destY = 0;
			xScale = yScale = 0;
			break;
	}

	objectsWithDepth.push({cornerX:sx,cornerY:sy,centerY:tileTopEdgeY+40,destinationX:destX,destinationY:destY,scaleX:xScale,scaleY:yScale,
							type:tileType,width:sWidth,height:sHeight,left:tileLeftEgdeX,top:tileTopEdgeY});
}

function drawDepthSortedTiles()
{
	if(gameIsRunning)
	{		
		objectsWithDepth = objectsWithDepth.concat(enemiesList);
		objectsWithDepth = objectsWithDepth.concat([player]);

		if(currentMap == 'forestTest')
		{
		  objectsWithDepth = objectsWithDepth.concat([outcast,seer]);
		}

		objectsWithDepth = objectsWithDepth.concat(particles);

		objectsWithDepth.sort((objA, objB) => objA.centerY - objB.centerY);
	}

	for(var j = 0; j < objectsWithDepth.length;j++)
	{
		if(typeof objectsWithDepth[j].cornerX === 'undefined')
		{
			objectsWithDepth[j].draw();
		}
		else
		{
			canvasContext.drawImage(worldPics[objectsWithDepth[j].type], objectsWithDepth[j].cornerX, objectsWithDepth[j].cornerY, 
				TILE_W+objectsWithDepth[j].width,TILE_H+objectsWithDepth[j].height, 
							objectsWithDepth[j].left+objectsWithDepth[j].destinationX, objectsWithDepth[j].top+objectsWithDepth[j].destinationY,
							TILE_W+objectsWithDepth[j].scaleX, TILE_H+objectsWithDepth[j].scaleY);
		}
	}
}