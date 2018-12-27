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
	//enable shortcut use
});
Item("beacon","Alien Beacon", function()
{
	//enable boss battle
});
Item("tentacle","Decaying Tentacle", function()
{
	//open beach level
});
Item("horn","Chaos Horn", function()
{
	//open mountain level
});
Item("eyePatch","Odin's Eye Patch", function()
{
	//open forest level
});
Item("dictionary","Digital Dictionary", function()
{
	//enable The Outcast's dialogue
});


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