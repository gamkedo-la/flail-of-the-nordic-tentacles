function drawStatsBox() {
	// background:
	// drawRect(24,34, 116,122, "#888");
	// HP:
	drawRect(30,40, 104,28, "#ddd");
	drawText(`HP: ${player.stats.hp}/${player.stats.maxHp}`, 32, 50, 'black', '10px sans-serif');
	drawRect(32,55, 100,10, "white");
	drawRect(32,55, Math.ceil(player.stats.hp / player.stats.maxHp * 100),10, "red");
	// XP:
	drawRect(30,75, 104,24, "#ddd");
	drawText(`XP: ${player.exp.currentXp}/${player.exp.nextXp}`, 32, 85, 'black', '10px sans-serif');
	drawText(`Lvl: ${player.exp.currentLvl} `, 100, 85, 'black', '10px sans-serif');
	drawRect(32,90, 100,6, "white");
	drawRect(32,90, Math.ceil( player.exp.currentXp/player.exp.nextXp  * 100),6, "purple");
	// STR:
	drawRect(30,106, 104,24, "#ddd");
	drawText(`STR: ${player.stats.str}/${player.stats.maxStr}`, 32, 118, 'black', '10px sans-serif');
	drawRect(32,120, 100,6, "blue");
	drawRect(32,120, Math.ceil(player.stats.str / player.stats.maxStr* 100),6, "grey");
	// DEF:
	drawRect(30,126, 104,24, "#ddd");
	drawText(`DEF: ${player.stats.def}/${player.stats.maxDef}`, 32, 138, 'black', '10px sans-serif');
	drawRect(32,140, 100,6, "blue");
	drawRect(32,140, Math.ceil(player.stats.def / player.stats.maxDef* 100),6, "grey");
	//drawText(`MP: ${player.stats.mp}/${player.stats.maxMp}`, 32, 168, 'black', '10px sans-serif');

	canvasContext.drawImage(statsBezelPic,24,34);


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