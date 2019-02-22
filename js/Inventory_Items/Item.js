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
	console.log("shortcuts enabled!");
	spawnUnlockEventParticles();
	areShortcutsEnabled = true;
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
	console.log("beach now accessible");
	spawnUnlockEventParticles();
	//open beach level
},tentaclePic);

Item("horn","Chaos Horn", function()
{
	console.log("mountain now accessible");
	spawnUnlockEventParticles();
	//open mountain level
},hornPic);

Item("eyepatch","Odin's Eye Patch", function()
{
	console.log("forest now accessible");
	spawnUnlockEventParticles();
	//open forest level
},eyepatchPic);

Item("dictionary","Digital Dictionary", function()
{
	console.log("the outcast wishes to speak");
	spawnItemUsedParticles();
	//enable The Outcast's dialogue
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