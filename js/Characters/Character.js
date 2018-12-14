var seer = new npcClass();
var outcast = new npcClass();
var maleViking = new npcClass();
var femaleViking = new npcClass();

function npcClass()
{
	this.centerX = 75;
 	this.centerY = 75;

 	this.collider = new colliderClass(this.centerX, this.centerY, 20, 20, 0, 15);

 	this.init = function(image, name, mapTileType)
 	{
 		this.bitmap = image;
		this.charName = name;
		this.mapTileType = mapTileType;
 	}

 	this.reset = function()
 	{
 		if(this.homeX == undefined)
 		{
			this.getNpcSpecificSpot(this.mapTileType);
 		}

 		this.centerX = this.homeX;
 		this.centerY = this.homeY;
 		this.collider.setCollider(this.centerX, this.centerY);
 	}

 	this.draw = function()
 	{
 		this.collider.draw();

 		drawText(""+ this.charName, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height, 'black');
 		canvasContext.drawImage(this.bitmap, this.centerX - this.bitmap.width/2, this.centerY - this.bitmap.height/2);
 	}

	// TILE_SEER, TILE_OUTCAST, TILE_MALE_VIKING, TILE_FEMALE_VIKING
	this.getNpcSpecificSpot = function(findWhichTile=TILE_SEER, inWhichLevel=0)
 	{
		for(var i = 0; i < worldMap[inWhichLevel].length; i++) // FIXME: hardcoded map [0]
		{

			if (worldMap[inWhichLevel][i]==findWhichTile) {
				let tileRow = Math.floor(i/currentMapCols);
				let tileCol = i%currentMapCols;
				this.homeX = tileCol * TILE_W + 0.5 * TILE_W;
				this.homeY = tileRow * TILE_H + 0.5 * TILE_H;
				worldMap[inWhichLevel][i] = TILE_SNOW; // remove it from the map array
				console.log("getNpcSpecificSpot found a home location at " + this.homeX+","+this.homeY);
				return; // no need to look any more
			}
	 	}
	 	console.log("ERROR: getNpcSpecificSpot could not find a tile of type " + findWhichTile + " on this map.");
		this.homeX = 1 * TILE_W + 0.5 * TILE_W;
		this.homeY = 1 * TILE_H + 0.5 * TILE_H;
}
};
