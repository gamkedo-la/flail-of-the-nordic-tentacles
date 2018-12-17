var worldPics = [];

var vikingPic = document.createElement("img");
var seerPic = document.createElement("img");
var outcastPic = document.createElement("img");
var maleVikingPic = document.createElement("img");
var femaleVikingPic = document.createElement("img");
var footStepsPic = document.createElement("img");

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
		{varName: textboxPic, fileName: "ui/chatbox.png"},
		{varName: footStepsPic, fileName: "ui/footstepsSnow.png"},

		// Characters
		{charName: vikingPic, fileName: "characters/V.png"},
		{charName: maleVikingPic, fileName: "characters/male_viking.png"},
		{charName: femaleVikingPic, fileName: "characters/female_viking.png"},
		{charName: seerPic, fileName: "characters/the_seer_v6.png"},
		{charName: outcastPic, fileName: "characters/the_outcast.png"},
		{charName: wormexPic, fileName: "enemies/slime_quick_sheet.png"},
		{charName: tankPic, fileName: "enemies/slime_blue_sheet.png"},
		{charName: fallenPic, fileName: "enemies/slime_red_sheet.png"},
		{charName: vanguardPic, fileName: "enemies/slime_yellow_sheet.png"},

		// Terrain Tiles
		{worldType: TILE_OCEAN, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_SNOW_GRASS_1, fileName: "environment/tiles/snowyGrass.png"},
		{worldType: TILE_SNOW_GRASS_2, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_3, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_4, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_5, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_6, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_7, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_8, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_9, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_10, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_11, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_12, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW_GRASS_13, fileName: "environment/snowyGrassTileset.png"},
		{worldType: TILE_SNOW, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_MOUNTAIN, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_TREE, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_MT_ENTRY_DOOR, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_MT_EXIT_DOOR, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_SNOW_TO_BEACH, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_BEACH_TO_OCEAN, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_CUBE, fileName: "cube.png"},
		{worldType: TILE_ROAD_HORIZONTAL, fileName: "environment/road_spritesheet.png"},
		{worldType: TILE_ROAD_VERTICAL, fileName: "environment/road_spritesheet.png"},
		{worldType: TILE_ROAD_TOP_LEFT_TURN, fileName: "environment/road_spritesheet.png"},
		{worldType: TILE_ROAD_TOP_RIGHT_TURN, fileName: "environment/road_spritesheet.png"},
		{worldType: TILE_ROAD_BOTTOM_RIGHT_TURN, fileName: "environment/road_spritesheet.png"},
		{worldType: TILE_ROAD_BOTTOM_LEFT_TURN, fileName: "environment/road_spritesheet.png"},
		{worldType: TILE_FOREST_TREES_1, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_2, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_3, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_4, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_5, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_6, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_7, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_8, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_9, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_10, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_11, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_12, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_TREES_13, fileName: "environment/forestImpaasibleTrees-sheet_crop.png"},
		{worldType: TILE_FOREST_BIGTREE_1, fileName: "environment/trees/tree.png"},
		{worldType: TILE_BEACH_ENTRY_DOOR, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_FOREST_ENTRY_DOOR, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_BEACH_EXIT_DOOR, fileName: "environment/terrain_spritesheet.png"},
		{worldType: TILE_FOREST_EXIT_DOOR, fileName: "environment/terrain_spritesheet.png"},

		// Items
		{worldType: TILE_HORN, fileName: "items/chaos_horn_quick.png"},
		{worldType: TILE_EYEPATCH, fileName: "items/odins_eyepatch_quick.png"},
		{worldType: TILE_TENCTACLE, fileName: "items/decaying_tentacle_quick.png"},
		{worldType: TILE_WORMHOLE, fileName: "items/wormhole_quick.png"},
		{worldType: TILE_DICTIONARY, fileName: "items/dig_dictionary_quick.png"},
		{worldType: TILE_BEACON, fileName: "items/beacon.png"},

		// Editor Specific Pics
		{worldType: TILE_WORMEX, fileName: "enemies/slime_quick.png"},
		{worldType: TILE_TANK, fileName: "enemies/slime_blue.png"},
		{worldType: TILE_FALLEN, fileName: "enemies/slime_red.png"},
		{worldType: TILE_VANGUARD, fileName: "enemies/slime_yellow.png"},
		{worldType: TILE_PLAYER_NEW_GAME, fileName: "characters/viking_quick.png"},
		{worldType: TILE_SEER, fileName: "characters/the_seer_v6.png"},
		{worldType: TILE_OUTCAST, fileName: "characters/the_outcast.png"},
		{worldType: TILE_MALE_VIKING, fileName: "characters/male_viking.png"},
		{worldType: TILE_FEMALE_VIKING, fileName: "characters/female_viking.png"},
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