var canvas, canvasContext;
var gameLoop;
var gameIsRunning = false;
var fps = 30;

/////// Game States /////////////

var isPaused = false;
var displayItem = false;
var itemDisplaytimer = 0;
var debugState = false;


//////// Sounds ////////////

var RebelWoodsBackgroundMusic = new BackgroundMusicClass();
var levelUpSound = new SoundOverlapsClass("levelUp");

// enemy sounds

var enemyHit01Sound = new SoundOverlapsClass("EnemyHit01");
var enemyHit02Sound = new SoundOverlapsClass("EnemyHit02");
var enemyHit03Sound = new SoundOverlapsClass("EnemyHit03");
var enemyHit04Sound = new SoundOverlapsClass("EnemyHit04");

var enemyDestroyed01Sound = new SoundOverlapsClass("EnemyDestroy01");
var enemyDestroyed02Sound = new SoundOverlapsClass("EnemyDestroy02");
var enemyDestroyed03Sound = new SoundOverlapsClass("EnemyDestroy03");

var enemyFire01Sound = new SoundOverlapsClass("EnemyFire01");
var enemyFire02Sound = new SoundOverlapsClass("EnemyFire02");
var enemyFire03Sound = new SoundOverlapsClass("EnemyFire03");

// player sounds

var playerHit01Sound = new SoundOverlapsClass("PlayerHit01");
var playerHit02Sound = new SoundOverlapsClass("PlayerHit02");
var playerHit03Sound = new SoundOverlapsClass("PlayerHit03");
var playerHit04Sound = new SoundOverlapsClass("PlayerHit04");

var playerAttackSound = new SoundOverlapsClass("PlayerAttack");

var grassFootStep01Sound = new SoundOverlapsClass("grassFootStep01");
var grassFootStep02Sound = new SoundOverlapsClass("grassFootStep02");
var grassFootStep03Sound = new SoundOverlapsClass("grassFootStep03");

var gravelFootStep01Sound = new SoundOverlapsClass("gravelFootStep01");
var gravelFootStep02Sound = new SoundOverlapsClass("gravelFootStep02");
var gravelFootStep03Sound = new SoundOverlapsClass("gravelFootStep03");

var iceFootStep01Sound = new SoundOverlapsClass("iceFootStep01");
var iceFootStep02Sound = new SoundOverlapsClass("iceFootStep02");
var iceFootStep03Sound = new SoundOverlapsClass("iceFootStep03");

var snowFootStep01Sound = new SoundOverlapsClass("snowFootStep01");
var snowFootStep02Sound = new SoundOverlapsClass("snowFootStep02");
var snowFootStep03Sound = new SoundOverlapsClass("snowFootStep03");

var twigsFootStep01Sound = new SoundOverlapsClass("twigsFootStep01");
var twigsFootStep02Sound = new SoundOverlapsClass("twigsFootStep02");




/*
	NOTE: will need a way to save just about everything from state of game to player's current spot in game
*/
window.onload = function()
{
	canvas = document.getElementById('gc');
	canvasContext = canvas.getContext('2d');

	loadImages();
	RebelWoodsBackgroundMusic.loopSong(RebelWoods);
	
}

function imgsDoneLoadingSoStartGame()
{
	gameIsRunning = true;
	gameLoop = setInterval(updateAll, 1000/fps);

	setupCharacters();

	setupInput();
}

function updateAll()
{
	if (isPaused == false){
		moveAll();
		battleAll();
	} else {
		console.log("Pause");
			}

	updateGroundDecals(0.7); // a higher number here causes the footprints to fade out faster
	drawAll();
	emitters = [];
}

function moveAll()
{
	moveCharacters();
	moveCamera(currentMapCols, currentMapRows);
}

function battleAll()
{
	for(var i = 0; i < enemiesList.length; i++)
	{
		//checking for battle against player
		enemiesList[i].battle(player.collider);
	} 

	regenPlayerHpIfAble(player,player.isIdle,enemiesList);
}

function drawAll()
{
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY);
	drawVisibleWorld(currentMapCols, 0);
	drawGroundDecals();
	drawAllCharacters();
	// wormexTestEnemy.draw(); // trying to determine where to call draw enemies - Vince
	drawParticles();
	drawVisibleWorld(currentMapCols, 1);
	plotParticles(150,150);
	canvasContext.restore();
	if(debugState)
	{
		gameDebugTools();
	}

	drawUI();
	createDialogue();
	canvasContext.restore();
}

//will go to UI JS once implemented
function drawUI()
{
	drawText(currentMap, 700, 30, font="30px sans-serif");
	if(displayItem)
	{
		drawText('The Player has picked up ' + player.item + '.', canvas.width-275, 60, "black");
		itemPickedUp();
	}
	if(isPaused)
	{
		drawRect(canvas.width/2-55,canvas.height/2-30, 135,35, "black");
		drawRect(canvas.width/2-50,canvas.height/2-25, 125,25, "white");
		drawText("PAUSED", canvas.width/2-50,canvas.height/2, "black", font="30px sans-serif");
	}
	drawText("Player Xp: " + player.exp.currentXp, 20, 500, "Teal", "20px Arial", "center", 10);
	drawText("Next Lvl Xp: " + player.exp.nextXp, 20, 520, "Teal", "20px Arial", "center", 10);
	drawText("Player level: " + player.exp.currentLvl, 20, 540, "Maroon", "20px Arial", "center", 10);
	drawText("Next level: " + player.exp.nextLvl, 20, 560, "Maroon", "20px Arial", "center", 10);

	if(isInventoryVisible)
	{
		playerInventory.renderInventory();
	}

	fadingTitles.draw();
}