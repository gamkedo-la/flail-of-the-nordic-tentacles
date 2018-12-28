const INVENTORY_W = -160;
const INVENTORY_H = -200;
var isInventoryVisible = false;

Inventory = function()
{
	var self = {
		items:[] // {id: "itemId", amount: 1}
	};

	self.addItem = function(itemId,amount)
	{
		//if item is owned then increase amount (not planning on having usable items but it'd be a nice to have like health packs,etc.)
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
		self.renderInventory();
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

		if(isInventoryVisible)
		{
			let row = 1;
			let col = 1;
			//draw inventory and display the item's name and image
			canvasContext.save();
			canvasContext.globalAlpha = 0.5;
			drawRect(canvas.width,canvas.height,INVENTORY_W,INVENTORY_H,"black");
			for(var i = 0; i < self.items.length; i++)
			{
				let item = Item.List[self.items[i].id];
				str += item.name;
				if(item.image != null || item.image != undefined){
					image = item.image;
				}

				if(i % 2 == 0 && i > 0)
				{
					row++;
				}

				drawRect(canvas.width + INVENTORY_W + 20,canvas.height + INVENTORY_H + (20 * row),40,40,"white");
				canvasContext.drawImage(canvas.width + INVENTORY_W + 20,canvas.height + INVENTORY_H + (20 * row),40,40);
			}
			canvasContext.restore();
		}
		else
		{
			//don't draw inventory
			console.log("not drawing inventory");
		}
	};

	return self;
}

function toggleInventoryAndDrawImage(){
	//hide or show inventory UI when "I" is pressed
	isInventoryVisible = !isInventoryVisible;

	console.log("Inventory is visible? " + isInventoryVisible);
}