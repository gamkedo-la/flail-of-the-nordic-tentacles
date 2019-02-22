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

const NUM_0 = 48;
const NUM_1 = 49;
const NUM_2 = 50;
const NUM_3 = 51;
const NUM_4 = 52;
const NUM_5 = 53;
const NUM_6 = 54;
const NUM_7 = 55;
const NUM_8 = 56;
const NUM_9 = 57;

//Arrow Keycodes
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

//Misc.
const TAB = 9;
const SHIFT = 16;
const SPACE = 32;
const ALT = 18;
const ENTER = 13;
const ESC = 27;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);
    canvas.addEventListener('mousedown', function()
        {

            if(editor != null){
                checkIfEditorIsOnAndSetTile();
            }
            else if (gameIsStarted == false || (isPaused && gameIsRunning)) {
                Menu.checkState();
            }

            // else
            // {
            //     //spawn particles at mouseX and mouseY
            //     let p = usableParticles.fight[randBtweenTwoNums(0,usableParticles.fight.length - 1)];

            //     emitters.push(new Emitter(new Vector((mouseX+camPanX),(mouseY+camPanY)),
            //                                 Vector.getNewVectorFromAngMag(0,2),Math.PI));
            //     addParticles(p.emissionRate,p.image,p.life,p.size);
            // }
        });
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    player.setupInput(KEY_W, KEY_S, KEY_A, KEY_D,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    if(!gameIsStarted || isPaused){
        Menu.menuMouse();
    }
}

function keySet(keyEvent, player, setTo) {
    if (keyEvent == player.ctrlWest || keyEvent == player.ctrlWest2) {
        player.goingWest = setTo;
    }
    if (keyEvent == player.ctrlEast || keyEvent == player.ctrlEast2) {
        player.goingEast = setTo;
    }
    if (keyEvent == player.ctrlNorth || keyEvent == player.ctrlNorth2) {
        player.goingNorth = setTo;
    }
    if (keyEvent == player.ctrlSouth || keyEvent == player.ctrlSouth2) {
        player.goingSouth = setTo;
    }
}

function keyPressed(evt) {

    keySet(evt.keyCode, player, true);

    if (!gameIsRunning) 
    { // are we in editor mode?
        editorScreenMove(evt);

        // keys that only work in editor mode
        switch (evt.keyCode) 
        {
            case TAB:
                useEditorMode();
                break;

            //editor input
            case LEFT_ARROW:
                editor.tileIndex--;
                editor.changeSelectedTileInTileSet();
                break;
            case RIGHT_ARROW:
                editor.tileIndex++;
                editor.changeSelectedTileInTileSet();
                break;
            case UP_ARROW:
                editor.tileSetIndex++;
                editor.changeTileSet();
                break;
            case DOWN_ARROW:
                editor.tileSetIndex--;
                editor.changeTileSet();
                break;
            case KEY_V:
                saveMap(window.prompt("Enter the level name in a string format:"), editor.grid);
                break;
            case KEY_X:
                removeSpawnNearMouse();
                break;
            case KEY_L:
                if (!gameIsRunning)
                    loadMap(window.prompt("What's the name of the map?"));
                break;
            case NUM_1:
                editor.currentLayer--;
                editor.changeLayer();
                break;
            case NUM_2:
                editor.currentLayer++;
                editor.changeLayer();
                break;
        }
    }
    else // not in editor mode
    {
        // keys that work in play mode
        switch (evt.keyCode) 
        {
            //game input
            case KEY_P:
                isPaused = !isPaused;
                break;
            case TAB:
                useEditorMode();
                break;
            case SPACE:
                nextDialoguePage();
                break;
    		case KEY_L:
    			cheatStopEnemyMovement();
    			break;
    		case KEY_M:
    			muteSFXandBackground();
    			break;
    		case KEY_I:
    			toggleInventoryAndDrawImage();
    			break;
    		case KEY_K:
    			toggleDebugMode();
    			break;
    		case KEY_J:
    			player.toggleImmunityCheat();
    			break;
            case KEY_U:
                givePlayerRandomXp();
                break;
            case NUM_0:
                particles = [];
                emitters = [];
                break;
            case ENTER:
                Menu.checkState()
                break;
            case UP_ARROW:
    		case KEY_W:
                Menu.cursor1--;
                break;
            case DOWN_ARROW:
    		case KEY_S:
                Menu.cursor1++;
                break;
            case ESC:
                if (textScrolling) {
                    textScrolling = false;
                }
                break;
        }
    }

    evt.preventDefault();
}

function keyReleased(evt) {
    keySet(evt.keyCode, player, false);

    evt.preventDefault();
}
