var camPanX = 0.0;
var camPanY = 0.0;
const DIST_BEFORE_X_PAN = 150;
const DIST_BEFORE_Y_PAN = 100;
const CAM_SPEED = 10.0;//for editor use only

function instantCamFollow()
{	
	camPanX = player.centerX - canvas.width/2;
	camPanY = player.centerY - canvas.height/2;
}

function moveCamera(cols, rows)
{
	var camFocusCenterX = camPanX + canvas.width/2;//300
	var camFocusCenterY = camPanY + canvas.height/2;//400

	if(gameIsRunning)
	{
		instantCamFollow();
	}

	if(camPanX < 0)
	{
		camPanX = 0;
	}
	if(camPanY < 0)
	{
		camPanY = 0;
	}

	var maxPanX = cols * TILE_W - canvas.width;
	var maxPanY = rows * TILE_H - canvas.height;
	if(camPanX > maxPanX)
	{
		camPanX = maxPanX;
	}
	if(camPanY > maxPanY)
	{
		camPanY = maxPanY;
	}
}

function followPlayer(cfcX, cfcY)
{
	var playerDistFromFocusX = Math.abs(player.centerX - cfcX);
	var playerDistFromFocusY = Math.abs(player.centerY - cfcY);

	if(playerDistFromFocusX > DIST_BEFORE_X_PAN)
	{
		if(cfcX < player.centerX)
			camPanX += CAM_SPEED;
		else
			camPanX -= CAM_SPEED;
	}
	if(playerDistFromFocusY > DIST_BEFORE_Y_PAN)
	{
		if(cfcY < player.centerY)
			camPanY += CAM_SPEED;
		else
			camPanY -= CAM_SPEED;
	}
}