function TileGrid(initTile)
{
	this.map;
	this.mapRows;
	this.mapCols;

	this.initTileType = initTile;

	this.init = function(rows, cols)
	{
		this.mapRows = rows;
		this.mapCols = cols;
		this.map = new Array(rows * cols);
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
		var tileCol =  Math.floor((mouseX + camPanX)/TILE_W);
		var tileRow =  Math.floor((mouseY + camPanY)/TILE_H);
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