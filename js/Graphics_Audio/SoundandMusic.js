var audioFormat;
var playerHitSoundNumber = 0;

//////// Sounds ////////////

var backgroundMusic = new BackgroundMusicClass();
var levelUpSound = new SoundOverlapsClass("levelUp");

// enemy sounds

var enemyHit01Sound = new SoundOverlapsClass("EnemyHit01");
var enemyHit02Sound = new SoundOverlapsClass("EnemyHit02");
var enemyHit03Sound = new SoundOverlapsClass("EnemyHit03");

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

function getRndInteger(min, max) 
{
	hitSoundNumber = Math.floor(Math.random() * (max - min)) + min;
}

function randomHitSound(isPlayer)
{
	if(isPlayer)
	{
		//randomly pick a sound from object array combo specific to the player and play it
	}
	else
	{
		//randomly pick a sound from object array combo specific to enemies and play it
	}
}

function randomPlayerHitSound()
{
	getRndInteger(1, 4) 

	if(hitSoundNumber == 1)
	{
		playerHit01Sound.play();
	}
	else if(hitSoundNumber == 2)
	{
		playerHit02Sound.play();
	}
	else if(hitSoundNumber == 3)
	{
		playerHit03Sound.play();
	}
	else
	{
		playerHit04Sound.play();
	}
}

function randomEnemyHitSound()
{
	getRndInteger(1, 3)
		
	if(hitSoundNumber == 1)
	{
		enemyHit01Sound.play();
	}
	else if(hitSoundNumber == 2)
	{
		enemyHit02Sound.play();
	}
	else if(hitSoundNumber == 3)
	{
		enemyHit03Sound.play();
	}
	else
	{
		enemyHit04Sound.play();
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
	switch(currentMap)
	{
		case 'forestTest':
			backgroundMusic.loopSong('RebelWoods');
			break;
		case 'snowTest':
			// backgroundMusic.loopSong("PickupBeacon01");
			break;
	}
}