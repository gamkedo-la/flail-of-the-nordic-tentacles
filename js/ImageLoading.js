var worldPics = [];
var vikingPic = document.createElement("img");
var seerPic = document.createElement("img");
var outcastPic = document.createElement("img");
var maleVikingPic = document.createElement("img");
var femaleVikingPic = document.createElement("img");
//TODO: have array of enemies instead of single var for each enemy
var wormexPic = document.createElement("img");
var tankPic = document.createElement("img");
var fallenPic = document.createElement("img");
var vanguardPic = document.createElement("img");
var textboxPic = document.createElement("img");

var picToLoad = 0;

function loadImages()
{
	var imageList = [
        //Ui
        {varName: textboxPic, fileName: "chatbox.png"},
        
		// Characters
		{charName: vikingPic, fileName: "viking_quick_sheet.png"},
		{charName: maleVikingPic, fileName: "male_viking.png"},
		{charName: femaleVikingPic, fileName: "female_viking.png"},
		{charName: seerPic, fileName: "the_seer.png"},
		{charName: outcastPic, fileName: "the_outcast.png"},
		{charName: wormexPic, fileName: "slime_quick_sheet.png"},
		{charName: tankPic, fileName: "slime_blue_sheet.png"},
		{charName: fallenPic, fileName: "slime_red_sheet.png"},
		{charName: vanguardPic, fileName: "slime_yellow_sheet.png"},

		// Terrain Tiles
		{worldType: TILE_OCEAN, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_SNOW_GRASS, fileName: "snowyGrass.png"},
		{worldType: TILE_SNOW, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_MOUNTAIN, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_TREE, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_MT_ENTRY_DOOR, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_MT_EXIT_DOOR, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_SNOW_TO_BEACH, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_BEACH_TO_OCEAN, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_CUBE, fileName: "cube.png"},
		{worldType: TILE_ROAD_HORIZONTAL, fileName: "road_spritesheet.png"},
		{worldType: TILE_ROAD_VERTICAL, fileName: "road_spritesheet.png"},
		{worldType: TILE_ROAD_TOP_LEFT_TURN, fileName: "road_spritesheet.png"},
		{worldType: TILE_ROAD_TOP_RIGHT_TURN, fileName: "road_spritesheet.png"},
		{worldType: TILE_ROAD_BOTTOM_RIGHT_TURN, fileName: "road_spritesheet.png"},
		{worldType: TILE_ROAD_BOTTOM_LEFT_TURN, fileName: "road_spritesheet.png"},
		{worldType: TILE_FOREST_TREES_1, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_2, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_3, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_4, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_5, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_6, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_7, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_8, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_9, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_10, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_11, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_12, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_13, fileName: "forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_BEACH_ENTRY_DOOR, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_FOREST_ENTRY_DOOR, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_BEACH_EXIT_DOOR, fileName: "terrain_spritesheet.png"},
		{worldType: TILE_FOREST_EXIT_DOOR, fileName: "terrain_spritesheet.png"},

		// Items
		{worldType: TILE_HORN, fileName: "chaos_horn_quick.png"},
		{worldType: TILE_EYEPATCH, fileName: "odins_eyepatch_quick.png"},
		{worldType: TILE_TENCTACLE, fileName: "decaying_tentacle_quick.png"},
		{worldType: TILE_WORMHOLE, fileName: "wormhole_quick.png"},
		{worldType: TILE_DICTIONARY, fileName: "dig_dictionary_quick.png"},
		{worldType: TILE_BEACON, fileName: "beacon.png"},

		// Editor Specific Pics
		{worldType: TILE_WORMEX, fileName: "slime_quick.png"},
		{worldType: TILE_TANK, fileName: "slime_blue.png"},
		{worldType: TILE_FALLEN, fileName: "slime_red.png"},
		{worldType: TILE_VANGUARD, fileName: "slime_yellow.png"},
		{worldType: TILE_PLAYER_NEW_GAME, fileName: "viking_quick.png"},
		{worldType: TILE_SEER, fileName: "the_seer.png"},
		{worldType: TILE_OUTCAST, fileName: "the_outcast.png"},
		{worldType: TILE_MALE_VIKING, fileName: "male_viking.png"},
		{worldType: TILE_FEMALE_VIKING, fileName: "female_viking.png"},
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
		else if (imageList[i].charName != undefined)
		{
			beginLoadingImages(imageList[i].charName, imageList[i].fileName);
		} else {
            beginLoadingImages(imageList[i].varName, imageList[i].fileName);
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
	// console.log(picsToLoad);
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

function getEnemyPicBasedOnType(charType)
{
	switch(charType)
	{
		case TILE_WORMEX:
			return wormexPic;
		case TILE_TANK:
			return tankPic;
		case TILE_FALLEN:
			return fallenPic;
		case TILE_VANGUARD:
			return vanguardPic;
	}
}