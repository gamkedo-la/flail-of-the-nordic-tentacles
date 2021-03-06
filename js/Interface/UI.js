function drawUI()
{
	if(displayItem)
	{
		canvasContext.save();
		canvasContext.globalAlpha = 0.75;
		drawRect(canvas.width-290,40,290,30,"black");
		drawText('Picked up a ' + player.item + '!', canvas.width-275, 60, "white");
		drawRect(canvas.width-290,80,290,30,"black");
		drawText(displayItemUseDetailsAndKey(player.item) + '!', canvas.width-275, 100, "white");
		canvasContext.restore();
		itemPickedUp();
	}
	/*if(isPaused)
	{
		drawRect(canvas.width/2-55,canvas.height/2-30, 135,35, "black");
		drawRect(canvas.width/2-50,canvas.height/2-25, 125,25, "white");
		drawText("PAUSED", canvas.width/2-50,canvas.height/2, "black", font="30px sans-serif");
	}*/

	drawStatsBox();

	if(isInventoryVisible)
	{
		playerInventory.renderInventory();
	}
	canvasContext.textAlign = "right"; 
	drawText('P to pause/save',canvas.width-10-1, 20-1, 'black', "13px viking-normalregular");
	drawText('P to pause/save',canvas.width-10+1, 20-1, 'black', "13px viking-normalregular");
	drawText('P to pause/save',canvas.width-10-1, 20+1, 'black', "13px viking-normalregular");
	drawText('P to pause/save',canvas.width-10+1, 20+1, 'black', "13px viking-normalregular");
	drawText('P to pause/save',canvas.width-10, 20, 'yellow', "13px viking-normalregular");
	canvasContext.textAlign = "left"; 

	fadingTitles.draw();
}

function drawStatsBox() {
	// HP:
	drawRect(38,67, 94,11, "white");
	drawRect(38,67, Math.ceil(player.stats.hp / player.stats.maxHp * 94),11, "#cd1616");
	// XP:
	drawRect(38,82, 94,5, "white");
	drawRect(38,82, Math.ceil((player.exp.currentXp - player.exp.prevXp) / (player.exp.nextXp - player.exp.prevXp) * 94),5, "purple");
	
	canvasContext.drawImage(playerStatsPic,24,24);

	// text on top of stats UI:
	drawStrokedText(`${player.stats.hp}/${player.stats.maxHp}`, 60, 77, 'white', '11px sans-serif', 'black', 4);
	drawStrokedText(`${player.stats.str}`, 65, 105, 'white', '11px sans-serif', 'black', 4);
	drawStrokedText(`${player.stats.def}`, 115, 105, 'white', '11px sans-serif', 'black', 4);
	drawStrokedText(`LVL ${player.exp.currentLvl}`, 68, 125, 'white', '11px sans-serif', 'black', 4);
}