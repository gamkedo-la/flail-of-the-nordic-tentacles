/*
	NOTE: xp really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/
const BASE_XP_REQ = 20;
const BASE_XP_DROP = 5;
const PLAYER_MAX_LEVEL = 50;

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