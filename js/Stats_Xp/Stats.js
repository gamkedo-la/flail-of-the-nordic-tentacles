/*
	NOTE: stats really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/
const TIME_UNTIL_HP_STARTS_REGEN = 150;
var hpModPossibilites = {wormex: [0.45,0.50,0.55,0.60],
						fallen: [0.65,0.70,0.75,0.80],
						vanguard: [0.85,0.90,0.95,1.0],
						tank: [1.05,1.10,1.15,1.20],
						boss: [1.50,1.50,1.50,1.50],
						};
var strModPossibilites = {wormex: [0.10,0.20,0.30,0.35],
						fallen: [0.40,0.50,0.60,0.65],
						vanguard: [0.70,0.80,0.90,0.95],
						tank: [1.0,1.10,1.20,1.25],
						boss: [1.50,1.50,1.50,1.50],
						};
var defModPossibilites = {wormex: [0.05,0.15,0.25,0.30],
						fallen: [0.35,0.45,0.55,0.60],
						vanguard: [0.65,0.75,0.85,0.90],
						tank: [0.95,1.05,1.15,1.20],
						boss: [1.50,1.50,1.50,1.50],
						};


function statsClass()
{
	this.baseHp = 3000.0;
	this.hp;
	this.maxHp;
	this.hpMod;

	this.baseMp = 1000.0;//possibility of magic attacks?
	this.mp;
	this.maxMp;
	this.mpMod;

	this.baseStr = 60.0;
	this.str;
	this.maxStr = 100;
	this.strMod;

	this.baseDef = 40.0;
	this.def;
	this.maxDef = 100;
	this.defMod;

	this.isCharacterDead = false;
	this.isThisHitTheFirstHit = false;

	this.init = function(level,charKind)
	{
		if(charKind != 'Ragnar')
		{
			//if(charKind == 'Boss'){setStats_Boss(this,level,charKind)}
			setStats_Enemy(this,level,charKind);
		}
		else
		{
			setStats_Player(this,level);
		}
	}
}
