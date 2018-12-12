//Not sure what to do here yet

function toggleInventoryAndDrawImage(){
	console.log("future functionality to be built");
}

function itemPickedUp()
{	
	timer ++;
	if (timer <= 100)
	{
		displayItem = true;
	}
	else if (timer > 100){
		displayItem = false;
		timer = 0;
	}
}