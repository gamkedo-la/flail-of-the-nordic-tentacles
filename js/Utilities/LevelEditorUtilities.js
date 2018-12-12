function useEditorMode()
{
	if(gameIsRunning)
	{
		runEditorInstance();
	}
	else
	{
		runGameInstance();
	}
}

function runEditorInstance()
{
	clearInterval(gameLoop);
	gameIsRunning = !gameIsRunning;

	clearSpawnList();
	editor = new Editor();

	console.log('WARNING!!! \n' + 'Grid smaller than 8 rows by 10 columns are not supported!\n' + 
		'Anything bigger than that should be okay.');
	console.log('EDITOR GUIDE: \n' + 'X: Deletes Spawns' + '\nMouse 0 (left click) sets tile' + '\nV: Save maps to console for copy/paste to code' + 
		'\nTAB: Exits editor mode' + '\nUp/Down Arrow: Changes tile set' + '\nLeft/Right Arrow: Change to specific tile within set' +
		'\nMouse click: Set tiles' + '\nF/H: Pans camera left/right' + '\nT/G: Pans camera up/down' + '\nNum 1/Num 2: Changes layers');

	editor.init();

	editorLoop = setInterval(editor.update.bind(editor), 1000/fps);
}

function runGameInstance()
{
	clearInterval(editorLoop);

	gameLoop = setInterval(updateAll, 1000/fps);
	gameIsRunning = !gameIsRunning;
	
	editor = null;
}

function editorScreenMove(evt) {
    if (evt.keyCode === KEY_F) {
        camPanX -= CAM_SPEED;
    }
    if (evt.keyCode === KEY_T) {
        camPanY -= CAM_SPEED;
    }
    if (evt.keyCode === KEY_G) {
        camPanY += CAM_SPEED;
    }
    if (evt.keyCode === KEY_H) {
        camPanX += CAM_SPEED;
    }
}

function checkIfEditorIsOnAndSetTile(evt) {
    if (!gameIsRunning) {
        editor.setTile();
    }
}