function loadGame()
{
	console.log("Loading Save");
	let loadedGame = JSON.parse(localStorage.getItem('savedGame'));
	console.log(loadedGame);
}

// function loadGame() {
//   var gameStatus = JSON.parse(localStorage.getItem('gameStatus'));
// }