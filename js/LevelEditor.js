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
	
	this.usableTiles = [
		[TILE_SNOW,TILE_OCEAN,TILE_ROAD,TILE_TREE,TILE_MOUNTAIN,TILE_AREA_DOOR],
		[TILE_HORN,TILE_EYEPATCH,TILE_TENCTACLE,TILE_WORMHOLE,TILE_DICTIONARY,TILE_BEACON]
	];

	this.tileToBeReplaced;

	this.init = function()
	{
		//give user control over size of map. use some html, css, and js magic for this
		this.grid.init(17, 22);
		this.selectedTileSet = this.usableTiles[this.tileSetIndex];
		this.selectedTileType = this.selectedTileSet[this.tileIndex];
	}

	this.update = function()
	{
		this.grid.draw();
		moveCamera(this.grid.mapCols, this.grid.mapRows);
		editorDebugTools();
		//check for saves/deletes
	}

	this.setTile = function()
	{
		console.log("setting tile to: " + this.selectedTileType);

		this.grid.setTile(mouseX, mouseY, this.selectedTileType);
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
			this.selectedTileSet = this.usableTiles[this.tileSetIndex];
		}
		else if(this.tileSetIndex < 0)
		{
			this.tileSetIndex = 0;
		}
		else
		{
			this.tileSetIndex = this.usableTiles.length - 1;
		}
		
		console.log(this.tileSetIndex);
	}
}

function runEditorInstance()
{
	clearInterval(gameLoop);
	gameIsRunning = !gameIsRunning;

	editor = new Editor();
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
	drawText("mouse x: " + mouseX + ", y: " + mouseY + ", tileIndex: " + editor.tileToBeReplaced, mouseX, mouseY, "red");
}