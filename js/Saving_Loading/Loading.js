function loadGame()
{
	console.log("Loading Save");
	let loadedGame = JSON.parse(localStorage.getItem('savedGame'));
	
	loadMap(loadedGame.currentMap);
	player.centerX = loadedGame.player.pos.x;
	player.centerY = loadedGame.player.pos.y;

	gameIsStarted = true;
}

// savedGame = {
// 		player:{
// 			pos: {x: player.centerX, y:player.centerY},
// 			hp: pStats.hp,
// 			maxHp: pStats.maxHp,
// 			str: pStats.str,
// 			def: pStats.def,
// 			lvl: pXp.currentLvl,
// 			nextLvl: pXp.nextLvl,
// 			xp: pXp.currentXp,
// 			nextXp: pXp.nextXp,
// 			lvlBracket: pXp.levelBracket,
// 		},
// 		inventory: playerInventory.items,
// 		currentMap: currentMap,
// 	}

// function loadGame() {
//   var gameStatus = JSON.parse(localStorage.getItem('gameStatus'));
// }