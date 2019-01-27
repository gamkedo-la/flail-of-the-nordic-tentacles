function saveGame()
{
	console.log("Saving Game");
	let pStats = player.stats;
	let pXp = player.exp;
	let savedGame = {
		player:{
			pos: {x: player.centerX, y:player.centerY},
			hp: pStats.hp,
			maxHp: pStats.maxHp,
			str: pStats.str,
			def: pStats.def,
			lvl: pXp.currentLvl,
			nextLvl: pXp.nextLvl,
			xp: pXp.currentXp,
			nextXp: pXp.nextXp,
			lvlBracket: pXp.levelBracket,
		},
		inventory: playerInventory.items,
		currentMap: currentMap,
	}

	localStorage.setItem('savedGame', JSON.stringify(savedGame));
}

// function saveGame(){
//   var gameStatus = {
//     player: {
//       position: { x: 10, y: 10 },
//       health: 95,
//       level: 18
//     }
//   };
//   localStorage.setItem('gameStatus', JSON.stringify(gameStatus));
// }