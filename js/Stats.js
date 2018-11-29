/*
	NOTE: stats really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/

function statsClass()
{
	this.baseHP = 300.0;
	this.hp;
	this.maxHP;
	this.hpMod;

	this.baseMp = 100.0;//possibility of magic attacks?
	this.mp;
	this.maxMp;
	this.mpMod;

	this.baseStr = 30.0;
	this.str;
	this.strMod;

	this.baseDEF = 20.0;
	this.def;
	this.defMod;

	this.modifiedHP;
	this.modifiedDEF;
	this.modifiedATK;

	this.isCharacterDead = false;
	this.isThisHitTheFirstHit = false;

	this.init = function(level)
	{
		//all characters start at base stats
	}
}