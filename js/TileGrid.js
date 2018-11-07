function TileGrid()
{
	this.map;
	this.mapRows;
	this.mapCols;
	this.tileType = TILE_SNOW;

	this.init = function(rows, cols)
	{
		this.map = new Array(rows * cols);
		this.mapRows = rows;
		this.mapCols = cols;
		this.reset(this.tileType);
	}

	this.reset = function(tileType)
	{
		for(var i = 0; i < this.map.length; i++)
		{
			this.map[i] = tileType;
		}
	}

	this.setTile = function(mouseX, mouseY, xTile, yTile)
	{

	}

	this.draw = function()
	{
		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY);

		this.drawVisibleGrid();

		canvasContext.restore();
	}

	this.drawVisibleGrid = function()
	{
		var camLeftMostCol = Math.floor(camPanX/TILE_W);
		var camTopMostRow = Math.floor(camPanY/TILE_H);

		var colsThatFitOnScreen = Math.floor(canvas.width/TILE_W);
		var rowsThatFitOnScreen = Math.floor(canvas.height/TILE_H);

		var camRightMostCol = camLeftMostCol + colsThatFitOnScreen + 4;
		var camBottomMostRow = camTopMostRow + rowsThatFitOnScreen + 2;

		for(var col = camLeftMostCol; col < camRightMostCol; col++)
		{
			for(var row = camTopMostRow; row < camBottomMostRow; row++)
			{
				var tileLeftEgdeX = col * TILE_W;
				var tileTopEdgeY = row * TILE_H;

				canvasContext.drawImage(worldPics[this.tileType], tileLeftEgdeX, tileTopEdgeY);
			}
		}
	}
}