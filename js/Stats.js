/*
	NOTE: stats really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/

function statsClass()
{
	//health,magic,strength,agility,vitality,intelligence
	this.hp;
	this.hpMod;
	this.mp;//possibility of magic attacks?
	this.mpMod;
	this.str;
	this.strMod;
	this.def;
	this.defMod;

	this.init = function()
	{
		//all characters start at base stats
	}
}