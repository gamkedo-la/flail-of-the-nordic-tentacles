/*
	NOTE: xp really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/

function xpClass()
{
	this.currentLvl;
	this.nextLvl;

	this.currentXp;
	this.nextXp;
	this.xpModifier;

	this.levelBracket;

	this.init = function(charKind)
	{
		if(charKind != null || charKind != undefined)
		{
			this.levelBracket = getBracketByType(charKind);

			if(charKind != 'Ragnar')
			{
				setup_Enemy(this,this.levelBracket);
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

	this.gainXp = function()
	{

	}

	this.setXpDrop = function()
	{
		
	}
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
	caller.nextXp = calculateXpToNextLvl(caller.currentXp, caller.currentLvl, lvlBracket);
}

function getBracketByType(charKind)
{
	switch(charKind)
	{
		case 'Ragnar':
			return 1;
		case 'Wormex':
			return 1;
		default:
			return null;
	}
}

function calculateXpToNextLvl(currentXp,currentLvl,lvlBracket)
{
	return (currentXp + 20) * currentLvl * lvlBracket;
}

function getRandomLevel_MaxMinInclusive(max,min)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}