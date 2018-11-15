//for saving,loading, etc. regarding maps
function levelsClass()
{
	//lvl objs go into levels array
	this.levelsContainer = [];

	this.saveMap = function(mapName, grid)
	{
		console.log("saving map: " + mapName, grid);
		
		this.levelsContainer.push({levelName: mapName, grid: grid});

		//string var for tile grid data
		// for(var col = 0; col < grid.mapCols; col++)
		// {
		// 	for(var row = 0; row < grid.mapRows; row++)
		// 	{
				//convert tile at col,row to string
		// 	}
		// }	
	}

	//this.convertTileToStringId()

	//this.convertStringToTileType()

	this.loadMap = function(mapName)
	{
		//loop through levels container and change map if found
		if(this.levelsContainer.length >= 1)
		{
			console.log("loading map");
			for(var i = 0; i < this.levelsContainer.length; i++)
			{
				if(this.levelsContainer[i].levelName == mapName)
				{
					worldMap = this.levelsContainer[i].grid.map;
					this.handleCharacterPositions();
				}
				else
				{
					console.log("map doesn't exist!");
				}
			}
		}
		else
		{
			console.log("no maps available");
		}
		
	}

	this.handleCharacterPositions = function()
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
}