const INVENTORY_W = 180;
const INVENTORY_H = 130;
var isInventoryVisible = false;

Inventory = function()
{
	var self = {
		items:[] // {id: "itemId", amount: 1}
	};

	self.addItem = function(itemId,amount)
	{
		//if item is owned then increase amount (not planning on having usable items)
		for(var i = self.items.length - 1; i >= 0; i--)
		{
			if(self.items[i].itemId == itemId)
			{
				self.items[i].amount += amount;
				self.renderInventory();
				return;
			}
		}

		self.items.push({id: itemId, amount: amount});
		// self.renderInventory();
	};

	self.removeItem = function(itemId,amount)
	{
		for(var i = self.items.length - 1; i >= 0; i--)
		{
			if(self.items[i].itemId == itemId)
			{
				self.items[i].amount -= amount;
				if(self.items[i].amount <= 0)
				{
					self.items.splice(i,1);
				}
				self.renderInventory();
				return;
			}
		}
	};

	self.hasItem = function(itemId,amount)
	{
		for(var i = self.items.length - 1; i >= 0; i--)
		{
			if(self.items[i].id == itemId)
			{
				return self.items[i].amount >= amount;
			}
		}

		return false;
	};

	self.renderInventory = function()
	{
		var str = "";
		var image = null;

		let row = 1,
			cols = 3,
			invX = canvas.width - INVENTORY_W,
			invY = canvas.height - INVENTORY_H,
			itemsMargin = 20,
			itemOffset = 50;
		//draw inventory and display the item's name and image
		canvasContext.save();
		canvasContext.globalAlpha = 0.7;
		
		drawRect(invX, invY-37, 180, 37,"#292929");
		drawRect(invX + 5, invY-34, 170, 30,"#70130F");

		canvasContext.beginPath();              
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "white";

        canvasContext.moveTo(invX + 4,invY - 33);
        canvasContext.lineTo(invX + 176,invY - 33);

        canvasContext.moveTo(invX + 176,invY - 33);
        canvasContext.lineTo(invX + 176,invY - 2);

        canvasContext.moveTo(invX + 176,invY - 2);
        canvasContext.lineTo(invX + 4,invY - 2);

        canvasContext.moveTo(invX + 4,invY - 2);
        canvasContext.lineTo(invX + 4,invY - 33);

        canvasContext.stroke();
		drawText("INVENTORY", invX+15, invY-10, "white", "20px viking-normalregular");

		drawRect(invX, invY, INVENTORY_W, INVENTORY_H,"#292929");
		drawRect(invX + 4, invY + 4, INVENTORY_W - 8, INVENTORY_H - 8,"#70130F");

		canvasContext.beginPath();              
        canvasContext.lineWidth = "1";
        canvasContext.strokeStyle = "white";

        canvasContext.moveTo(invX + 4,invY + 4);
        canvasContext.lineTo(invX - 4 + INVENTORY_W,invY + 4);

	    canvasContext.moveTo(invX - 4 + INVENTORY_W,invY + 4);
        canvasContext.lineTo(invX - 4 + INVENTORY_W,invY - 4 + INVENTORY_H);

        canvasContext.moveTo(invX - 4 + INVENTORY_W,invY - 4 + INVENTORY_H);
        canvasContext.lineTo(invX + 4,invY - 4 + INVENTORY_H);

        canvasContext.moveTo(invX + 4,invY - 4 + INVENTORY_H);
        canvasContext.lineTo(invX + 4,invY + 4);

        canvasContext.stroke();

		for(var i = 0; i < 6; i++)
		{
			//draw item images
			let itemX = invX + itemsMargin + itemOffset * (i%cols),
				itemY = invY + itemsMargin + itemOffset * (Math.floor(i/cols));
			drawRect(itemX, itemY, 40, 40,'white');
		}

		for(var i = 0; i < self.items.length; i++)
		{
			var item = Item.List[self.items[i].id];
			str += item.name;
			if(item.image != null || item.image != undefined){
				image = item.image;
			}
			else {continue;}
			
			let itemX = invX + itemsMargin + itemOffset * (i%cols),
				itemY = invY + itemsMargin + itemOffset * (Math.floor(i/cols));

			if(isItemReadyToUse(item))
			{
				drawRect(itemX, itemY, 40, 40, "#066BC4");
			}

			canvasContext.drawImage(image, itemX, itemY, 40, 40);
		}
		canvasContext.restore();
	};

	return self;
}

function isItemReadyToUse(item)
{
	// console.log("isItemReadyToUse reached");
	if(item.id == "eyepatch" || item.id == "dictionary" || item.id == "beacon" )
	{
		// console.log("not usable item");
		return false;
	}

	// console.log(item.id);
	// console.log(item.id == "wormhole");

	if(item.id == "wormhole")
	{
		if(playerImmunityTimer >= 750)
			return true;
		else
			return false;
	} //end of wormhole check
	else if(item.id == "horn")
	{
		if(playerSecondWindTimer >= 450)
			return true;
		else
			return false;
	} //end of horn check
	else if(item.id == "tentacle")
	{
		if(playerStopEnemiesTimer >= 360)
			return true;
		else
			return false;
	} //end of tentacle check
	else
	{
		return false;
	}
}

function toggleInventoryAndDrawImage(){
	isInventoryVisible = !isInventoryVisible;
}