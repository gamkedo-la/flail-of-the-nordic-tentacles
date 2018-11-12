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

	this.setTile = function(mouseX, mouseY, tileIndex, tileTypes)
	{
		// function getTileIndexAtRowCol(pxX, pxY, gridCols, gridRows)
		// {
		// 	var tileCol = pxX / TILE_W;
		// 	var tileRow = pxY / TILE_H;

		// 	tileCol = Math.floor(tileCol);
		// 	tileRow = Math.floor(tileRow);

		// 	if(tileCol < 0 || tileCol >= gridCols ||
		// 		tileRow < 0 || tileRow >= gridRows)
		// 	{
		// 		console.log("TILE does not exist");
		// 		return undefined;
		// 	}

		// 	var tileIndex = roomTileToIndex(tileCol, tileRow, gridCols);
		// 	return tileIndex;
		// }

		// function roomTileToIndex(tileCol, tileRow, gridCols)
		// {
		// 	return (tileCol + gridCols * tileRow);
		// }

		// function doesTileExistAtTileCoord(tileCol, tileRow, gridCols)
		// {
		// 	var tileIndex = roomTileToIndex(tileCol, tileRow, gridCols);
		// 	return	(worldMap[tileIndex] != undefined);
		// }
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