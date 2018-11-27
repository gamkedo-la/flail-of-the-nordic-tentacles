//Levels Go Here
var testMap = {
	gridLayers: [[
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,100,100,100,100,100,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,100,104,104,100,100,112,110,110,110,113,100,100,103,103,103,101,101,101,101,
       101,101,100,104,104,104,104,100,111,500,502,504,111,106,100,103,103,103,103,101,101,101,
       101,101,100,104,104,104,104,104,111,501,503,505,111,106,103,103,103,103,103,101,101,101,
       101,101,100,104,104,104,105,100,114,110,110,110,115,106,100,100,103,103,103,101,101,101,
       101,101,100,100,100,104,100,100,100,100,100,100,300,100,100,100,103,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,101,
       101,101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,101,101,
       101,101,101,101,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,],

       [
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,900,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,],],

    rows: 17,
    cols: 22,
    levelName: "testMap",
        enemies:[
{x:1001,y:440,charType:301}, {x:918,y:599,charType:301}, {x:756,y:598,charType:301}, ]
};

var layerTest = {
gridLayers: [[
       100,100,100,100,112,113,100,100,100,100,
       100,100,100,100,111,111,100,100,100,100,
       100,100,100,112,115,114,113,100,100,100,
       100,100,100,114,113,112,115,100,100,100,
       100,100,100,100,111,111,300,100,100,100,
       100,100,100,100,114,115,108,108,108,100,
       100,100,100,100,100,100,109,109,109,100,
       100,100,100,100,100,100,101,101,101,100,],
[
       000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,900,000,
       000,000,000,000,000,000,000,900,900,000,
       000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,
       000,000,000,000,000,000,000,000,000,000,],
],
    rows: 8,
    cols: 10,
    levelName: "layerTest",
        enemies:[
{x:696,y:167,charType:301}, {x:683,y:119,charType:301}, {x:600,y:101,charType:301}, {x:631,y:131,charType:301}, ]};

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
		+ grid.mapCols + "," + "\n    levelName: \"" + mapName + "\","
		+ "\n        enemies:" + spawnListSaveText() + "};");
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
  for(var i = 0; i < allLvls.length; i++)
  {
    if(allLvls[i].levelName == mapName)
    {
      if(gameIsRunning)
      {
        worldMap = [];

        currentLvlIndex = i;
        currentMapRows = allLvls[currentLvlIndex].rows;
        currentMapCols = allLvls[currentLvlIndex].cols;

        worldMap = Array.from(allLvls[i].gridLayers);
        handleCharacterPositions(i);
      }
      else
      {
        console.log("loading map " + allLvls[i].levelName + " in editor: ");
        editor.grid.map = [];

        editor.grid.rows = allLvls[i].rows;
        editor.grid.cols = allLvls[i].cols;
        editor.grid.map = Array.from(allLvls[i].gridLayers);
        //handleCharPositions for editor case
        handleCharacterPositions(i);
      }
    }//end of map name check
  }//end of for loop
}

function handleCharacterPositions(whichLevel)
{
  if(gameIsRunning)
  {
    player.hasEnterAnotherLevel = true;
    clearSpawnList();
    enemiesStartSpots = [];
    enemiesList = [];

    for(var i = 0; i < allLvls[whichLevel].enemies.length; i++)
    {
      //TODO: uncomment last argurment once code to handle pics/class based on charType is implemented both in inital map and another test level
      addEnemyToSpawnList(allLvls[whichLevel].enemies[i].x,allLvls[whichLevel].enemies[i].y, allLvls[whichLevel].enemies[i].charType);
    }

    player.reset();
    findSpawnSpots();
    popEnemyList();
    for(var i = 0; i < enemiesList.length; i++)
    {
      enemiesList[i].init(wormexPic, "Wormex " + i);
    }
    player.hasEnterAnotherLevel = false;
  }
	else
  {
    //we are in editor mode and now need to load enemies
    for(var i = 0; i < allLvls[whichLevel].enemies.length; i++)
    {
      addEnemyToSpawnList(allLvls[whichLevel].enemies[i].x,allLvls[whichLevel].enemies[i].y, allLvls[whichLevel].enemies[i].charType);
    }
    //need a way to store player start tile for editor as it will be erased upon level transitions
  }
}
