//Levels related
var areShortcutsEnabled = false;

function handleLevelTransition(doorType)
{
	switch(doorType)
	{
		case TILE_MT_ENTRY_DOOR:
			if(playerInventory.hasItem("horn",1))
				loadMap("mountainTest");
			break;
		case TILE_FOREST_ENTRY_DOOR:
			if(playerInventory.hasItem("eyepatch",1))
				loadMap("forestTest");
			break;
		case TILE_BEACH_ENTRY_DOOR:
			if(playerInventory.hasItem("tentacle",1))
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

function saveMap(mapName, grid)
{
	console.log("saving map: " + mapName, grid);

	var gridString = "[";

	for(var i = 0; i < grid.map.length; i++)
	{
		gridString += saveLayers(i,grid);
	}


	gridString += "],";

	console.log("var " + mapName + " = {\n" + "gridLayers: " + gridString + "\n    rows: " + grid.mapRows + "," + "\n    cols: "
		+ grid.mapCols + "," + "\n    levelName: \"" + mapName + "\"," + "\n    enemies:" + spawnListSaveText() + "};");
}

function saveLayers(layer,grid)
{
	var multiDimArray = "[";
	for(var row = 0; row < grid.mapRows; row++)
	{
		multiDimArray += "\n       ";
		for(var col = 0; col < grid.mapCols; col++)
		{
			var tileIndex = roomTileToIndex(col,row, grid.mapCols);
			var tileType = grid.map[layer][tileIndex];

			if(tileType == undefined)
			{
				multiDimArray += "000,";
			}
			else
			{
				multiDimArray += "" + tileType + ",";
			}
		}
	}
	multiDimArray += "],\n";

	return multiDimArray;
}

function loadMap(mapName)
{

  fadingTitles.begin(mapName);

  for(var i = 0; i < allLvls.length; i++)
  {
    if(allLvls[i].levelName == mapName)
    {
      currentMap = mapName;
	  if(gameIsRunning)
      {
        worldMap = [];

        currentLvlIndex = i;
        currentMapRows = allLvls[currentLvlIndex].rows;
        currentMapCols = allLvls[currentLvlIndex].cols;
        currentMapTilesetRow = allLvls[currentLvlIndex].tilesetRow;
        currentMap = allLvls[currentLvlIndex].levelName;

        worldMap = Array.from(allLvls[currentLvlIndex].gridLayers);
        handleCharacterPositions(currentLvlIndex);

        previousLvlName = mapName;
      }
      else
      {
        console.log("loading map " + allLvls[i].levelName + " in editor");
        editor.grid.map = [];

        editor.grid.mapRows = allLvls[i].rows;
        editor.grid.mapCols = allLvls[i].cols;
        editor.grid.mapTilesetRow = allLvls[i].tilesetRow;
        editor.grid.map = Array.from(allLvls[i].gridLayers);

        handleCharacterPositions(i);
      }
    }//end of map name check
  }//end of for loop
}