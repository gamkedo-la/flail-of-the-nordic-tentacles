var enemySpawnList = [];

function enemySpawnPointClass()
{
	this.x = 0;
	this.y = 0;

	this.bitmap;
	this.charType = 0;
	
	this.setup = function(startX,startY,enemyKind)
	{
		this.x = startX;
		this.y = startY;
		this.charType = enemyKind;
		this.bitmap = getEnemyPicBasedOnType(this.charType);
	}

	this.draw = function()
	{
		//will have to make this divided the enemies bitmap based on their size
		canvasContext.drawImage(this.bitmap, 0 * FRAME_DIMENSIONS, 0, FRAME_DIMENSIONS, FRAME_DIMENSIONS, 
			this.x - this.bitmap.width/8, this.y - this.bitmap.height/2, FRAME_DIMENSIONS, FRAME_DIMENSIONS);
	}

	this.distFromMouse = function()
	{
		var dx = this.x - (mouseX + camPanX);
		var dy = this.y - (mouseY + camPanY);

		return Math.sqrt(dx * dx + dy * dy);
	}
}

//could push an object literal that using the spawn point class and the char type property found there
function addEnemyToSpawnList(atX,atY, enemyKind)
{
	var tempEnemy = new enemySpawnPointClass();

	tempEnemy.setup(atX, atY, enemyKind);
	enemySpawnList.push(tempEnemy);
	// console.log(enemySpawnList);
}

function spawnEnemiesSpawnList()
{
	for (var i = 0; i < enemySpawnList.length; i++)
	{
		// console.log("found enemy spawn at: " + i);
		var tileCol = Math.floor(enemySpawnList[i].x/TILE_W);
		var tileRow = enemySpawnList[i].y/TILE_H;
		//possibly push the enemySpawnList[i].charType to start spots
		enemiesStartSpots.push({col: tileCol, row: tileRow, charType: enemySpawnList[i].charType});
	}
}