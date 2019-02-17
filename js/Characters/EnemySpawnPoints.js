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
		this.footstepImage = footStepsPic; // fixme: different footprints depending on the enemy?
	}

	this.draw = function()
	{
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

function addEnemyToSpawnList(atX,atY, enemyKind)
{
	var tempEnemy = new enemySpawnPointClass();

	tempEnemy.setup(atX, atY, enemyKind);
	enemySpawnList.push(tempEnemy);
}

function spawnEnemiesSpawnList()
{
	for (var i = 0; i < enemySpawnList.length; i++)
	{
		var tileCol = Math.floor(enemySpawnList[i].x/TILE_W);
		var tileRow = enemySpawnList[i].y/TILE_H;
		enemiesStartSpots.push({col: tileCol, row: tileRow, charType: enemySpawnList[i].charType});
	}
}