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
	//set up tiles array to select from 

	this.init = function()
	{
		this.grid.init(17, 22);
		this.selectedTileType = TILE_OCEAN;
	}

	this.update = function()
	{
		this.grid.draw();
		moveCamera(this.grid.mapCols, this.grid.mapRows);
		editorDebugTools();
		//check for changes to tile selection and reflect them
		//check for saves/deletes
	}

	this.setTile = function()
	{
		console.log("setting tile to: " + this.selectedTileType);

		this.grid.setTile(mouseX, mouseY, this.selectedTileType);
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
	//tile index being shown is wrong!
	var tileCol =  Math.floor(mouseX/TILE_W);
	var tileRow =  Math.floor(mouseY/TILE_H);
	var tileIndex = roomTileToIndex(tileCol, tileRow, editor.grid.mapCols);

	// drawCircle(camPanX, camPanY, 5, 'red');
	drawText("mouse x: " + tileCol + ", y: " + tileRow + ", tileIndex: " + tileIndex, mouseX, mouseY, "red");
}