var audioFormat;
var playerHitSoundNumber = 0;

//////// Sounds ////////////

var backgroundMusic = new BackgroundMusicClass();

// enemy sounds
var enemySfx = {
	hit: [new SoundOverlapsClass("EnemyHit01"),new SoundOverlapsClass("EnemyHit02"),new SoundOverlapsClass("EnemyHit03")],
	death: [new SoundOverlapsClass("EnemyDestroy01"),new SoundOverlapsClass("EnemyDestroy02"),new SoundOverlapsClass("EnemyDestroy03")],
	shooting: [new SoundOverlapsClass("EnemyFire01"),new SoundOverlapsClass("EnemyFire02"),new SoundOverlapsClass("EnemyFire03")],
};

// player sounds

var playerSfx = {
	hit: [new SoundOverlapsClass("PlayerHit01"),new SoundOverlapsClass("PlayerHit02"),
			new SoundOverlapsClass("PlayerHit03"),new SoundOverlapsClass("PlayerHit04")],
	attack: new SoundOverlapsClass("PlayerAttack"),
	levelUp: new SoundOverlapsClass("levelUp"),
	grassStep: [new SoundOverlapsClass("grassFootStep01"),new SoundOverlapsClass("grassFootStep02"),new SoundOverlapsClass("grassFootStep03")],
	gravelStep: [new SoundOverlapsClass("gravelFootStep01"),new SoundOverlapsClass("gravelFootStep02"),new SoundOverlapsClass("gravelFootStep03")],
	iceStep: [new SoundOverlapsClass("iceFootStep01"),new SoundOverlapsClass("iceFootStep02"),new SoundOverlapsClass("iceFootStep03")],
	snowStep: [new SoundOverlapsClass("snowFootStep01"),new SoundOverlapsClass("snowFootStep02"),new SoundOverlapsClass("snowFootStep03")],
	twigsStep: [new SoundOverlapsClass("twigsFootStep01"),new SoundOverlapsClass("twigsFootStep02")],
};

function getRndInteger(min, max)
{
	hitSoundNumber = Math.floor(Math.random() * (max - min)) + min;
}

function randomHitSound(isPlayer)
{
	if(isPlayer)
	{
		//randomly pick a sound from object array combo specific to the player and play it
		let hit = playerSfx.hit;
		hit[randBtweenTwoNums(0,hit.length - 1)].play();
	}
	else
	{
		//randomly pick a sound from object array combo specific to enemies and play it
		let hit = enemySfx.hit;
		hit[randBtweenTwoNums(0,hit.length - 1)].play();
	}
}



function muteSFXandBackground()
{
	console.log("future mute audio function");
}

function setFormat()
{
	var audio = new Audio();
	if (audio.canPlayType("audio/mp3"))
	{
		audioFormat = ".mp3";
	}
	else
	{
		audioFormat = ".ogg";
	}
}

function SoundOverlapsClass(filenameWithPath)
{

	setFormat();

	var mainaudio = new Audio("audio/"+filenameWithPath+audioFormat);
	var altaudio = new Audio("audio/"+filenameWithPath+audioFormat);

	var altaudioTurn = false;

	this.play = function()
	{
		if(altaudioTurn)
		{
			altaudio.currentTime = 0;
			altaudio.play();
		}
		else
		{
			mainaudio.currentTime = 0;
			mainaudio.play();
		}
		altaudioTurn = !this.altaudioTurn;
	}
}

function BackgroundMusicClass()
{

	var musicaudio = null;

	this.loopSong = function(filenameWithPath)
	{
		setFormat();

		if(musicaudio != null)
		{
			musicaudio.pause();
			musicaudio = null;
		}
		musicaudio = new Audio("audio/"+filenameWithPath+audioFormat);
		musicaudio.loop = true;
		musicaudio.play();
	}

	this.startOrStopMusic = function()
	{
		if(musicaudio.paused)
		{
			musicaudio.play();
		}
		else
		{
			musicaudio.pause();
		}
	}
}

function handleBackgroundMusic()
{  
	if(!gameIsStarted)
	{
		console.log ("MainMenuSong to play here");
		backgroundMusic.loopSong('MainMenuSong');
		return;
	}

	switch(currentMap)
	{
		case 'forestTest':
			backgroundMusic.loopSong('RebelWoods');
			break;
		case 'snowTest':
			backgroundMusic.loopSong('NordicSnow');
			break;
	}
}
