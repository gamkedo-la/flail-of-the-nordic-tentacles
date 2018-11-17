//Levels Go Here
var testMap = {
	grid: [
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,100,100,100,100,100,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,100,104,104,100,100,100,100,100,100,100,100,100,103,103,103,101,101,101,101,
       101,101,100,104,104,104,104,100,102,500,505,504,102,106,100,103,103,103,103,101,101,101,
       101,101,100,104,104,104,104,104,102,501,502,503,102,106,103,103,103,103,103,101,101,101,
       101,101,100,104,104,104,105,100,100,102,102,102,300,106,100,100,103,103,103,101,101,101,
       101,101,100,100,100,104,100,100,100,100,100,100,100,100,100,100,103,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,
       101,101,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,101,101,101,
       101,101,101,100,108,108,108,108,108,108,108,108,108,108,108,108,100,101,101,101,101,101,
       101,101,101,101,109,109,109,109,109,109,109,109,109,109,109,109,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,
       101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,],
    rows: 17,
    cols: 22,
    levelName: "testMap",
        enemies:[
{x:1001,y:440,type:0}, {x:918,y:599,type:0}, {x:756,y:598,type:0}, ]
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
