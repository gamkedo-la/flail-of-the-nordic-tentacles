//Letter Keycodes
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_B = 66; 
const KEY_C = 67; 
const KEY_E = 69; 
const KEY_F = 70; 
const KEY_G = 71; 
const KEY_H = 72; 
const KEY_I = 73; 
const KEY_J = 74; 
const KEY_K = 75; 
const KEY_L = 76; 
const KEY_M = 77; 
const KEY_N = 78; 
const KEY_O = 79; 
const KEY_P = 80; 
const KEY_Q = 81; 
const KEY_R = 82; 
const KEY_T = 84; 
const KEY_U = 85; 
const KEY_V = 86; 
const KEY_X = 88; 
const KEY_Y = 89; 
const KEY_Z = 90; 

//Arrow Keycodes
const LEFT_ARROW =  37;
const UP_ARROW =  38;
const RIGHT_ARROW =  39;
const DOWN_ARROW =  40;

const TAB = 9;
const SHIFT = 16;
const SPACE = 32;
const ALT = 18;
const ENTER = 13;

var mouseX = 0;
var mouseY = 0;

function setupInput()
{
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('click', checkIfEditorIsOnAndSetTile);
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	player.setupInput(KEY_W,KEY_S,KEY_A,KEY_D);
}

function updateMousePos(evt)
{
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function checkIfEditorIsOnAndSetTile()
{
	if(!gameIsRunning)
	{
		editor.setTile();
	}
}

function keySet (keyEvent, player, setTo)
{
	if(keyEvent == player.ctrlWest)
	{
		player.goingWest = setTo;
	}
	if(keyEvent == player.ctrlEast)
	{
		player.goingEast = setTo;
	}
	if(keyEvent == player.ctrlNorth)
	{
		player.goingNorth = setTo;
	}
	if(keyEvent == player.ctrlSouth)
	{
		player.goingSouth = setTo;
	}
}

function editorScreenMove(evt)
{
	if(evt.keyCode === KEY_F)
	{
		camPanX -= CAM_SPEED;
	}
	if(evt.keyCode === KEY_T)
	{
		camPanY -= CAM_SPEED;
	}
	if(evt.keyCode === KEY_G)
	{
		camPanY += CAM_SPEED;
	}
	if(evt.keyCode === KEY_H)
	{
		camPanX += CAM_SPEED;
	}
}

function keyPressed(evt)
{
	keySet(evt.keyCode, player, true);

	if(!gameIsRunning)
		editorScreenMove(evt);

	switch(evt.keyCode)
	{
		case TAB:
			useEditorMode();
			break;
	
		case KEY_P:
			isPaused = !isPaused;
			break;
	}

	evt.preventDefault();
}

function keyReleased(evt)
{
	keySet(evt.keyCode, player, false);

	evt.preventDefault();
}