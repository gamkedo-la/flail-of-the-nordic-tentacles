function TileGrid(initTile)
{
	this.map;
	this.mapRows;
	this.mapCols;
	this.mapTilesetRow;

	this.initTileType = initTile;

	this.init = function(rows, cols)
	{
		this.mapRows = rows;
		this.mapCols = cols;
		this.map = new Array(new Array(rows * cols), new Array(rows * cols));
		this.reset(this.initTileType);
	}

	this.reset = function(initTileType)
	{
		for(var i = 0; i < this.map[0].length; i++)
		{
			this.map[0][i] = initTileType;
		}
	}

	this.setTile = function(mouseX, mouseY, tileType, layer)
	{
		var tileCol =  Math.floor((mouseX + camPanX)/TILE_W);
		var tileRow =  Math.floor((mouseY + camPanY)/TILE_H);
		var tileIndex = roomTileToIndex(tileCol, tileRow, this.mapCols);

		console.log("Setting layer: " + layer + "\nAt index: " + tileIndex + "\nTo: " + tileType);
		this.map[layer][tileIndex] = tileType;
	}

	this.draw = function()
	{
		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY);

		//draw at layer 0
		drawVisibleWorld(this.mapCols, 0);

		//draw at layer 1
		drawVisibleWorld(this.mapCols, 1);
		canvasContext.restore();
	}
}