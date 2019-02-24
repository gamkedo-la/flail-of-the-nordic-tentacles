Item = function(id,name,event,image)//id is for code purposes, name is for display purposes
{
	var self = {
		id: id,
		name: name,
		event: event,
		image: image
	}

	Item.List[self.id] = self;

	return self;
}

Item.List = {};

Item("wormhole","Pocket Wormhole", function()
{
	spawnUnlockEventParticles();
},wormholePic);

Item("beacon","Alien Beacon", function()
{
	spawnItemUsedParticles();
	var tempEnemy = new enemySpawnPointClass();

	tempEnemy.setup(1550, 1430, TILE_BOSS);

	var tileCol = Math.floor(tempEnemy.x/TILE_W);
	var tileRow = tempEnemy.y/TILE_H;
	var newBoss = {col: tileCol, row: tileRow, charType: tempEnemy.charType};

	var tempEnemy = getClassBasedOnType(newBoss.charType);

	tempEnemy.setHome(newBoss.col,newBoss.row);
	tempEnemy.init('Enemy' + spawnID);
	spawnID++;
	enemiesList.push(tempEnemy);
},beaconPic);

Item("tentacle","Decaying Tentacle", function()
{
	spawnUnlockEventParticles();
},tentaclePic);

Item("horn","Chaos Horn", function()
{
	spawnUnlockEventParticles();
},hornPic);

Item("eyepatch","Odin's Eye Patch", function()
{
	spawnUnlockEventParticles();
},eyepatchPic);

Item("dictionary","Digital Dictionary", function()
{
	spawnItemUsedParticles();
},dictionaryPic);

function itemPickedUp()
{	
	itemDisplaytimer ++;
	if (itemDisplaytimer <= 100)
	{
		displayItem = true;
	}
	else if (itemDisplaytimer > 100){
		displayItem = false;
		itemDisplaytimer = 0;
	}
}

function displayItemUseDetailsAndKey(itemName)
{
	let string = "";

	switch(itemName)
	{
		case "eyepatch":
		string += "Odin's eyepatch shows alien's life force";
		break;
		case "horn":
		string += "Press R to get a second wind!";
		break;
		case "tentacle":
		string += "Press E to act like an alien!";
		break;
		case "beacon":
		string += "N.O.R.D lands northwest of here!";
		break;
		case "wormhole":
		string += "Press F to gain immunity for a bit!";
		break;
		case "dictionary":
		string += "You can now speak Cecleon!";
		break;
	}

	return string;
}