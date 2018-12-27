Inventory = function()
{
	var self = {
		items:[] // {id: "itemId", amount: 1}
	}

	self.addItem = function(itemId,amount)
	{
		//if item is owned then increase amount (not planning on having usable items but it'd be a nice to have like health packs,etc.)
		for(var i = self.items.length - 1; i >= 0; i--)
		{
			if(self.items[i].itemId == itemId)
			{
				self.items[i].amount += amount;
				return;
			}
		}

		self.items.push({id: itemId, amount: amount});
	}

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
				return;
			}
		}
	}

	self.hasItem = function(itemId,amount)
	{
		for(var i = self.items.length - 1; i >= 0; i--)
		{
			if(self.items[i].itemId == itemId)
			{
				return self.items[i].amount >= amount;
			}
		}

		return false;
	}

	self.renderInventory = function()
	{

	}

	return self;
}

function toggleInventoryAndDrawImage(){
	console.log("future functionality to be built");
}