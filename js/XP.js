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

	this.init = function(levelBracket)
	{
		this.levelBracket = levelBracket;

		//start everyone at lvl 1
		this.currentXp = 0;
		this.currentLvl = 1;
		this.nextLvl = currentLvl + 1;
		this.nextXp = this.calculateXpToNextLvl()
	}

	this.calculateXpToNextLvl = function(lvlBracket, currentLvl, currentXp)
	{

	}

	this.gainXp = function()
	{

	}

	this.setXpDrop = function()
	{
		
	}
}