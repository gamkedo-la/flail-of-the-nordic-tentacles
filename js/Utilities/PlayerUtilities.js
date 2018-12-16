//Player related
function handleNpcCollisions(playerCollider)
{
	if(playerCollider.isCollidingWithOtherCollider(maleViking.collider))
	{
		console.log("Talking with: " + maleViking.charName);
	}
	else if(playerCollider.isCollidingWithOtherCollider(femaleViking.collider))
	{
		console.log("Talking with: " + femaleViking.charName);
	}
	else if(playerCollider.isCollidingWithOtherCollider(seer.collider))
	{
		console.log("Talking with: " + seer.charName);
	}
	else if(playerCollider.isCollidingWithOtherCollider(outcast.collider))
	{
		console.log("Talking with: " + outcast.charName);
	}
	else
	{
		return;
	}
}

function placePlayerAtThisSpot(p,i)
{
	if(worldMap[0][i] == TILE_PLAYER_NEW_GAME)
	{
		if(previousLvlName == null)
		{
			var tileRow = Math.floor(i/currentMapCols);
			var tileCol = i%currentMapCols;
			p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
			p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
		}

		worldMap[0][i] = TILE_SNOW;
	}
	if(previousLvlName == "snowTest")
	{
		if(worldMap[0][i] == TILE_BEACH_EXIT_DOOR || worldMap[0][i] == TILE_FOREST_EXIT_DOOR || worldMap[0][i] == TILE_MT_EXIT_DOOR)
		{
			var tileRow = Math.floor(i/currentMapCols);
			var tileCol = i%currentMapCols;
			tileRow--;
			p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
			p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
		}
	}
	if(worldMap[0][i] == TILE_BEACH_ENTRY_DOOR && previousLvlName == "beachTest")
	{
		var tileRow = Math.floor(i/currentMapCols);
		var tileCol = i%currentMapCols;
		tileRow++;
		p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
		p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
	}
	if(worldMap[0][i] == TILE_FOREST_ENTRY_DOOR && previousLvlName == "forestTest")
	{
		var tileRow = Math.floor(i/currentMapCols);
		var tileCol = i%currentMapCols;
		tileCol--;
		p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
		p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
	}
	if(worldMap[0][i] == TILE_MT_ENTRY_DOOR && previousLvlName == "mountainTest")
	{
		var tileRow = Math.floor(i/currentMapCols);
		var tileCol = i%currentMapCols;
		tileCol++;
		p.homeX = tileCol * TILE_W + 0.5 * TILE_W;
		p.homeY = tileRow * TILE_H + 0.5 * TILE_H;
	}
}

function regenPlayerHpIfAble(player,isIdle,enemiesList)
{
	var isCombatOngoing = false;
	for(var i = 0; i < enemiesList.length; i++)
	{
		if(enemiesList[i].isInCombat)
		{
			isCombatOngoing = true;
		}
	}

	if(!isCombatOngoing)
	{
		if(isIdle)
		{
			if(!(player.stats.hp >= player.stats.maxHp))
			{
				player.waitTimeForHpRegen--;
				if(player.waitTimeForHpRegen <= 0 && player.stats.hp < player.stats.maxHp)
				{
					player.stats.hp += (player.stats.baseHp * 0.01);
				}
			}
			else
			{
				player.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
			}
		}
		else
		{
			player.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
		}
	}
	else
	{
		player.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
	}
}

function resetPlayerHealth(playerStats)
{
	playerStats.hp = playerStats.maxHp;
	playerStats.isCharacterDead = false;
}

function levelUpPlayer()
{
	player.exp.currentLvl++;
	player.exp.nextLvl++;
	if(player.exp.currentLvl % 5 == 1)
	{
		player.exp.levelBracket++;
	}
	player.exp.nextXp = calculateXpToNextLvl(player.exp.currentLvl, player.exp.levelBracket);
	setStats_Player(player.stats,player.exp.currentLvl);
}