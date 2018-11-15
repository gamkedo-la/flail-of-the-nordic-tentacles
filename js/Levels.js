//Levels Go Here
var testMap = {
	grid:[
		2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
		2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
		2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,7,5,5,5,5,1,2,
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
		],
	rows: 17,
	cols: 22,
	levelName: "testMap"
}

var saveLoadTest = {
	grid: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           ],
    rows: 17,
    cols: 22,
    levelName: "saveLoadTest"
}

function saveMap(mapName, grid)
{
	console.log("saving map: " + mapName, grid);
	
	var gridString = "[";

	for(var col = 0; col < grid.mapCols; col++)
	{
		for(var row = 0; row < grid.mapRows; row++)
		{
			var tileIndex = roomTileToIndex(col,row, grid.mapCols);
			var tileType = grid.map[tileIndex];

			gridString += "" + tileType + ",";
		}
		gridString += "\n           ";
	}
	gridString += "],";

	console.log("grid: " + gridString + "\n    rows: " + grid.mapRows + "," + "\n    cols: " + grid.mapCols + "," + "\n    levelName: \"" + mapName + "\"" );	
}

function loadMap(mapName)
{
	for(var i = 0; i < allLvls.length; i++)
	{
		if(allLvls[i].levelName == mapName)
		{
			worldMap = Array.from(allLvls[i].grid);
			this.handleCharacterPositions();
		}
		else
		{
			console.log("map doesn't exist!");
		}
	}
	
}

function handleCharacterPositions()
{
	player.hasEnterAnotherLevel = true;
	enemiesStartSpots = [];
	enemiesList = [];
	player.reset();
	findSpawnSpots();
	popEnemyList();
	for(var i = 0; i < enemiesList.length; i++)
	{
		enemiesList[i].init(slimePic, "Slime " + i);
	}
	player.hasEnterAnotherLevel = false;
}
