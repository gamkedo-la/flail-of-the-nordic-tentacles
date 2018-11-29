/*
	NOTE: xp really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/
const BASE_XP_REQ = 20;
const BASE_XP_DROP = 5;
const PLAYER_MAX_LEVEL = 50;

var hasPlayerLeveledUp = false;

function xpClass()
{
	this.currentLvl;
	this.nextLvl;

	this.currentXp;
	this.nextXp;
	this.xpModifier;
	this.xpDrop;

	this.levelBracket;

	this.init = function(charKind)
	{
		if(charKind != null || charKind != undefined)
		{
			this.levelBracket = getBracketByType(charKind);

			if(charKind != 'Ragnar')
			{
				setup_Enemy(this,this.levelBracket);
				this.xpDrop = setEnemyXpDrop(this.currentLvl, this.levelBracket);
			}
			else
			{
				setup_Player(this,this.levelBracket);
			}
		}
		else
		{
			console.log("Failed to initialize xp class due to non-existent charKing!");
		}
	}

	this.gainEnemyXpDrop = function()
	{
		return this.xpDrop;
	}
}

function hasPlayerLeveledUp(playerXpObj)
{
	if(playerXpObj.currentXp >= playerXpObj.nextXp)
	{
		hasPlayerLeveledUp = true;
	}
	else
	{
		hasPlayerLeveledUp = false;
	}

	return hasPlayerLeveledUp;
}

function levelUpPlayer(playerXpObj)
{
	playerXpObj.currentLvl++;
	playerXpObj.nextLvl++;
	if(playerXpObj.currentLvl % 5 == 1)
	{
		playerXpObj.levelBracket++;
	}
	playerXpObj.nextXp = calculateXpToNextLvl(playerXpObj.currentLvl, playerXpObj.levelBracket);
}

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