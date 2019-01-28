function loadGame()
{
	let loadedGame = JSON.parse(localStorage.getItem('savedGame'));
	let prevP = loadedGame.player;
	
	loadMap(loadedGame.currentMap);
	loadPlayer(prevP);
	playerInventory.items = loadedGame.inventory;

	for(var i = worldMap[0].length - 1; i > 0; --i)
	{
		if(playerInventory.hasItem(getNameOfTile(worldMap[0][i]),1))
			worldMap[0][i] = TILE_SNOW;
	}

	gameIsStarted = true;
}

function loadPlayer(prevP)
{
	let pS = player.stats;
	let pX = player.exp;

	player.centerX = prevP.pos.x;
	player.centerY = prevP.pos.y;
	pS.hp = prevP.hp;
	pS.maxHp = prevP.maxHp;
	pS.str = prevP.str;
	pS.def = prevP.def;
	pX.currentLvl = prevP.lvl;
	pX.nextLvl = prevP.nextLvl;
	pX.currentXp = prevP.xp;
	pX.nextXp = prevP.nextXp;
	pX.levelBracket = prevP.lvlBracket;
}