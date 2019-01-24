//Debug related
function toggleDebugMode()
{
	if(debugState)
	{
		debugState = false;
	}
	else
	{
		debugState = true;
	}
}

function gameDebugTools()
{
	var tileCol =  Math.floor((mouseX + camPanX)/TILE_W);
	var tileRow =  Math.floor((mouseY + camPanY)/TILE_H);

	drawText(`Player Health: ${player.stats.hp}`, 20, 20, 'black', '20px sans-serif');
	// drawText(`In Combat: ${player.isInCombat}`, 20, 40, 'black', '20px sans-serif');
	drawText(`Player Wait Before Regen: ${player.waitTimeForHpRegen}`,20,60,'black','20px sans-serif');
	for(var i = 0; i < enemiesList.length; i++)
	{
		drawText(`Enemy ${i} HP: ${enemiesList[i].stats.hp}, isInCombat: ${enemiesList[i].isInCombat}`, 20, (i+4) * 20, 'black', '20px sans-serif');
	}

	drawText("Player Xp: " + player.exp.currentXp, 20, 500, "Teal", "20px Arial", "center", 10);
	drawText("Next Lvl Xp: " + player.exp.nextXp, 20, 520, "Teal", "20px Arial", "center", 10);
	drawText("Player level: " + player.exp.currentLvl, 20, 540, "Maroon", "20px Arial", "center", 10);
	drawText("Next level: " + player.exp.nextLvl, 20, 560, "Maroon", "20px Arial", "center", 10);

	drawCircle(camPanX, camPanY, 5, 'red');
	drawText('mouse: ' + Math.floor((mouseX + camPanX)) + ', ' + Math.floor((mouseY + camPanY)) + ', index: ' + roomTileToIndex(tileCol, tileRow, currentMapCols), 
		mouseX, mouseY, 'black');
}

function cheatStopEnemyMovement()
{
	if (stopEnemyMovement == true)
	{
		stopEnemyMovement = false;
	} 
	else
	{
		stopEnemyMovement = true;
	}
}

function editorDebugTools()
{
	var tileCol =  Math.floor((mouseX + camPanX)/TILE_W);
	var tileRow =  Math.floor((mouseY + camPanY)/TILE_H);
	editor.tileToBeReplaced = roomTileToIndex(tileCol, tileRow, editor.grid.mapCols);

	// drawCircle(camPanX, camPanY, 5, 'red');
	drawText('mouse x: ' + (mouseX + camPanX) + ', y: ' + (mouseY + camPanY) + ', tileIndex: ' + editor.tileToBeReplaced, mouseX, mouseY, 'red');
	drawText(`Layer: ${editor.selectedLayer}`, 20, 550, 'black', '20px sans-serif');
	drawText(`Tileset: ${editor.usableTiles[editor.tileSetIndex].setName}`, 20, 570, 'black', '20px sans-serif');
	drawText(`Tile: ${editor.selectedTileType}, ${getNameOfTile(editor.selectedTileType)}`, 20, 590, 'black', '20px sans-serif');

	//console.log('Tile const: ' + this.selectedTileType + ' ,' + getNameOfTile(this.selectedTileType));
	//console.log('Switched to: ' + this.usableTiles[this.tileSetIndex].setName);
	/*
	Tileset: ${editor.usableTiles[editor.tileSetIndex].setName}
	Tile: ${editor.selectedTileType}, ${getNameOfTile(editor.selectedTileType)}
	*/
}

/*
 * Draw a HEADING_LINE_LENGTH px line pointing along the characters current heading (velX,velY)
 */
function debugDrawHeading(character)
{
	const HEADING_LINE_LENGTH = 50

	var width = character.width || 0
	var height = character.height || 0

	var x = character.centerX + (width / 2)
	var y = character.centerY + (height / 2)

	// magnitude of velocity vector
	var velMag = Math.sqrt((character.velX * character.velX) + (character.velY * character.velY))

	var x1 = (character.velX/velMag) * HEADING_LINE_LENGTH
	var y1 = (character.velY/velMag) * HEADING_LINE_LENGTH

	canvasContext.beginPath();
	canvasContext.moveTo(x, y);
	canvasContext.lineTo(x + x1, y + y1);
	canvasContext.lineWidth = 2;
	canvasContext.strokeStyle = 'green'
	canvasContext.stroke();
}
