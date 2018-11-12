function TileGrid(initTile)
{
	this.map;
	this.mapRows;
	this.mapCols;

	this.initTileType = initTile;

	this.init = function(rows, cols)
	{
		this.map = new Array(rows * cols);
		this.mapRows = rows;
		this.mapCols = cols;
		this.reset(this.initTileType);
	}

	this.reset = function(initTileType)
	{
		for(var i = 0; i < this.map.length; i++)
		{
			this.map[i] = initTileType;
		}
	}

	this.setTile = function(mouseX, mouseY, tileType)
	{
		// var camLeftMostCol = Math.floor(camPanX/TILE_W);
		// var camTopMostRow = Math.floor(camPanY/TILE_H);

		// var colsThatFitOnScreen = Math.floor(canvas.width/TILE_W);
		// var rowsThatFitOnScreen = Math.floor(canvas.height/TILE_H);

		// var camRightMostCol = camLeftMostCol + colsThatFitOnScreen + 4;
		// var camBottomMostRow = camTopMostRow + rowsThatFitOnScreen + 2;

		//tiles are being drawn but at wrong location. this isn't accounting for the camera position... i think?
		var tileCol =  Math.floor(mouseX/TILE_W);
		var tileRow =  Math.floor(mouseY/TILE_H);
		var tileIndex = roomTileToIndex(tileCol, tileRow, this.mapCols);

		this.map[tileIndex] = tileType;
	}

	this.draw = function()
	{
		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY);

		drawVisibleWorld(this.mapCols);

		canvasContext.restore();
	}
}