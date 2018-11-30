/*
	NOTE: stats really only need to be checked when doing things like battles, using items that increase them whether permanently or temporarily,
	checking gear requirements, etc.
*/
const TIME_UNTIL_HP_STARTS_REGEN = 150; 
var hpModPossibilites = {wormex: [0.45,0.50,0.55,0.60],
						fallen: [0.65,0.70,0.75,0.80],
						vanguard: [0.85,0.90,0.95,1.0],
						tank: [1.05,1.10,1.15,1.20]
						};
var strModPossibilites = {wormex: [0.10,0.20,0.30],
						fallen: [0.40,0.50,0.60],
						vanguard: [0.70,0.80,0.90],
						tank: [1.0,1.10,1.20]
						};
var defModPossibilites = {wormex: [0.05,0.15,0.25,0.30],
						fallen: [0.35,0.45,0.55,0.60],
						vanguard: [0.65,0.75,0.85,0.90],
						tank: [0.95,1.05,1.15,1.20]
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
	this.strMod;

	this.baseDef = 40.0;
	this.def;
	this.defMod;
	
	this.isCharacterDead = false;
	this.isThisHitTheFirstHit = false;

	this.init = function(level,charKind)
	{
		if(charKind != 'Ragnar')
		{
			setStats_Enemy(this,level,charKind);
		}
		else
		{
			setStats_Player(this,level);
		}
	}
}

function regenPlayerHpIfAble(player,isIdle,isInCombat)
{
	if(isIdle && !isInCombat)
	{
		player.waitTimeForHpRegen--;
		if(player.waitTimeForHpRegen <= 0 && player.stats.hp < player.stats.maxHp)
		{
			player.stats.hp += (player.stats.baseHp * 0.01);
		}
		else
		{
			return;
		}
	}
	else
	{
		player.waitTimeForHpRegen = TIME_UNTIL_HP_STARTS_REGEN;
	}
}

function setStats_Player(caller,level)
{
	caller.hp = Math.ceil(caller.baseHp * level);
	caller.maxHp = caller.hp;
	caller.str = Math.floor(caller.baseStr * level);
	caller.def = Math.floor(caller.baseDef * level);
}

function setStats_Enemy(caller,level,charkind)
{
	//need to balance out stats
	var hpMod;
	var strMod;
	var defMod;

	if(charkind == 'Wormex')
	{
		hpMod = getRandomMod(hpModPossibilites.wormex);
		strMod = getRandomMod(strModPossibilites.wormex);
		defMod = getRandomMod(defModPossibilites.wormex);
	}
	else if(charkind == 'Fallen')
	{
		hpMod = getRandomMod(hpModPossibilites.fallen);
		strMod = getRandomMod(strModPossibilites.fallen);
		defMod = getRandomMod(defModPossibilites.fallen);
	}
	else if(charkind == 'Vanguard')
	{
		hpMod = getRandomMod(hpModPossibilites.vanguard);
		strMod = getRandomMod(strModPossibilites.vanguard);
		defMod = getRandomMod(defModPossibilites.vanguard);
	}
	else
	{
		hpMod = getRandomMod(hpModPossibilites.tank);
		strMod = getRandomMod(strModPossibilites.tank);
		defMod = getRandomMod(defModPossibilites.tank);
	}

	caller.hp = Math.ceil(caller.baseHp * level * hpMod);
	caller.maxHp = caller.hp;
	caller.str = Math.floor(caller.baseStr * level * strMod);
	caller.def = Math.floor(caller.baseDef * level * defMod);
}

function calculateDamage(attackerStatsObj, defenderStatsObj)
{
	// need to mess with the def mod here based on enemy type
	var netDamage = attackerStatsObj.str - (defenderStatsObj.def * 0.3);

	defenderStatsObj.hp -= netDamage;

	if(defenderStatsObj.hp <= 0)
	{
		defenderStatsObj.isCharacterDead = true;
	}
	else
	{
		defenderStatsObj.isCharacterDead = false;
	}
}

function getRandomMod(array)
{
	let random = Math.random();

	if(random < 0.25)
	{
		return array[0];
	}
	else if(random > 0.25 && random < 0.50)
	{
		return array[1];	
	}
	else if(random > 0.50 && random < 0.75)
	{
		return array[2];
	}
	else
	{
		return array[3];
	}
}