//Levels Go Here
var testMap = {
	grid: [
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,100,100,100,100,100,100,
       101,101,101,101,101,101,101,101,101,101,101,101,101,100,100,101,100,100,100,100,100,100,
       100,101,101,101,101,101,101,101,101,101,101,101,101,100,102,100,100,100,500,100,300,100,
       100,100,101,101,101,101,101,101,101,101,101,101,101,101,100,102,100,100,501,505,100,100,
       103,100,101,101,101,101,101,101,101,101,101,101,101,101,101,100,102,100,502,503,504,100,
       103,103,100,100,101,101,100,100,100,100,100,100,100,100,100,100,102,100,100,100,100,100,
       103,103,103,103,103,100,100,100,100,100,100,100,100,100,102,102,102,100,100,100,100,100,
       103,103,103,103,103,103,100,100,100,100,100,100,100,102,102,100,100,100,100,100,100,100,
       103,103,103,103,103,103,100,100,100,100,102,102,102,102,100,100,100,100,100,100,100,100,
       103,103,103,103,100,100,100,100,100,100,102,100,100,100,100,100,100,100,100,100,100,100,
       103,103,100,100,100,100,100,100,100,100,102,100,100,100,100,100,100,100,100,104,104,100,
       100,102,102,102,102,102,102,102,102,102,102,100,100,100,100,100,100,100,104,104,104,104,
       103,100,100,100,100,100,100,100,100,100,102,100,100,100,100,100,100,104,104,104,104,104,
       103,103,100,100,100,100,100,100,100,100,102,102,102,102,102,102,102,105,104,104,104,104,
       103,103,103,100,103,103,100,100,100,100,100,100,100,100,100,100,100,104,104,104,104,104,
       103,103,103,103,103,103,100,100,100,100,100,100,100,100,100,100,104,104,104,104,104,104,
       103,103,103,103,103,103,100,100,100,100,100,100,100,100,100,100,104,104,104,104,104,104,],
    rows: 17,
    cols: 22,
    levelName: "testMap",
    enemies:[    {x:1329,y:280,type:0},     {x:1325,y:356,type:0},     {x:1318,y:445,type:0},     {x:838,y:691,type:0},     {x:834,y:521,type:0}, 
    {x:759,y:926,type:0},     {x:205,y:902,type:0},     {x:1241,y:1075,type:0},     {x:1168,y:1084,type:0}, 
    {x:1093,y:1082,type:0},     {x:1143,y:991,type:0}, ]
};

var enemyTest = {
	grid: [
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,
       100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,],
    rows: 17,
    cols: 22,
    levelName: "test",
	enemies:[{x:821,y:678,type:0}, {x:882,y:583,type:0}, {x:952,y:673,type:0}, ]
};

function saveMap(mapName, grid)
{
	console.log("saving map: " + mapName, grid);
	
	var gridString = "[";

	for(var row = 0; row < grid.mapRows; row++)
	{
		gridString += "\n       ";
		for(var col = 0; col < grid.mapCols; col++)
		{
			var tileIndex = roomTileToIndex(col,row, grid.mapCols);
			var tileType = grid.map[tileIndex];

			gridString += "" + tileType + ",";
		}
		
	}
	gridString += "],";

	console.log("grid: " + gridString + "\n    rows: " + grid.mapRows + "," + "\n    cols: " + grid.mapCols + "," + "\n    levelName: \"" + mapName + "\"," 
		+ "\n        enemies:" + spawnListSaveText());	
}

function loadMap(mapName)
{
	for(var i = 0; i < allLvls.length; i++)
	{
		if(allLvls[i].levelName == mapName)
		{
			worldMap = Array.from(allLvls[i].grid);
			handleCharacterPositions(i);
		}
		else
		{
			console.log("map doesn't exist!");
		}
	}
}

function handleCharacterPositions(whichLevel)
{
	player.hasEnterAnotherLevel = true;
	clearSpawnList();
	enemiesStartSpots = [];
	enemiesList = [];

	for(var i = 0; i < allLvls[whichLevel].enemies.length; i++)
	{
		console.log(allLvls[whichLevel].enemies[i].x,allLvls[whichLevel].enemies[i].y);
		addEnemyToSpawnList(allLvls[whichLevel].enemies[i].x,allLvls[whichLevel].enemies[i].y);
	}

	player.reset();
	findSpawnSpots();
	popEnemyList();
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].init(slimePic, "Slime " + i);
	}
	player.hasEnterAnotherLevel = false;
}
