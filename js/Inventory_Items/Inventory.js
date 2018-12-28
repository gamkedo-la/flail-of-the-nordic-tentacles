const INVENTORY_W = 130;
const INVENTORY_H = 180;
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
			cols = 2,
			invX = canvas.width - INVENTORY_W,
			invY = canvas.height - INVENTORY_H,
			itemsMargin = 20,
			itemOffset = 50;
		//draw inventory and display the item's name and image
		canvasContext.save();
		canvasContext.globalAlpha = 0.75;
		
		drawText("INVENTORY", invX+10, invY-10, "black", "20px Arial");
		drawRect(invX, invY, INVENTORY_W, INVENTORY_H,"black");

		for(var i = 0; i < 6; i++)
		{
			let itemX = invX + itemsMargin + itemOffset * (i%cols),
				itemY = invY + itemsMargin + itemOffset * (Math.floor(i/cols));
			drawRect(itemX, itemY, 40, 40,'white');
		}

		for(var i = 0; i < self.items.length; i++)
		{
			let item = Item.List[self.items[i].id];
			str += item.name;
			if(item.image != null || item.image != undefined){
				image = item.image;
			}
			else {continue;}
			
			let itemX = invX + itemsMargin + itemOffset * (i%cols),
				itemY = invY + itemsMargin + itemOffset * (Math.floor(i/cols));
			canvasContext.drawImage(image, itemX, itemY, 40, 40);
		}
		canvasContext.restore();
	};

	return self;
}

function toggleInventoryAndDrawImage(){
	//hide or show inventory UI when "I" is pressed
	isInventoryVisible = !isInventoryVisible;

	console.log("Inventory is visible? " + isInventoryVisible);
}