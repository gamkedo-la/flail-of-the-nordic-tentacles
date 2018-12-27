Item = function(id,name,event)//id is for code purposes, name is for display purposes
{
	var self = {
		id: id,
		name: name,
		event: event,
	}

	return self;
}


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