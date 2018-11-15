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

function saveMap(mapName, grid)
{
	console.log("saving map: " + mapName, grid);
	
	//string var for tile grid data
	// for(var col = 0; col < grid.mapCols; col++)
	// {
	// 	for(var row = 0; row < grid.mapRows; row++)
	// 	{
			//convert tile at col,row to string
	// 	}
	// }	
}

//convertTileToStringId()
//convertStringToTileType()

function loadMap(mapName)
{
	for(var i = 0; i < allLvls.length; i++)
	{
		if(allLvls[i].levelName == mapName)
		{
			worldMap = Array.from(allLvls[currentLvlIndex].grid);
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
