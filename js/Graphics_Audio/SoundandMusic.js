var audioFormat;
var playerHitSoundNumber = 0;

//////// Sounds ////////////

var backgroundMusic = new BackgroundMusicClass();

// enemy sounds
var enemySfx = {
	hit: [new SoundOverlapsClass("EnemyHit01", 0.3),new SoundOverlapsClass("EnemyHit02", 0.3),new SoundOverlapsClass("EnemyHit03", 0.3)],
	death: [new SoundOverlapsClass("EnemyDestroy01", 0.3),new SoundOverlapsClass("EnemyDestroy02", 0.3),new SoundOverlapsClass("EnemyDestroy03", 0.3)],
	shooting: [new SoundOverlapsClass("EnemyFire01", 0.1),new SoundOverlapsClass("EnemyFire02", 0.1),new SoundOverlapsClass("EnemyFire03", 0.1)],
};

// player sounds

var playerSfx = {
	hit: [new SoundOverlapsClass("PlayerHit01", 0.3),new SoundOverlapsClass("PlayerHit02", 0.3),
			new SoundOverlapsClass("PlayerHit03", 0.3),new SoundOverlapsClass("PlayerHit04", 0.3)],
	attack: new SoundOverlapsClass("PlayerAttack", 0.3),
	levelUp: new SoundOverlapsClass("levelUp", 0.3),
	grassStep: [new SoundOverlapsClass("grassFootStep01", 0.3),new SoundOverlapsClass("grassFootStep02", 0.3),new SoundOverlapsClass("grassFootStep03", 0.3)],
	gravelStep: [new SoundOverlapsClass("gravelFootStep01", 0.3),new SoundOverlapsClass("gravelFootStep02", 0.3),new SoundOverlapsClass("gravelFootStep03", 0.3)],
	iceStep: [new SoundOverlapsClass("iceFootStep01", 0.3),new SoundOverlapsClass("iceFootStep02", 0.3),new SoundOverlapsClass("iceFootStep03", 0.3)],
	snowStep: [new SoundOverlapsClass("snowFootStep01", 0.3),new SoundOverlapsClass("snowFootStep02", 0.3),new SoundOverlapsClass("snowFootStep03", 0.3)],
	twigsStep: [new SoundOverlapsClass("twigsFootStep01", 0.3),new SoundOverlapsClass("twigsFootStep02", 0.3)],
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

function SoundOverlapsClass(filenameWithPath, volume)
{

	setFormat();

	var mainaudio = new Audio("audio/"+filenameWithPath+audioFormat);
	var altaudio = new Audio("audio/"+filenameWithPath+audioFormat);
	var thisSoundVol = volume;
	var altaudioTurn = false;

	this.play = function()
	{
		if(altaudioTurn)
		{
			altaudio.currentTime = 0;
			altaudio.volume = thisSoundVol;
			altaudio.play();
		}
		else
		{
			mainaudio.currentTime = 0;
			mainaudio.volume = thisSoundVol;
			mainaudio.play();
		}
		altaudioTurn = !this.altaudioTurn;
	}
}

let array_of_in_game_audio_tracks = ["NordicSnow","NordicRage","RebelWoods"];
let array_of_in_game_audio_tracks_index = 0;

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
		musicaudio.addEventListener('timeupdate', function(){
			var buffer = .44;
		    if(this.currentTime > this.duration - buffer) {
					array_of_in_game_audio_tracks_index++;
					if (array_of_in_game_audio_tracks_index > array_of_in_game_audio_tracks.length - 1) {
						array_of_in_game_audio_tracks_index = 0;
					}
					this.src = "audio/" + array_of_in_game_audio_tracks[array_of_in_game_audio_tracks_index] + audioFormat;
		    	this.currentTime = 0;
		      this.play();
		}}, false);
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
		backgroundMusic.loopSong('MainMenuSong');
		return;
	}

	switch(currentMap)
	{
		case 'forestTest':
			array_of_in_game_audio_tracks_index = 2;
			backgroundMusic.loopSong('RebelWoods');
			break;
		case 'snowTest':
			array_of_in_game_audio_tracks_index = 0;
			backgroundMusic.loopSong('NordicSnow');
			break;
	}
}
