//Stats related
function setStats_Player(caller,level)
{
	caller.hp = caller.baseHp * level;
	caller.hp = Math.floor(caller.hp);
	caller.maxHp = caller.hp;
	caller.str = caller.baseStr * level;
	caller.def = caller.baseDef * level;
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
		hpMod = Math.floor(hpMod);
		strMod = getRandomMod(strModPossibilites.tank);
		defMod = getRandomMod(defModPossibilites.tank);
	}

	caller.hp = caller.baseHp * level * hpMod;
	caller.hp = Math.floor(caller.hp);
	caller.maxHp = caller.hp;
	caller.maxHp = Math.floor(caller.maxHp);
	caller.str = caller.baseStr * level * strMod;
	caller.str = Math.floor(caller.str);
	caller.def = caller.baseDef * level * defMod;
	caller.def = Math.floor(caller.def);	
}

function calculateDamage(attackerStatsObj, defenderStatsObj)
{
	// need to mess with the def mod here based on enemy type
	var netDamage = attackerStatsObj.str - (defenderStatsObj.def * 0.3);
	netDamage = Math.ceil(netDamage);

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

function modifyStats(playerStats)
{
	playerStats.hp = Math.floor(playerStats.hp * playerStats.hpMod);
	playerStats.maxHp = Math.floor(playerStats.hp);
	playerStats.str = Math.floor(playerStats.str * playerStats.strMod);
	playerStats.def = Math.floor(playerStats.def * playerStats.defMod);
}