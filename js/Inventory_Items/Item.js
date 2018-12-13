//Not sure what to do here yet

function toggleInventoryAndDrawImage(){
	console.log("future functionality to be built");
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