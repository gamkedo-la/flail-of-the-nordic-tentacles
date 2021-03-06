var editor;
var editorLoop;

function Editor()
{
	this.grid = new TileGrid(window.prompt('Choose initial canvas blanket (Snow - 100, Ocean - 101, Trees - 103, Mountains - 104): '));  //use const value from world js

	this.selectedTileType;
	this.selectedTileSet;
	this.tileSetIndex = 0;
	this.tileIndex = 0;

	this.currentLayer = 0;
	this.selectedLayer;
	
	this.usableTiles = [
		{setName: 'placeholderTiles', tileSet: [TILE_SNOW,TILE_OCEAN,TILE_TREE,TILE_MOUNTAIN,TILE_MT_ENTRY_DOOR,TILE_MT_EXIT_DOOR,
												TILE_FOREST_ENTRY_DOOR,TILE_FOREST_EXIT_DOOR,TILE_BEACH_ENTRY_DOOR,TILE_BEACH_EXIT_DOOR,
												TILE_SNOW_TO_BEACH,TILE_BEACH_TO_OCEAN,TILE_CUBE]},

		{setName: 'placeholderItems', tileSet: [TILE_HORN,TILE_EYEPATCH,TILE_TENCTACLE,TILE_WORMHOLE,TILE_DICTIONARY,TILE_BEACON]},

		{setName: 'placeholderCharacters', tileSet: [TILE_PLAYER_NEW_GAME,TILE_WORMEX,TILE_TANK,TILE_FALLEN,TILE_VANGUARD,
													TILE_SEER,TILE_OUTCAST,TILE_MALE_VIKING,TILE_FEMALE_VIKING]},

		{setName: 'roadTiles', tileSet: [TILE_ROAD_HORIZONTAL,TILE_ROAD_VERTICAL,TILE_ROAD_BOTTOM_LEFT_TURN,TILE_ROAD_BOTTOM_RIGHT_TURN,
										TILE_ROAD_TOP_RIGHT_TURN,TILE_ROAD_TOP_LEFT_TURN]},
										
		{setName: 'forestImpassibleTrees', tileSet: [TILE_FOREST_TREES_1,TILE_FOREST_TREES_2,TILE_FOREST_TREES_3,TILE_FOREST_TREES_4,
													TILE_FOREST_TREES_5,TILE_FOREST_TREES_6,TILE_FOREST_TREES_7,TILE_FOREST_TREES_8,TILE_FOREST_TREES_9,
													TILE_FOREST_TREES_10,TILE_FOREST_TREES_11,TILE_FOREST_TREES_12,TILE_FOREST_TREES_13]},

		{setName: 'snowy grass', tileSet: [TILE_SNOW_GRASS_1,TILE_SNOW_GRASS_2,TILE_SNOW_GRASS_3,TILE_SNOW_GRASS_4,TILE_SNOW_GRASS_5,TILE_SNOW_GRASS_6,
											TILE_SNOW_GRASS_7,TILE_SNOW_GRASS_8,TILE_SNOW_GRASS_9,TILE_SNOW_GRASS_10,TILE_SNOW_GRASS_11,TILE_SNOW_GRASS_12,
											TILE_SNOW_GRASS_13]},

		{setName: 'basic forest tiles', tileSet: [TILE_SNOWY_BUSH,TILE_RITUAL_TREE,TILE_TENT,TILE_SNOWY_PIT,TILE_SML_BUSH]},

		{setName: 'snow dunes', tileSet: [TILE_SNOW_DUNE_1,TILE_SNOW_DUNE_2,TILE_SNOW_DUNE_3,TILE_SNOW_DUNE_4,TILE_SNOW_DUNE_5,TILE_SNOW_DUNE_6,
										  TILE_SNOW_DUNE_7,TILE_SNOW_DUNE_8,TILE_SNOW_DUNE_9,TILE_SNOW_DUNE_10,TILE_SNOW_DUNE_11,TILE_SNOW_DUNE_12]},

		{setName: 'ice tiles', tileSet: [TILE_ICE_1,TILE_ICE_2,TILE_ICE_3,TILE_ICE_4,TILE_ICE_5,TILE_ICE_6,TILE_ICE_7,TILE_ICE_8,
										TILE_ICE_9,TILE_ICE_10,TILE_ICE_11,TILE_ICE_12,TILE_ICE_13,TILE_ICE_14]},
	];
	
	this.tileToBeReplaced;

	this.init = function()
	{
		this.grid.init(window.prompt('Enter the number of rows for this level:'), window.prompt('Enter the number of columns for this level:'));
		this.selectedTileSet = this.usableTiles[this.tileSetIndex].tileSet;
		this.selectedTileType = this.selectedTileSet[this.tileIndex];
		this.selectedLayer = 0;
	}

	this.update = function()
	{
		moveCamera(this.grid.mapCols, this.grid.mapRows);
		this.grid.draw();
		editorDebugTools();
	}

	this.setTile = function()
	{
		if(this.selectedTileType == TILE_WORMEX || 
			this.selectedTileType == TILE_TANK || 
			this.selectedTileType == TILE_FALLEN || 
			this.selectedTileType == TILE_VANGUARD)
		{
			addEnemyToSpawnList(mouseX + camPanX,mouseY + camPanY, this.selectedTileType);
		}
		else
		{
			this.grid.setTile(mouseX, mouseY, this.selectedTileType, this.selectedLayer);
		}
	}

	// this.change = function(Input1, Input2)
	// {

	// 	if(Input1  >= 0 && Input1  <= Input2.length - 1)
	// 	{
	// 		if (Input1 == this.tileIndex) // this.changeSelectedTileInTileSet
	// 		{			
	// 			this.selectedTileType = Input2[Input1];
	// 		}
	// 		else if (Input1 == this.tileSetIndex) // this.changeTileSet
	// 		{
	// 			this.tileIndex = 0;
	// 			this.selectedTileSet = Input2[Input1].tileSet;
	// 			this.selectedTileType = this.selectedTileSet[this.tileIndex];
	// 		} // 
	// 		else // this.changeLayer
	// 		{
	// 			this.tileIndex = 0;
	// 			this.selectedTileSet = Input1[Input1].tileSet;
	// 			this.selectedTileType = this.selectedTileSet[this.tileIndex];
	// 		}
	// 	}	
		
	// 	else if(Input1 < 0)
	// 	{
	// 		Input1 = 0;
	// 	}
	// 	else
	// 	{
	// 		Input1 = Input2.length - 1;
	// 	}
	// }
				
	// this.changeSelectedTileInTileSet = function()
	// {
	// 	this.change(this.tileIndex, this.selectedTileSet);
	// 	console.log('Tile const: ' + this.selectedTileType + ' ,' + getNameOfTile(this.selectedTileType));
	// }

	// this.changeTileSet = function()
	// {
	// 	this.change(this.tileSetIndex, this.usableTiles);
	// 	console.log('Switched to: ' + this.usableTiles[this.tileSetIndex].setName);
	// }

	// this.changeLayer = function()
	// {
	// 	this.change(this.currentLayer, this.grid.map);
	// 	console.log('Switched to layer: ' + this.selectedLayer);
	// }

	this.changeSelectedTileInTileSet = function()
	{
		if(this.tileIndex  >= 0 && this.tileIndex  <= this.selectedTileSet.length - 1)
		{
			this.selectedTileType = this.selectedTileSet[this.tileIndex];
		}
		else if(this.tileIndex < 0)
		{
			this.tileIndex = 0;
		}
		else
		{
			this.tileIndex = this.selectedTileSet.length - 1;
		}
		console.log('Tile const: ' + this.selectedTileType + ' ,' + getNameOfTile(this.selectedTileType));
	}

	this.changeTileSet = function()
	{
		if(this.tileSetIndex >= 0 && this.tileSetIndex <= this.usableTiles.length - 1)
		{
			this.tileIndex = 0;
			this.selectedTileSet = this.usableTiles[this.tileSetIndex].tileSet;
			this.selectedTileType = this.selectedTileSet[this.tileIndex];
		}
		else if(this.tileSetIndex < 0)
		{
			this.tileSetIndex = 0;
		}
		else
		{
			this.tileSetIndex = this.usableTiles.length - 1;
		}
		
		console.log('Switched to: ' + this.usableTiles[this.tileSetIndex].setName);
	}

	this.changeLayer = function()
	{
		if(this.currentLayer >= 0 && this.currentLayer <= this.grid.map.length - 1)
		{
			this.selectedLayer = this.currentLayer;
		}
		else if(this.currentLayer < 0)
		{
			this.currentLayer = 0;
		}
		else
		{
			this.currentLayer = this.grid.map.length - 1;
		}

		console.log('Switched to layer: ' + this.selectedLayer);
	}
}