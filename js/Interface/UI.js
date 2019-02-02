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
	drawStrokedText(`level ${player.exp.currentLvl}`, 68, 125, 'white', '11px sans-serif', 'black', 4);
}

//will go to UI JS once implemented
function drawUI()
{
	drawText(currentMap, 700, 30, font="30px sans-serif");
	if(displayItem)
	{
		drawText('The Player has picked up ' + player.item + '.', canvas.width-275, 60, "black");
		itemPickedUp();
	}
	if(isPaused)
	{
		drawRect(canvas.width/2-55,canvas.height/2-30, 135,35, "black");
		drawRect(canvas.width/2-50,canvas.height/2-25, 125,25, "white");
		drawText("PAUSED", canvas.width/2-50,canvas.height/2, "black", font="30px sans-serif");
	}

	drawStatsBox();

	if(isInventoryVisible)
	{
		playerInventory.renderInventory();
	}

	fadingTitles.draw();
}