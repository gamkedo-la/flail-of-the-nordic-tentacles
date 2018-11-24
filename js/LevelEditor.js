var editor;
var editorLoop;

function useEditorMode()
{
	if(gameIsRunning)
	{
		runEditorInstance();
	}
	else
	{
		runGameInstance();
	}
}

function Editor()
{
	this.grid = new TileGrid(TILE_SNOW);

	this.selectedTileType;
	this.selectedTileSet;
	this.tileSetIndex = 0;
	this.tileIndex = 0;

	this.currentLayer = 0;
	this.selectedLayer;
	
	this.usableTiles = [
		{setName: "placeholderTiles", tileSet: [TILE_SNOW,TILE_OCEAN,TILE_TREE,TILE_MOUNTAIN,TILE_MT_ENTRY_DOOR,TILE_MT_EXIT_DOOR,
												TILE_SNOW_TO_BEACH,TILE_BEACH_TO_OCEAN,TILE_CUBE]},
		{setName: "placeholderItems", tileSet: [TILE_HORN,TILE_EYEPATCH,TILE_TENCTACLE,TILE_WORMHOLE,TILE_DICTIONARY,TILE_BEACON]},
		{setName: "placeholderCharacters", tileSet: [TILE_PLAYER,TILE_WORMEX,TILE_TANK,TILE_FALLEN,TILE_VANGUARD]},
		{setName: "roadTiles", tileSet: [TILE_ROAD_HORIZONTAL,TILE_ROAD_VERTICAL,TILE_ROAD_BOTTOM_LEFT_TURN,TILE_ROAD_BOTTOM_RIGHT_TURN,
										TILE_ROAD_TOP_RIGHT_TURN,TILE_ROAD_TOP_LEFT_TURN]},
	];
	
	this.tileToBeReplaced;

	this.init = function()
	{
		this.grid.init(window.prompt("Enter the number of rows for this level:"), window.prompt("Enter the number of columns for this level:"));
		this.selectedTileSet = this.usableTiles[this.tileSetIndex].tileSet;
		this.selectedTileType = this.selectedTileSet[this.tileIndex];
		this.selectedLayer = 0;
	}

	this.update = function()
	{
		moveCamera(this.grid.mapCols, this.grid.mapRows);
		this.grid.draw();
		editorDebugTools();
		//check for saves/deletes
	}

	this.setTile = function()
	{
		if(this.selectedTileType == TILE_WORMEX)
		{
			addEnemyToSpawnList(mouseX + camPanX,mouseY + camPanY);
		}
		else
		{
			this.grid.setTile(mouseX, mouseY, this.selectedTileType, this.selectedLayer);
		}
	}

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
		console.log(this.tileIndex);
	}

	this.changeTileSet = function()
	{
		if(this.tileSetIndex >= 0 && this.tileSetIndex <= this.usableTiles.length - 1)
		{
			this.selectedTileSet = this.usableTiles[this.tileSetIndex].tileSet;
		}
		else if(this.tileSetIndex < 0)
		{
			this.tileSetIndex = 0;
		}
		else
		{
			this.tileSetIndex = this.usableTiles.length - 1;
		}
		
		console.log("Switched to: " + this.usableTiles[this.tileSetIndex].setName);
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

		console.log("Switched to layer: " + this.selectedLayer);
	}
}

function runEditorInstance()
{
	clearInterval(gameLoop);
	gameIsRunning = !gameIsRunning;

	clearSpawnList();
	editor = new Editor();

	console.log("WARNING!!! \n" + "Grid smaller than 8 rows by 10 columns are not supported!\n" + 
		"Anything bigger than that should be okay.");
	console.log("EDITOR GUIDE: \n" + "X: Deletes Spawns" + "\nMouse 0 (left click) sets tile" + "\nV: Save maps to console for copy/paste to code" + 
		"\nTAB: Exits editor mode" + "\nUp/Down Arrow: Changes tile set" + "\nLeft/Right Arrow: Change to specific tile within set" +
		"\nMouse click: Set tiles" + "\nF/H: Pans camera left/right" + "\nT/G: Pans camera up/down" + "\nNum 1/Num 2: Changes layers");

	editor.init();

	editorLoop = setInterval(editor.update.bind(editor), 1000/fps);
}

function runGameInstance()
{
	clearInterval(editorLoop);

	gameLoop = setInterval(updateAll, 1000/fps);
	gameIsRunning = !gameIsRunning;
	
	editor = null;
}

function editorDebugTools()
{
	var tileCol =  Math.floor((mouseX + camPanX)/TILE_W);
	var tileRow =  Math.floor((mouseY + camPanY)/TILE_H);
	editor.tileToBeReplaced = roomTileToIndex(tileCol, tileRow, editor.grid.mapCols);

	// drawCircle(camPanX, camPanY, 5, 'red');
	drawText("mouse x: " + (mouseX + camPanX) + ", y: " + (mouseY + camPanY) + ", tileIndex: " + editor.tileToBeReplaced, mouseX, mouseY, "red");
}