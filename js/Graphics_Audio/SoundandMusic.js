var audioFormat;
var playerHitSoundNumber = 0;


function getRndInteger(min, max) 
{
	hitSoundNumber = Math.floor(Math.random() * (max - min)) + min;
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

