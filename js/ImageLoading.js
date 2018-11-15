var worldPics = [];
var vikingPic = document.createElement("img");
//TODO: have array of enemies instead of single var for each enemy
var slimePic = document.createElement("img");

var picToLoad = 0;

function loadImages()
{
	var imageList = [

		// Character Pics Go Here
		{charName: vikingPic, fileName: "viking_quick_sheet.png"},
		{charName: slimePic, fileName: "slime_quick_sheet.png"},

		// World Pics Go Here
		{worldType: TILE_ROAD, fileName: "road_quick.png"},
		{worldType: TILE_OCEAN, fileName: "ocean_quick.png"},
		{worldType: TILE_SNOW_GRASS, fileName: "snowyGrass.png"},
		{worldType: TILE_SNOW, fileName: "snow_quick.png"},
		{worldType: TILE_MOUNTAIN, fileName: "mountain_quick.png"},
		{worldType: TILE_TREE, fileName: "tree_quick.png"},
		{worldType: TILE_MT_ENTRY_DOOR, fileName: "mountain_entrance_door.png"},

		{worldType: TILE_HORN, fileName: "chaos_horn_quick.png"},
		{worldType: TILE_EYEPATCH, fileName: "odins_eyepatch_quick.png"},
		{worldType: TILE_TENCTACLE, fileName: "decaying_tentacle_quick.png"},
		{worldType: TILE_WORMHOLE, fileName: "wormhole_quick.png"},
		{worldType: TILE_DICTIONARY, fileName: "dig_dictionary_quick.png"},
		{worldType: TILE_BEACON, fileName: "beacon.png"},

		{worldType: TILE_ENEMY, fileName: "slime_quick.png"},
		{worldType: TILE_PLAYER, fileName: "viking_quick.png"},

		//Item Pics Go Here... maybe?
		]

	picsToLoad = imageList.length;

	for(var i = 0; i < imageList.length; i++)
	{
		// if(imageList[i].charName != undefined)
		// {
		// 	loadCharPics(imageList[i].charName, imageList[i].fileName);
		// }
		if(imageList[i].worldType != undefined)
		{
			loadWorldPics(imageList[i].worldType, imageList[i].fileName);
		}
		else
		{
			beginLoadingImages(imageList[i].charName, imageList[i].fileName);
		}
	}
}

function beginLoadingImages(imgVar, fileName)
{
	imgVar.onload = countLoadedImgsAndLaunchIfAble();
	imgVar.src = "images/" + fileName;
}

function countLoadedImgsAndLaunchIfAble()
{
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0)
	{
		imgsDoneLoadingSoStartGame();
	}
}

// function loadCharPics(charCode, fileName)
// {
// 	characterPics[charCode] = document.createElement("img");
// 	beginLoadingImages(characterPics[charCode], fileName);
// }

function loadWorldPics(worldCode, fileName)
{
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImages(worldPics[worldCode], fileName);
}