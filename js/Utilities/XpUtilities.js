function setEnemyXpDrop(level, lvlBracket)
{
	//returns 5 for the lvl 1 enemies; 800 for lvl 40 enemies
	return level * BASE_XP_DROP * lvlBracket;
}

function setup_Enemy(caller, lvlBracket)
{
	switch(lvlBracket)
	{
		case 1:
			caller.currentLvl = getRandomLevel_MaxMinInclusive(10,1);
			break;
		case 2:
			caller.currentLvl = getRandomLevel_MaxMinInclusive(20,11);
			break;
		case 3:
			caller.currentLvl = getRandomLevel_MaxMinInclusive(30,21);
			break;
		case 4:
			caller.currentLvl = getRandomLevel_MaxMinInclusive(40,31);
			break;
	}
}

function setup_Player(caller, lvlBracket)
{
	caller.currentXp = 0;
	caller.currentLvl = 1;
	caller.nextLvl = caller.currentLvl + 1;
	caller.nextXp = calculateXpToNextLvl(caller.currentLvl, lvlBracket);
}

function getBracketByType(charKind)
{
	switch(charKind)
	{
		case 'Ragnar':
			return 1;
		case 'Wormex':
			return 1;
		case 'Fallen':
			return 2;
		case 'Vanguard':
			return 3;
		case 'Tank':
			return 4;
		default:
			console.log("Character " + charKind +" does not have a level bracket!");
			return null;
	}
}

function calculateXpToNextLvl(currentLvl,lvlBracket)
{
	// returns 20 at lvl 1, bracket 1; 240 at lvl 6, bracket 2
	return currentLvl * BASE_XP_REQ * lvlBracket;
}

function getRandomLevel_MaxMinInclusive(max,min)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hasPlayerLeveledUp()
{
	if(player.exp.currentXp >= player.exp.nextXp)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function givePlayerRandomXp()
{
	if(player.exp.currentLvl < 50)
	{
		let rand = Math.floor(Math.random() * (enemiesList.length));

		player.exp.currentXp += enemiesList[rand].exp.gainEnemyXpDrop();

		if(hasPlayerLeveledUp())
		{
			levelUpPlayer();
		}
	}
	else
	{
		player.exp.nextXp = player.exp.currentXp;
		player.exp.nextLvl = player.exp.currentLvl;
	}
}