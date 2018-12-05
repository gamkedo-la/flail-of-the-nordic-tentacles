var audioFormat;

function setFormat(){
	var audio = new Audio();
	if (audio.canPlayType("audio/mp3")){
		audioFormat = ".mp3";
	} else {
		audioFormat = ".ogg";
	}
}

function SoundOverlapsClass(filenameWithPath) {
	
	setFormat();
	
	var mainSound = new Audio("audio/"+filenameWithPath+audioFormat);
	var altaudio = new Audio("audio/"+filenameWithPath+audioFormat);
	
	var altaudioTurn = false;
	
	this.play = function() {
		if(altaudioTurn) {
			altaudio.currentTime = 0;
			altaudio.play();
		} else {
			mainaudio.currentTime = 0;
			mainaudio.play();
		}
		altaudioTurn = !this.altaudioTurn;
	}
}	

function BackgroundMusicClass(){
	
	var musicaudio = null;
	
	this.loopSong = function(filenameWithPath){
		setFormat(); 
		
		if(musicaudio != null){
			musicaudio.pause();
			musicaudio = null;
		}
		musicaudio = new Audio("audio/"+filenameWithPath+audioFormat);
		musicaudio.loop = true;
		musicaudio.play();
	}
	
	this.startOrStopMusic = function(){
		if(musicaudio.paused){
			musicaudio.play();
		} else {
			musicaudio.pause();
		}
	}
}

